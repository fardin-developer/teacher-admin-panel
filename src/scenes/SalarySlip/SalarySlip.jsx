import React, { useEffect, useState } from 'react'
import './salaryslip.css'
const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const SalarySlip = () => {
  const [salaryDetails, setSalaryDetails] = useState({})
  const handlePrint = () => {
    window.print()
  }
  useEffect(() => {
    const storedSalaryDetails = localStorage.getItem('salaryDetails')
    if (storedSalaryDetails) {
      setSalaryDetails(JSON.parse(storedSalaryDetails))
      console.log(JSON.parse(storedSalaryDetails))
    } else {
      console.log('not set')
    }
  }, [])
  let monthNumber = Number(salaryDetails.month) + 1
  function getMonthName (monthNumber) {
    const date = new Date()
    date.setMonth(monthNumber - 1)

    // Using the browser's default locale.
    return date.toLocaleString([], { month: 'long' })
  }
  const currentDate = new Date();

  return (
    <>
      <button onClick={handlePrint}>Download</button>
      <div className='fullpage'>
        <div className='main'>
          <div className='header'>
            <div className='left'>
              <h1>Gyanudoi Jatiya Academy</h1>
              <p>Tagline in name</p>
            </div>
            <div className='right'>
              <p>Payslip For the month </p>
              <h2>{getMonthName(monthNumber)} {new Date().getFullYear()}</h2>
            </div>
          </div>
          <hr />
          <div className='employdetails'>
            <div className='leftdetails'>
              <h2>Employee Summary</h2>
              <h3>Name: {salaryDetails.name}</h3>
              <h4>Employee ID: {salaryDetails.id}</h4>
            </div>
            <div className='rightdetails'>
              <h2>Base salary:{salaryDetails.baseslary}</h2>
              <h2 style={{ color: 'green' }}>
                Net Salary:{' '}
                {salaryDetails.attendences > 0 ? salaryDetails.salary : 0}
              </h2>
              <h5>Bill Generation Date:{currentDate.toLocaleDateString()}</h5>
            </div>
          </div>
          <hr />

          <div className='extraDetails'>
            <div className='salary-details-container'>
              <h2>Salary Details</h2>
              <table className='salary-table'>
                <thead>
                  <tr>
                    <th>Details</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Attendance + Holiday</td>
                    <td>
                      {salaryDetails.attendences} + {salaryDetails.sunday}
                    </td>
                  </tr>
                  <tr>
                    <td>Absent</td>
                    <td>
                      {30 - (salaryDetails.attendences + salaryDetails.sunday)}{' '}
                      days
                    </td>
                  </tr>
                  <tr>
                    <td>Late time in Hour</td>
                    <td>
                      {Math.round((salaryDetails.lateTimeCount / 60) * 100) /
                        100}{' '}
                      Hour
                    </td>
                  </tr>
                  <tr>
                    <td>Absent salary deduction</td>
                    <td style={{ color: 'red' }}>
                      {salaryDetails.attendences > 0
                        ? Number((30 -
                            (salaryDetails.attendences +
                              salaryDetails.sunday)) *
                          Number((salaryDetails.baseslary / 30).toFixed(2))).toFixed(2)
                        : salaryDetails.baseslary}{' '}
                      ₹
                    </td>
                  </tr>
                  <tr>
                    <td>Late time salary deduction</td>
                    <td style={{ color: 'red' }}>
                      {salaryDetails.lateTimeSalary} ₹
                    </td>
                  </tr>

                  <tr>
                    <td>Day Salary</td>
                    <td>{Number((salaryDetails.baseslary / 30).toFixed(2))}</td>
                  </tr>
                  <tr>
                    <td>Base Salary</td>
                    <td>
                      <span style={{ fontWeight: 'bold' }}>
                        &nbsp;{salaryDetails.baseslary}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Deducted Salary</td>
                    <td>
                      -
                      <span style={{ fontWeight: 'bold' }}>
                        {Number(
                          (30 -
                            (salaryDetails.attendences +
                              salaryDetails.sunday)) *
                            (salaryDetails.baseslary / 30) +
                            salaryDetails.lateTimeSalary
                        ).toFixed(2)}
                      </span>{' '}
                      <span style={{ color: 'red' }}>
                        ({' '}
                        {((30 -
                          (salaryDetails.attendences + salaryDetails.sunday)) *
                          Number(
                            (salaryDetails.baseslary / 30))
                          ).toFixed(2)}{' '}
                        ₹ + {salaryDetails.lateTimeSalary} ₹)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Net Salary</td>
                    <td>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        =
                        {salaryDetails.attendences > 0
                          ? salaryDetails.salary
                          : 0}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div></div>
          <div className='note'>
            <p>*Day salary = total salary/30</p>
            <p>*Net salary = base salary - deducted salary</p>
            <p>
              *Holidays attendances are free and you will get payment for that
              day
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SalarySlip
