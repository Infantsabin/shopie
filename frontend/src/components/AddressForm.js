import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ShippingNext from "./ShippingNext";

export default function AddressForm(props) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    addressLin1: '',
    addressLin2: '',
    city: '',
    state: '',
    postCode: '',
    country: ''
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
        `http://localhost:9292/api/check-out/${props.orderId}/shipping-address`,
        {
          first_name: form.firstName,
          last_name: form.lastName,
          address_lin1: form.address1,
          address_lin2: form.address2,
          city: form.city,
          state: form.state,
          post_code: form.zip,
          country: form.country,
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
        Shipping address
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={handleFormState}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={handleFormState}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              onChange={handleFormState}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              onChange={handleFormState}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              onChange={handleFormState}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              onChange={handleFormState}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              onChange={handleFormState}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              onChange={handleFormState}
            />
          </Grid>
        </Grid>
        <ShippingNext next={handleSubmit} isFinal={false}  />
    </React.Fragment>
  );
}
