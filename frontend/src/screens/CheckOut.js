import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import NotificationAlert from 'react-notification-alert';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import Navbar from "../components/Navbar";
import Review from "../components/Review";
import axios from "axios";

const steps = ["Shipping address", "Payment details", "Review your order"];

const theme = createTheme();

export default function Checkout() {
  const navigate = useNavigate();
  // const notificationRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("Shopie User");
  const [orderId, setOrderId] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/api/order`, { params: { token: token } })
        .then((response) => {
          setOrderId(response.data.values.order_id);
          setName(response.data.values.user_name);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar name={name} />
      <Container
        component="main"
        maxWidth="sm"
        sx={{ mb: 4 }}
        className="cart-main"
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/");
                  }}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Go to Dashboard
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === 0 && (
                  <AddressForm orderId={orderId} handleNext={handleNext} />
                )}
                {activeStep === 1 && (
                  <PaymentForm orderId={orderId} handleNext={handleNext} />
                )}
                {activeStep === 2 && (
                  <Review orderId={orderId} handleNext={handleNext} />
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
