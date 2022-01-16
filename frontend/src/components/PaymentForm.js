import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ShippingNext from "./ShippingNext";
import axios from "axios";

export default function PaymentForm(props) {
   const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
   })
  const handleFormState = (e) => {
      setForm({...form, [e.target.name]: e.target.value})
  }
   const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    const token = localStorage.getItem("token");

    axios
      .post(
        `http://localhost:9292/api/check-out/${props.orderId}/payment-detail`,
        {
          card_name: form.cardName,
          card_number: form.cardNumber,
          expiry_date: form.expDate,
          cvv: form.cvv,
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
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handleFormState}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleFormState}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={handleFormState}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handleFormState}
          />
        </Grid>
      </Grid>
      <ShippingNext next={handleSubmit} isFinal={false}  />
    </React.Fragment>
  );
}