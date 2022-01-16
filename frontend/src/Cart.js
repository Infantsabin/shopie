import React, { useEffect, useState } from "react";
import "./Cart.css";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();

export default function Cart() {
  const navigate = useNavigate();
  const [name, setName] = useState("Shopie User");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [basketPriceRange, setBasketPriceRange] = useState(0);
  const [basketDiscount, setBasketDiscount] = useState(0);
  const token = localStorage.getItem("token");

  const updateCartItem = (id, update_count) => {
    setCount(count + update_count);
    axios
      .put(`http://localhost:9292/api/cart/${id}`, {
        count: update_count,
        token: token,
      })
      .then((response) => {
        console.log(cards);
        let current_card = cards.filter((i) => i.id === id);
        let newArr = [...cards]; // copying the old datas array
        current_card[0]["count"] = response.data.count;
        current_card[0]["subtotal_price"] = response.data.subtotal_price;
        let index = cards.findIndex((i) => i.id === id);
        newArr[index] = current_card[0];
        setCards(newArr);
        setTotal(response.data.overall_total);
        setBasketDiscount(response.data.overall_discount);
        setBasketPriceRange(response.data.price_range);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const deleteCartItem = (id) => {
    axios
      .delete(`http://localhost:9292/api/cart/${id}`, {
        params: { token: token },
      })
      .then((response) => {
        setCount(count - response.data.count);
        let newArr = [...cards]; // copying the old datas array
        let index = cards.findIndex((i) => i.id === id);
        newArr.splice(index, 1);
        setCards(newArr);
        setTotal(response.data.overall_total);
        setBasketDiscount(response.data.overall_discount);
        setBasketPriceRange(response.data.price_range);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleCheckout = (id) => {
    axios.put(`http://localhost:9292/api/order/${id}`, { total: (total - basketDiscount), token: token })
      .then((response) => {
        console.log(response.status)
        navigate('/check-out')
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      axios
        .get("http://localhost:9292/api/cart", { params: { token: token } })
        .then((response) => {
          setName(response.data.values[0].user_name);
          setOrderId(response.data.values[0].order_id);
          setCount(response.data.cart_count);
          setCards(response.data.values);
          setTotal(response.data.overall_total);
          setBasketDiscount(response.data.overall_discount);
          setBasketPriceRange(response.data.price_range);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  return (
    <ThemeProvider theme={theme}>
      <Navbar name={name} count={count} />
      <main className="cart-main">
        {/* Hero unit */}
        <Container>
          <Grid container spacing={2}>
            {loading ? (
              <Grid container>
                {Array.from(new Array(3)).map((r, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Stack spacing={1}>
                      <Skeleton variant="text" width={210} />
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton
                        variant="rectangular"
                        width={210}
                        height={118}
                      />
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <>
                <Grid className="cart-list" md={12}>
                  {cards.map((card) => (
                    <Grid item key={card.id} xs={8} className="cart-list-items">
                      <Paper sx={{ p: 1, margin: "auto", flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <ButtonBase sx={{ width: 128, height: 128 }}>
                              <Img alt="complex" src={card.image_url} />
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={8} sm container>
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              <Grid item xs>
                                <Typography
                                  gutterBottom
                                  variant="subtitle1"
                                  component="div"
                                >
                                  {card.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Offer: {card.discount}&#37;
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
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
                                  <Button disabled>{card.count}</Button>
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
                            <Grid className="cart-delete">
                              <Grid item style={{ marginBottom: "60px" }}>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => {
                                    deleteCartItem(card.id);
                                  }}
                                >
                                  <CloseIcon />
                                </IconButton>
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle1" component="div">
                                  <strike>&#8377; {card.price}</strike> &#8377;{" "}
                                  {card.discount_price}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
            <Grid item xs={4} className="cart-detail-main">
              <Card variant="outlined" className="cart-sec1">
                <CardContent className="cart-sec2">
                  <Typography gutterBottom variant="h5" component="div">
                    Cart Details:
                  </Typography>
                  <Typography color="text.secondary">
                    Subtotal:
                  </Typography>
                    {cards.map((card) => (
                     <Typography key={card.id} variant="body2" color="text.secondary">
                        {card.name}: {card.count} x {card.price} =  &#8377; {card.subtotal_price}
                      </Typography>
                    ))}
                      
                     
                  {basketDiscount && basketDiscount !== 0 ? (
                      <>
                        <Typography color="text.secondary">
                          BasketDiscount: &#8377; {basketDiscount} { `( > ₹${basketPriceRange})`}
                        </Typography>
                        <Typography color="text.secondary">
                              Total:  <strike>&#8377; {total}</strike> {' '} &#8377; {total - basketDiscount}
                        </Typography>
                      </>
                    ) : (
                        <Typography color="text.secondary">
                            Total:  &#8377; {total}
                        </Typography>
                    )}
                </CardContent>
                <CardActions className="checkout-btn" onClick={() => handleCheckout(orderId)}>
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
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Footer />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
