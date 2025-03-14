import { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, Grid, Paper, Card, CardContent, CircularProgress, Divider, Avatar, LinearProgress } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Header from "../../components/Header";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import axios from 'axios';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const handleExportPDF = () => {
  const input = document.getElementById('dashboard-content');
  const exportButton = document.getElementById('export');

  // Hide the export button temporarily
  exportButton.style.display = 'none';

  // Temporarily force desktop view styling
  const originalWidth = input.style.width;
  input.style.width = '1200px';

  // Wait a moment to ensure DOM updates are applied
  setTimeout(() => {
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'px', 'a4'); // landscape orientation for wide content

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;

      // Calculate available width/height after margin
      const availableWidth = pdfWidth - margin * 2;
      const availableHeight = pdfHeight - margin * 2;

      // Maintain aspect ratio
      let imgWidth = availableWidth;
      let imgHeight = (imgProps.height * availableWidth) / imgProps.width;

      // If image height is too big, adjust it
      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = (imgProps.width * availableHeight) / imgProps.height;
      }

      // Center the image inside the page with margin
      const xPos = (pdfWidth - imgWidth) / 2;
      const yPos = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);
      pdf.save('dashboard-report.pdf');

      // Revert back to original width and show export button again
      input.style.width = originalWidth;
      exportButton.style.display = ''; // Reset to original display
    });
  }, 300); // Small delay to apply style changes
};




// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const Dashboard = () => {
  const theme = useTheme();
  const colors = {
    grey: {
      100: theme.palette.mode === 'dark' ? '#e0e0e0' : '#141414',
      200: theme.palette.mode === 'dark' ? '#c2c2c2' : '#292929',
      300: theme.palette.mode === 'dark' ? '#a3a3a3' : '#3d3d3d',
      800: theme.palette.mode === 'dark' ? '#292929' : '#c2c2c2',
      900: theme.palette.mode === 'dark' ? '#141414' : '#e0e0e0',
    },
    primary: {
      400: theme.palette.mode === 'dark' ? '#1F2A40' : '#fcfcfc',
      500: theme.palette.mode === 'dark' ? '#141b2d' : '#f5f5f5',
    },
    greenAccent: {
      400: theme.palette.mode === 'dark' ? '#70D8BD' : '#2e7c67',
      500: theme.palette.mode === 'dark' ? '#4CCEAC' : '#3da58a',
      600: theme.palette.mode === 'dark' ? '#3DA58A' : '#4cceac',
    },
    redAccent: {
      400: theme.palette.mode === 'dark' ? '#F87171' : '#d32f2f',
      500: theme.palette.mode === 'dark' ? '#F87171' : '#f44336',
      600: theme.palette.mode === 'dark' ? '#DC2626' : '#e57373',
    },
    blueAccent: {
      300: theme.palette.mode === 'dark' ? '#93C5FD' : '#4d94ff',
      400: theme.palette.mode === 'dark' ? '#60A5FA' : '#2979ff',
      500: theme.palette.mode === 'dark' ? '#3B82F6' : '#1e88e5',
      600: theme.palette.mode === 'dark' ? '#2563EB' : '#1565c0',
      700: theme.palette.mode === 'dark' ? '#1D4ED8' : '#0d47a1',
    },
    orangeAccent: theme.palette.mode === 'dark' ? '#FB923C' : '#fb8c00',
  };
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(true);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:800/dashboard');
        console.log(response.data);

        setDashboardData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  const studentDuesData = {
    labels: ['Paid', 'Unpaid', 'Considered'],
    datasets: [
      {
        data: dashboardData ? [dashboardData.students.dues.paid, dashboardData.students.dues.unpaid, dashboardData.students.dues.considered] : [0, 0, 0],
        backgroundColor: [
          colors.greenAccent[500],
          colors.redAccent[500],
          colors.blueAccent[300],
        ],
        borderColor: [
          colors.greenAccent[400],
          colors.redAccent[400],
          colors.blueAccent[200],
        ],
        borderWidth: 1,
      },
    ],
  };

  const attendanceData = {
    labels: ['Present', 'Absent', 'Late', 'Incomplete'],
    datasets: [
      {
        label: 'Attendance Today',
        data: dashboardData ? [
          dashboardData.attendanceToday.summary.present,
          dashboardData.attendanceToday.summary.absent,
          dashboardData.attendanceToday.summary.late,
          dashboardData.attendanceToday.summary.inComplete,
        ] : [0, 0, 0, 0],
        backgroundColor: [
          colors.greenAccent[400],
          colors.redAccent[400],
          (colors.orangeAccent || colors.yellowAccent[400]) ?? '#FFA500',
          colors.blueAccent[300],
        ],
      },
    ],
  };

  const classLabels = dashboardData?.students.classWise?.map(item => `Class ${item.class}`) || [];
  const studentCounts = dashboardData?.students.classWise?.map(item => item.count) || [];

  const classWiseData = {
    labels: classLabels,
    datasets: [
      {
        label: 'Students per Class',
        data: studentCounts,
        backgroundColor: colors.blueAccent[400],
      },
    ],
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error" variant="h5">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ m: "20px", maxWidth: "100%" }} id="dashboard-content">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Header title="SCHOOL DASHBOARD" subtitle="Welcome to your school management dashboard" />

        <Box>
          <Box>
            <Button
              variant="contained"
              id="export"
              onClick={() => {
                handleExportPDF();
                setShowButton(false);
                setTimeout(() => setShowButton(true), 1500);
              }} sx={{
                bgcolor: colors.blueAccent[700],
                // color: colors.orangeAccent[400],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                '&:hover': {
                  bgcolor: colors.blueAccent[600],
                },
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Export Report
            </Button>
          </Box>

        </Box>
      </Box>

      {/* STATS CARDS */}
      <Grid container spacing={3} mb={3}>
        {/* STUDENTS STATS */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              bgcolor: colors.primary[400],
              borderRadius: 2,
              boxShadow: 3,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: colors.grey[100] }}
                    gutterBottom
                  >
                    Total Students
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: colors.greenAccent[500] }}
                  >
                    {dashboardData.students.total}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: colors.greenAccent[600],
                    height: 56,
                    width: 56,
                  }}
                >
                  <SchoolIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* DUES STATS */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              bgcolor: colors.primary[400],
              borderRadius: 2,
              boxShadow: 3,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: colors.grey[100] }}
                    gutterBottom
                  >
                    Fees Unpaid
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: colors.redAccent[500] }}
                  >
                    {dashboardData.students.dues.unpaid}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: colors.redAccent[600],
                    height: 56,
                    width: 56,
                  }}
                >
                  <PaymentsIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* TEACHERS STATS */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              bgcolor: colors.primary[400],
              borderRadius: 2,
              boxShadow: 3,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: colors.grey[100] }}
                    gutterBottom
                  >
                    Total Teachers
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: colors.blueAccent[500] }}
                  >
                    {dashboardData.teachers.total}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: colors.blueAccent[600],
                    height: 56,
                    width: 56,
                  }}
                >
                  <PersonIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ATTENDANCE STATS */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              bgcolor: colors.primary[400],
              borderRadius: 2,
              boxShadow: 3,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: colors.grey[100] }}
                    gutterBottom
                  >
                    Avg. Salary
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: colors.greenAccent[500] }}
                  >
                    ₹{Math.round(dashboardData.teachers.salary.avgBaseSalary).toLocaleString()}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: colors.greenAccent[600],
                    height: 56,
                    width: 56,
                  }}
                >
                  <AccessTimeIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* CHARTS SECTION */}
      <Grid container spacing={3}>
        {/* STUDENT DUES CHART */}
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              bgcolor: colors.primary[400],
              borderRadius: 2,
              boxShadow: 3,
              height: '100%',
              transition: 'box-shadow 0.3s',
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb={2} color={colors.grey[100]}>
                Student Fee Status
              </Typography>
              <Box height="300px" display="flex" alignItems="center" justifyContent="center">
                <Doughnut
                  data={studentDuesData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: colors.grey[100],
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            const total = dashboardData.students.total;
                            const value = context.raw;
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value} (${percentage}%)`;
                          }
                        }
                      }
                    },
                  }}
                />
              </Box>
              <Box mt={2} display="flex" justifyContent="space-around">
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight="bold" color={colors.greenAccent[500]}>
                    {dashboardData.students.dues.paid}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[100]}>Paid</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight="bold" color={colors.redAccent[500]}>
                    {dashboardData.students.dues.unpaid}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[100]}>Unpaid</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight="bold" color={colors.blueAccent[300]}>
                    {dashboardData.students.dues.considered}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[100]}>Considered</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* MONTHLY TREND */}
        <Grid item xs={12} md={6} lg={5}>
          <Card
            sx={{
              bgcolor: colors.primary[400],
              borderRadius: 2,
              boxShadow: 3,
              height: '100%',
              transition: 'box-shadow 0.3s',
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb={2} color={colors.grey[100]}>
                Students Per Class
              </Typography>
              <Box height="300px" display="flex" alignItems="center" justifyContent="center">
                <Bar
                  data={classWiseData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: colors.grey[100],
                        },
                        grid: {
                          color: colors.grey[900],
                        }
                      },
                      x: {
                        ticks: {
                          color: colors.grey[100],
                        },
                        grid: {
                          display: false,
                        }
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>

          </Card>
        </Grid>

        {/* SUMMARY CARD */}
        <Grid item xs={12} lg={3}>
          <Card
            sx={{
              bgcolor: colors.primary[400],
              borderRadius: 2,
              boxShadow: 3,
              height: '100%',
              transition: 'box-shadow 0.3s',
              '&:hover': {
                boxShadow: 6
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb={2} color={colors.grey[100]}>
                Financial Summary
              </Typography>
              <Box my={2}>
                <Typography variant="body1" color={colors.grey[100]}>
                  Total Salary Budget
                </Typography>
                <Typography variant="h4" fontWeight="bold" color={colors.greenAccent[500]}>
                  ₹{dashboardData.teachers.salary.totalBaseSalary.toLocaleString()}
                </Typography>
                <LinearProgressWithLabel value={85} color={colors.greenAccent[500]} />
              </Box>
              <Divider sx={{ my: 2, bgcolor: colors.grey[800] }} />
              <Box my={2}>
                <Typography variant="body1" color={colors.grey[100]}>
                  Student-Teacher Ratio
                </Typography>
                <Typography variant="h4" fontWeight="bold" color={colors.blueAccent[400]}>
                  {(dashboardData.students.total / dashboardData.teachers.total).toFixed(1)}:1
                </Typography>
              </Box>
              <Divider sx={{ my: 2, bgcolor: colors.grey[800] }} />
              <Box my={2}>
                <Typography variant="body1" color={colors.grey[100]}>
                  Fee Collection Rate
                </Typography>
                <Typography variant="h4" fontWeight="bold" color={colors.greenAccent[500]}>
                  {Math.round((dashboardData.students.dues.paid / dashboardData.students.total) * 100)}%
                </Typography>
                <LinearProgressWithLabel
                  value={(dashboardData.students.dues.paid / dashboardData.students.total) * 100}
                  color={colors.greenAccent[500]}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ATTENDANCE CHART */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              bgcolor: colors.primary[400],
              borderRadius: 2,
              boxShadow: 3,
              transition: 'box-shadow 0.3s',
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb={2} color={colors.grey[100]}>
                Today's Attendance
              </Typography>
              <Box height="250px" display="flex" alignItems="center" justifyContent="center">
                <Doughnut
                  data={attendanceData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: colors.grey[100],
                        }
                      }
                    },
                  }}
                />
              </Box>
              <Box mt={3} display="flex" justifyContent="center">
                <Typography variant="body2" color={colors.grey[300]}>
                  {dashboardData.attendanceToday.summary.present +
                    dashboardData.attendanceToday.summary.absent +
                    dashboardData.attendanceToday.summary.late +
                    dashboardData.attendanceToday.summary.inComplete === 0 ?
                    "No attendance recorded for today yet" :
                    "Attendance updated for today"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* TEACHERS SALARY DISTRIBUTION */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              bgcolor: colors.primary[400],
              borderRadius: 2,
              boxShadow: 3,
              transition: 'box-shadow 0.3s',
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb={2} color={colors.grey[100]}>
                Teachers Overview
              </Typography>
              <Box p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: colors.primary[500],
                        borderRadius: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" color={colors.grey[100]}>
                        Total Teachers
                      </Typography>
                      <Typography variant="h3" fontWeight="bold" color={colors.blueAccent[400]}>
                        {dashboardData.teachers.total}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: colors.primary[500],
                        borderRadius: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" color={colors.grey[100]}>
                        Late Today
                      </Typography>
                      <Typography variant="h3" fontWeight="bold" color={colors.redAccent[400]}>
                        {dashboardData.attendanceToday.lateTeachers.length}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: colors.primary[500],
                        borderRadius: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" color={colors.grey[100]}>
                        Salary Distribution
                      </Typography>
                      <Box height="120px" display="flex" alignItems="center" justifyContent="center">
                        <Bar
                          data={{
                            labels: ['<₹5000', '₹5000-₹6000', '₹6000-₹7000', '₹7000+'],
                            datasets: [
                              {
                                label: 'Teachers',
                                data: [3, 8, 7, 4],
                                backgroundColor: colors.blueAccent[400],
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                display: false,
                              },
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                                ticks: {
                                  color: colors.grey[100],
                                },
                                grid: {
                                  color: colors.grey[900],
                                }
                              },
                              x: {
                                ticks: {
                                  color: colors.grey[100],
                                },
                                grid: {
                                  display: false,
                                }
                              }
                            }
                          }}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const LinearProgressWithLabel = ({ value, color }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" alignItems="center" mt={1}>
      <Box width="100%" mr={1}>
        <Box
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: colors.grey[800],
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: `${value}%`,
              height: '100%',
              bgcolor: color,
              position: 'absolute',
              left: 0,
              top: 0,
              transition: 'width 0.5s ease-in-out',
            }}
          />
        </Box>
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color={colors.grey[100]}>{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;