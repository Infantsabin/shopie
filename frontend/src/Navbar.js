import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import './Home.css';

function Navbar(props) {
    return (
        <AppBar position="relative">
            <div>
                <Toolbar className='navbar-menu'>
            <div>
            <Typography variant="h6" color="inherit" noWrap>
                Shopie
            </Typography>
            </div>
            <div>
                <ShoppingCartIcon sx={{ mr: 2 }} />
                <LogoutIcon sx={{ mr: 2 }} />
            </div>
            </Toolbar>
            </div>
        </AppBar>
    )
}
export default Navbar

