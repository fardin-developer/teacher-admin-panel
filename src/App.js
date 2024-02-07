import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import FAQ from "./scenes/salaryUpgrade";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import SalaryGenerate from './scenes/salaryGenerate/SalaryGenerate'
import SalarySlip from './scenes/SalarySlip/SalarySlip'
import Holiday from "./scenes/Holiday";
import HalfHoliday from "./scenes/Half";
import Admit from "./scenes/Admit/Admit";
import CreateStudent from "./scenes/CreateStudent/CreateStudent";
import DateCheck from './scenes/DateCheck/DateCheck'
import StudentPayment from "./scenes/StudentPayment/StudentPayment";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<SalaryGenerate />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/date" element={<DateCheck />} />
              <Route path="/create-student" element={<CreateStudent />} />
              <Route path="/payment-upgrade" element={<StudentPayment />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/half-holiday" element={<HalfHoliday />} />
              <Route path="/holiday" element={<Holiday />} />
              <Route path="/salary-upgrade" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/salary-slip" element={<SalarySlip />} />
              <Route path="/salary-generate" element={<SalaryGenerate />} />
              <Route path="/admit" element={<Admit />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
