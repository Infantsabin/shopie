import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function ShippingNext(props) {
    return (
             <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {/* {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )} */}

                  <Button
                    variant="contained"
                    onClick={props.next}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {props.isFinal ? "Place order" : "Next"}
                  </Button>
                  </Box>
                  
    )
}

