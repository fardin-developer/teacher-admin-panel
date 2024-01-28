import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import './index.css'

const Invoices = () => {
  const [allUser, setAllUser] = useState();
  const [mockDataInvoices, setMockdataIn] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await fetch("https://backend-teacher-production.up.railway.app/users");
        const data = await resData.json();
        setMockdataIn(data.users)

        localStorage.setItem('data', JSON.stringify(data.users));
        // console.log(data.users);

      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   console.log(mockDataInvoices);
  // })

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('data'));
    if (items) {
      // console.log(items);
    }
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.gray);


  return (
    <>
   <div className="mainInvoice">
  <table className="gridTable">
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>Salay</th>
        <th>phone</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {localStorage.getItem('data') && JSON.parse(localStorage.getItem('data')).map(item => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.cost}</td>
          <td>{item.phone}</td>
          <td>{item.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    
    </>

  );
};

export default Invoices;
