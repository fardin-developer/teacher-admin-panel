import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import FAQ from "./scenes/salaryUpgrade";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, tokens, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import SalaryGenerate from './scenes/salaryGenerate/SalaryGenerate';
import SalarySlip from './scenes/SalarySlip/SalarySlip';
import Holiday from "./scenes/Holiday";
import HalfHoliday from "./scenes/Half";
import Admit from "./scenes/Admit/Admit";
import CreateStudent from "./scenes/CreateStudent/CreateStudent";
import DateCheck from './scenes/DateCheck/DateCheck';
import StudentPayment from "./scenes/StudentPayment/StudentPayment";
import Login from "./scenes/Login/Login";
import { isLoggedIn, isMaster, isTeacher } from "./utils/auth";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const isAuthenticated = isLoggedIn();
  const checkTeacher = isTeacher();
  const isMasters = isMaster()


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ height: "auto" }}>
          {isAuthenticated && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isAuthenticated && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    checkTeacher ? <Navigate to="/salary" /> : <Dashboard />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              {isAuthenticated ? (
                <>
                  <Route path="/team" element={<Team />} />
                  <Route path="/salary" element={<SalaryGenerate />} />
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
                </>
              ) : (
                <Route path="*" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
