import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Container,
    Typography,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Avatar,
    useTheme,
    useMediaQuery,
    IconButton,
    InputAdornment,
} from "@mui/material";
import {
    Person as PersonIcon,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "admin@example.com" && password === "password" && role) {
            localStorage.setItem("token", "user_authenticated");
            localStorage.setItem("role", role);
            navigate("/");
        } else {
            setError("Invalid email, password, or role");
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
                padding: theme.spacing(2),
            }}
        >
            <Container component="main" maxWidth="xs">
                <Paper
                    elevation={24}
                    sx={{
                        padding: isMobile ? theme.spacing(3) : theme.spacing(4),
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: theme.spacing(2),
                        background: "rgba(255, 255, 255, 0.95)",
                    }}
                >
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: theme.palette.primary.main,
                            marginBottom: 2,
                        }}
                    >
                        <PersonIcon fontSize="large" />
                    </Avatar>

                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            marginBottom: 1,
                            color: theme.palette.text.primary,
                        }}
                    >
                        Welcome Back
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            marginBottom: 3,
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Please sign in to continue
                    </Typography>

                    <form onSubmit={handleLogin} style={{ width: "100%" }}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />

                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>Select Role</InputLabel>
                            <Select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                variant="outlined"
                                required
                                sx={{ mt: 1 }}
                            >
                                <MenuItem value="master">Master/Head</MenuItem>
                                <MenuItem value="teacher">Teacher</MenuItem>
                            </Select>
                        </FormControl>

                        {error && (
                            <Typography
                                color="error"
                                variant="body2"
                                sx={{
                                    marginBottom: 2,
                                    padding: 1,
                                    bgcolor: "error.light",
                                    borderRadius: 1,
                                    textAlign: "center",
                                }}
                            >
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                padding: theme.spacing(1.5),
                                borderRadius: theme.shape.borderRadius,
                                textTransform: "none",
                                fontSize: "1.1rem",
                                marginBottom: 2,
                                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                                "&:hover": {
                                    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                                },
                            }}
                        >
                            Sign In
                        </Button>

                        {/* <Typography
              variant="body2"
              align="center"
              sx={{ color: theme.palette.text.secondary }}
            >
              Forgot your password?{" "}
              <Button
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Reset it here
              </Button>
            </Typography> */}
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;