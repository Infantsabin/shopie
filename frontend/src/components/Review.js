import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import ShippingNext from "./ShippingNext";
import axios from "axios";

export default function Review(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");

   useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/api/cart`, { params: { token: token } })
        .then((response) => {
          setProducts(response.data.values);
          setTotal(response.data.overall_total);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      axios
        .get(`http://localhost:9292/api/check-out/${props.orderId}`, { params: { token: token } })
        .then((response) => { 
          console.log(response.data.values)
          setAddresses(response.data.values.shipping_address);
          setPayments(response.data.values.payment_detail);
          console.log(addresses, payments)
          console.log(addresses.name)
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
   }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
   const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    const token = localStorage.getItem("token");

    axios
      .put(
        `http://localhost:9292/api/check-out/${props.orderId}`,
        {
          token: token,
        }
      )
      .then((response) => {
        console.log(response.status);
        props.handleNext();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.count}`} />
            <Typography variant="body2"> &#8377; {product.subtotal_price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            &#8377;{total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{addresses.name}</Typography>
          <Typography gutterBottom>{addresses.city +', '+addresses.state+ ', ' +addresses.country+', '+ addresses.post_code}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
              <React.Fragment>
                <Grid item xs={6}>
                <Typography gutterBottom>CardName: </Typography>
                <Typography gutterBottom>card_number: </Typography>
                <Typography gutterBottom>expiry_date: </Typography>
                <Typography gutterBottom>cvv:</Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography gutterBottom>{payments.card_name}</Typography>
                <Typography gutterBottom>{payments.card_number}</Typography>
                <Typography gutterBottom>{payments.expiry_date}</Typography>
                <Typography gutterBottom>{payments.cvv}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
      <ShippingNext next={handleSubmit} isFinal={true}  />
    </React.Fragment>
  );
}