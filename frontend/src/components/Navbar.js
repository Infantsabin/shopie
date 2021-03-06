import React from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Fingerprint from "@mui/icons-material/Fingerprint";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import "asserts/css/Dashboard.css";

function Navbar(props) {
    const navigate = useNavigate();
    
  let isCart = (props.count !== undefined)
    
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/");
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
  return (
    <AppBar position="fixed">
      <div>
        <Toolbar className="navbar-menu">
          <div>
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              onClick={() => navigate("/dashboard")}
            >
              Shopie
            </Typography>
          </div>
          <div className="navbar-icon">
            <LightTooltip title={props.name}>
              <Fingerprint sx={{ mr: 2 }} />
            </LightTooltip>
            {isCart && (
              <>
                <IconButton
                  aria-label="cart"
                  style={{ marginRight: "14px" }}
                  onClick={() => navigate("/cart")}
                >
                  <StyledBadge badgeContent={props.count} color="success">
                    <ShoppingCartIcon style={{ color: "#fff" }} />
                  </StyledBadge>
                </IconButton>
              </>
            )}
            <LightTooltip title="logout" onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 2 }} />
            </LightTooltip>
          </div>
        </Toolbar>
      </div>
    </AppBar>
  );
}
export default Navbar;
