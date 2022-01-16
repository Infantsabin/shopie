import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Navbar from './Navbar'
import Footer from './Footer'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const theme = createTheme();

export default function Dashboard() {
    const navigate = useNavigate();
    const [name, setName] = useState("Shopie User");
    const [cards, setCards] = useState([]);
    const [loading , setLoading ] = useState(true);
    const [count, setCount] = useState(0);
    const token = localStorage.getItem('token')

    useEffect(() => {        
        if (!token) {
            navigate('/')
        } else {
            axios.get('http://localhost:9292/api/product')
            .then(response => {
                setCards(response.data.values)
                setLoading(false)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

            axios.get('http://localhost:9292/api/auth/user', { params: {token: token}})
            .then(response => {
                setName(response.data.values.name);        
                setCount(response.data.values.cart_count);        
            })
            .catch(error => {
                console.error('There was an error!', error);
                navigate('/')
            });
        }
      }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
    const dateConvert = (date) => {
      return (new Date(date)).toISOString().split('T')[0]
    }

    const addToCart = (id) => {
      setCount(count+1)
      axios.post('http://localhost:9292/api/cart', {product_id: id, token: token})
        .then(response => {
          console.log(response.status)
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
  return (
    <ThemeProvider theme={theme}>
        <Navbar name={name} count={count} />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 2,
            pb: 2,
          }}
        >
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
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
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: blue[600] }} aria-label="recipe">
                        {card.name[0]}
                    </Avatar>
                    }
                    title={card.name}
                    subheader={dateConvert(card.created_at)}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={card.image_url}
                    alt="dish"
                />
                <CardContent>
                  <div className='cart-bottom'>
                  <Typography variant="body2" color="text.secondary">
                     &#8377; {card.price}
                  </Typography>
                  <Button variant="outlined" startIcon={<AddShoppingCartIcon />} onClick={() => addToCart(card.id)}>Add to Cart</Button>
                  </div>
                </CardContent>
                </Card>
              </Grid>
            ))}
            </>
          )}
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