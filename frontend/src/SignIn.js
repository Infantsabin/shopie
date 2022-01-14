import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer'

const theme = createTheme();

export default function SignIn() {

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
 
  useEffect(() => {
    if (token) {
        navigate('/home')
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.post('http://localhost:9292/api/auth/user/verify', {email: data.get('email'),password_digest: data.get('password')})
        .then(response => {
            toast.success('Signed-In successfully..!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });          
            localStorage.setItem('token', response.data.values.token);
            navigate('/home')
        })
        .catch(error => {
            toast.error('Oops!..Wrong credentials..!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            console.error('There was an error!', error);
        });
  };
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <ToastContainer />
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // onChange={(e) => setEmail(e.target.value)}
                // value={email}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // onChange={(e) => setPassword(e.target.value)}
                // value={password}
                autoComplete="current-password"
              />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    Create New Account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Footer />
        </Box>
        {/* End footer */}
      </ThemeProvider>
    );
}