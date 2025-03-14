import React from 'react'
import { useState, useEffect } from 'react'
import './admit.css'
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// const PageContainer = styled.div`
//   /* Add other styles for your page component */
// `;

// Define the @page property within the styled component
// const PageWithPrintStyles = styled(PageContainer)`
// @page {
//   size: 5.5in 7.5in;
// }
// `;

const Admit = () => {
  // const navigate = useNavigate()

  const handlePrint = () => {
    window.print()
  }
  const [name, setName] = useState('')
  const [section, setSection] = useState('none')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedRollNumber, setSelectedRollNumber] = useState('')
  // const [editableClass, setEditableClass] = useState(false)
  const [editableRollNumber, setEditableRollNumber] = useState(false)
  const [paid, setpaid] = useState(true)

  const handleNameChange = event => {
    setName(event.target.value)
  }
  const handleSection = event => {
    setSection(event.target.value)
  }

  const handleClassChange = event => {
    setSelectedClass(event.target.value)
    // setEditableClass(true)
  }

  const handleRollNumberChange = event => {
    setSelectedRollNumber(event.target.value)
    setEditableRollNumber(true)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://lms.fardin.space/student-name?rollNo=${selectedRollNumber}&class=${selectedClass}&section=${section}`
        )
        const data = await response.json();
        console.log(data)

        if (data.due === 'unpaid') {
          // alert('Student is not allowed to generate admit');
          setName(`${data.name} has a debt`)
          setpaid(false)
          return 0
        }else{
          setpaid(true);
          setName(data.name)
        }
      } catch (error) {
        console.error('Error fetching student data:', error)
      }
    }

    fetchData()
  }, [selectedRollNumber, selectedClass, section, name])

  return (
    <>
      <div className='admitInputData'>
        <div className='class'>
          Class:
          <select
            className='placeholder'
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value=''>Select Class</option>
            {[...Array(10).keys()].map(num => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        <div className='rollNumber'>
          Roll No.{' '}
          {editableRollNumber ? (
            <input
              type='Number'
              value={selectedRollNumber}
              onChange={event => setSelectedRollNumber(event.target.value)}
            />
          ) : (
            <select
              className='placeholder'
              value={selectedRollNumber}
              onChange={handleRollNumberChange}
            >
              <option value=''>Select Roll No.</option>
              {[...Array(70).keys()].map(num => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className='section'>
          Section:
          <select
            className='placeholder'
            value={section}
            onChange={handleSection}
          >
            <option value=''>Select Section</option>
            <option key='0' value='none'>
              None{' '}
            </option>
            <option key='1' value='A'>
              A{' '}
            </option>
            <option key='2' value='B'>
              B
            </option>
            <option key='3' value='C'>
              C
            </option>
            <option key='4' value='D'>
              D
            </option>
          </select>
        </div>
      </div>

      <div className='admit'>
        <div className='top'>
          <div className='schoolName'>Gyanudoi Jatiya Academy</div>
          <div className='address'>
            Noorpur Jut, P.O.:Sirajuli,
            <br />
            Sonitpur(Assam),Pin: 784117
          </div>
        </div>
        <hr />
        <div className='studentDetails'>
          <div className='name'>
            Name:{' '}
            <input
              className='placeholder'
              type='text placeholder'
              value={name}
              onChange={handleNameChange}
            />
          </div>{' '}
          <div className='otherDetails'>
            <div className='classSection'>
              {' '}
              Class: <span className='placeholder'>{selectedClass}</span>
            </div>
            ,
            <div className='rollSection' style={{ marginLeft: '20px' }}>
              Roll No: <span className='placeholder'>{selectedRollNumber}</span>
            </div>
          </div>
        </div>
        <div className='paragraph'>
          This student is permitted for all the attempts of{' '}
          <span>{new Date().getFullYear()}</span> exam.
        </div>
        <div className='footer'>
          <div className='left'>
            <div className='stamp'>Stamp</div>
          </div>
          <div className='right'>
            <div className='signature'>Signature</div>
            <div className='dateNow'>
              Date: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      {paid ? (
        <button className='admitbtn' onClick={handlePrint} id='admitPrint'>
          Print
        </button>
      ) : (
        <>
        <h3 className='h2-admitButton'>
          Admit Card is not valid{' '}
        </h3>
        <h2 className='h2-admitButton'>
          Can not download admit with debt{' '}
        </h2>
        </>
      )}
    </>
  )
}

export default Admit
