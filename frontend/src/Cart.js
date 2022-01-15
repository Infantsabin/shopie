import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Navbar from './Navbar'
import Footer from './Footer'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();
const cards = [1, 2, 3, 4];

export default function Cart() {
    const navigate = useNavigate();
    const [name, setName] = useState("Shopie User");
    const [count, setCount] = useState(0);
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            // axios.get('http://localhost:9292/api/auth/user', { params: {token: token}})
            // .then(response => {
            //     setName(response.data.values.name);
            // })
            // .catch(error => {
            //     console.error('There was an error!', error);
            //     navigate('/')
            // });
        }
      }, []);// eslint-disable-line react-hooks/exhaustive-deps
  
    const Img = styled('img')({
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    });

  return (
    <ThemeProvider theme={theme}>
      <Navbar name={name} count={count}/>
      <main>
        {/* Hero unit */}
        <Container sx={{ py: 8 }} maxWidth="ms">
          <Grid container spacing={2}>
            {cards.map((card) => (
              <Grid item key={card} xs={8}>
                <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80" />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={8} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1" component="div">
                            Standard license
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Full resolution 1920x1080 • JPEG
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: 1030114
                          </Typography>
                        </Grid>
                        <Grid item>
                          {/* <Typography sx={{ cursor: 'pointer' }} variant="body2">
                            Remove
                          </Typography> */}
                          <ButtonGroup>
                            <Button
                              aria-label="reduce"
                              onClick={() => {
                                setCount(Math.max(count - 1, 0));
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </Button>
                            <Button disabled>
                              {count}
                            </Button>
                            <Button
                              aria-label="increase"
                              onClick={() => {
                                setCount(count + 1);
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </Button>
                          </ButtonGroup>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Grid item style={{marginBottom: '60px'}}>
                            <IconButton aria-label="delete">
                              <CloseIcon />
                            </IconButton>
                          </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" component="div">
                            $19.00
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          <Grid item xs={4} style={{position: 'fixed', right: 0,margin: '16px',top: '100px', bottom: '14px', width: 'inherit'}}>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Cart Details:
                </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Subtotal:   $100
                  </Typography>
                  <Typography variant="body2">
                    Total:   $100
                  </Typography>
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Checkout
              </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4} style={{position: 'fixed', right: 0,margin: '16px', bottom: '14px', width: 'inherit'}}>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Coupon:
                </Typography>
                <Grid item>
                  <TextField
                    required
                    id="expDate"
                    label="Promotion Code"
                    fullWidth
                    autoComplete="cc-exp"
                    variant="standard"
                  />
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Apply Coupon
              </Button>
              </CardActions>
            </Card>
          </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Footer />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}