import React, { useState } from 'react';
import './salary.css';
import { useNavigate } from "react-router-dom";

const Months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const Salary = () => {
    const [sname, setName] = useState('');
    const [smonth, setMonth] = useState('');
    const [syear, setYear] = useState('2024');

    const navigate = useNavigate();




    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    }

    const handleYearChange = (event) => {
        setYear(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (smonth && syear && sname) {

            const selectedDate = new Date(syear, smonth);
            const currentDate = new Date();

            if (selectedDate > currentDate) {
                alert('Please select a previous or current month.');
                return;
            }


            const body = JSON.stringify({ month: smonth, year: syear, name: sname });

            console.log(`Selected Month: ${Months[smonth]}, Year: ${syear}`);
            try {
                const response = await fetch('http://localhost:4000/salary', {
                    method: 'POST',
                    headers: {
                        Accept: 'application.json',
                        'Content-Type': 'application/json'
                    },
                    body: body,
                    cache: 'default'
                });
                if (response.ok) {
                    const responseData = await response.json();


                    localStorage.setItem('salaryDetails', JSON.stringify({
                        name: sname,
                        month: smonth,
                        year: syear,
                        attendences: responseData.numberOfPresentAttendances,
                        sunday: responseData.sundaysCount,
                        baseslary: responseData.baseslary,
                        salary: responseData.finalSalary,
                        lateTimeCount: responseData.lateTimeCount,
                        lateTimeSalary: responseData.lateTimeSalary
                    }));
                    navigate("/salary-slip");

                } else {
                    console.log('failed to sent data');
                }
            } catch (error) {
                console.log("err " + error);
            }

        } else {
            alert('Please fill all the fields');
        }
    }

    return (
        <form className="salary-form" onSubmit={handleSubmit} >
            <h1 className="salary-heading">Salary</h1>
            <label htmlFor="month" className="salary-label">Month:</label>
            <select id="month" value={smonth} onChange={handleMonthChange} className="salary-select">
                <option value="">Select Month</option>
                {Months.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                ))}
            </select>

            {/* Example for year selection */}
            <div className='labelnInpt'>
                <label htmlFor="year" className="salary-label">Year</label>
                <input type="number" id="year" value={syear} onChange={handleYearChange} className="salary-input" />
            </div>

            <div className='labelnInpt'>

                <label htmlFor="Name" className="salary-label">Name</label>
                <input type="text" id="name" value={sname} onChange={(e) => { setName(e.target.value) }} className="salary-input" />
            </div>
            <div className="button" style={{width:"90%",display:"flex",justifyContent:"end"}}>
            <button type="submit" className="submit-button">Submit</button>

            </div>
        </form>
    );
};

export default Salary;
