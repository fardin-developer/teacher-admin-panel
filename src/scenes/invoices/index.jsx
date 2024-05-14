import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import './index.css';

const Invoices = () => {
  const [mockDataInvoices, setMockDataInvoices] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://lms.fardindev.me/users");

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      const users = data.users || [];

      console.log(users);
      setMockDataInvoices(users);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.gray);

  return (
    <div className="mainInvoice">
      <table className="gridTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Phone</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {mockDataInvoices.map(item => (
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
  );
};

export default Invoices;
