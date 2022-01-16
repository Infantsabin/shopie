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
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Navbar from './Navbar'
import Footer from './Footer'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const theme = createTheme();

export default function Cart() {
    const navigate = useNavigate();
    const [name, setName] = useState("Shopie User");
    const [cards, setCards] = useState([]);
    const [loading , setLoading ] = useState(true);
    const [count, setCount] = useState(0);
    const token = localStorage.getItem('token')

    const updateCartItem = (id,update_count) => {
      setCount(count + update_count);
      axios.put(`http://localhost:9292/api/cart/${id}`, { count: update_count, token: token})
      .then(response => {
          let current_card = cards.filter(i => i.id === id)
          let newArr = [...cards]; // copying the old datas array
          current_card[0]["count"] = response.data.count
          let index = cards.findIndex(i => i.id === id)
          newArr[index] = current_card[0]
          setCards(newArr);
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
    }

    const deleteCartItem = (id) => {
      axios.delete(`http://localhost:9292/api/cart/${id}`, { params: {token: token}})
      .then(response => {
          setCount(count - response.data.count);
          let newArr = [...cards]; // copying the old datas array
          let index = cards.findIndex(i => i.id === id)
          newArr.splice(index, 1);
          setCards(newArr);
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
    }

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            axios.get('http://localhost:9292/api/cart', { params: {token: token}})
            .then(response => {
                setName(response.data.values[0].user_name);
                setCount(response.data.cart_count);
                setCards(response.data.values)
                setLoading(false)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
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
            {loading ? (
              <Grid container>
                {Array.from(new Array(3)).map((r,index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Stack spacing={1} >
                      <Skeleton variant="text" width={210} />
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="rectangular" width={210} height={118} />
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <>
              {cards.map((card) => (
                <Grid item key={card.id} xs={8}>
                  <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                          <Img alt="complex" src={card.image_url} />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={8} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                              {card.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Offer: {card.discount}&#37;
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ID: {card.code}
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
                                  updateCartItem(card.id, -1);
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </Button>
                              <Button disabled>
                                {card.count}
                              </Button>
                              <Button
                                aria-label="increase"
                                onClick={() => {
                                  updateCartItem(card.id, 1);
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </Button>
                            </ButtonGroup>
                          </Grid>
                        </Grid>
                        <Grid>
                          <Grid item style={{marginBottom: '60px'}}>
                              <IconButton aria-label="delete" onClick={() => {
                                  deleteCartItem(card.id);
                                }}>
                                <CloseIcon />
                              </IconButton>
                            </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" component="div">
                              &#8377; {card.price}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                ))}
                </>
                 )}
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
                  disabled
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