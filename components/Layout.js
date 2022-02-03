import React, { useContext, useState } from 'react';
import Head from 'next/head'
import NextLink from 'next/link'
import { AppBar, Avatar, Badge, Button, Container, CssBaseline, Divider, Link, ListItemIcon, Menu, MenuItem, Switch, Toolbar, Typography } from '@mui/material';
import useStyles from '../utils/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Store} from '../utils/Store'
import Cookies from 'js-cookie';
import { Logout, Router, Settings } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Image from 'next/image'

export default function Layout({title, description, children}) {

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.9),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '10ch',
      },
    },
  }));
    const router = useRouter();
    const {state, dispatch} = useContext(Store);
    const {darkMode, cart, userInfo} = state;
    const theme = createTheme({
        typography:{
            h1:{
                fontSize  : '1.6rem',
                fontWeight: 400,
                margin    : '1rem 0'
            },
            h2:{
                fontSize  : '1.4rem',
                fontWeight: 400,
                margin    : '1rem 0'
            },
            body1:{
                fontWeight: 'normal',
            },
        },
        palette:{
            mode:darkMode?'dark':'light',
            primary:{
                main:'#f0c000',
            },
            secondary: {
                main:'#ff0000',
            },
            danger:{
                main:'#ff0000'
            }
        },
    })
  
  const classes = useStyles();
  const darkModeChangeHandler =()=>{
      dispatch({type:darkMode?'DARK_MODE_OFF':'DARK_MODE_ON'});
      const newDarkMode =!darkMode;
      Cookies.set('darkMode', newDarkMode?"ON":"OFF");
  }
  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  const profileHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const closeProfileHandler = () => {
    setAnchorEl(null);
  };
  const logoutHandler =()=>{
    setAnchorEl(null);
    dispatch({type:"USER_LOGOUT"});
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');    
  }
  const profileMenuHandler =(e, redirect)=>{
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  
  return <div>
      <Head>
            <title>{title?`${title} - Amazon `:'Amazon'}</title>
            {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme} >
          <CssBaseline/>
      <AppBar position ='static' className={classes.navbar}>
          <Toolbar>
              <NextLink href="/" passHref>
                  <Link underline='none' >
                  <Image src="/images/amazon_icon.png" alt="logo" width={150} height={30}></Image>
                    {/* <Typography className={classes.brand}> Amazon</Typography> */}
                  </Link>
              </NextLink>
              <div className={classes.grow} >
              <Search>
                <SearchIconWrapper>
                 <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              </div>
              <div className={classes.grow}></div>
              <div style={{display:'flex', alignItems:"center"}} >
                  <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
                   <div className={classes.navbarHello}>
                    <p>
                        Hi
                    </p>
                    </div>
                    {userInfo?
                    (
                    <>
                    <Button 
                     style={{margin:'0 1rem 0 0.4rem',}}
                     className={classes.navbarButton}
                     onClick={profileHandler}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}                     
                     >{userInfo.name.split(" ")[0]}</Button>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={closeProfileHandler}
                        onClick={closeProfileHandler}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem 
                         onClick={(e) => profileMenuHandler(e, '/profile')}
                         >
                        <Avatar 
                             sx={{ bgcolor: "#203040"}}
                        >{userInfo.name.split("")[0].toUpperCase()}</Avatar> Profile
                        </MenuItem>
                        {/* <MenuItem>
                        <Avatar /> My account
                        </MenuItem> */}
                        <Divider />
                        {/* <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                        </MenuItem> */}
                        <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                        </MenuItem>
                        <MenuItem onClick={logoutHandler}>
                        <ListItemIcon>
                            <Logout fontSize="small" color='secondary' />
                        </ListItemIcon>
                        <Typography color='secondary' >Logout</Typography> 
                        </MenuItem>
                    </Menu>
                    </>
                    )
                    :
                    (<NextLink href="/login" passHref>
                    <Link underline='none'>
                     <Typography  style={{margin:'0 1rem 0 0.4rem',}} fontSize='bold'>
                         <LoginOutlinedIcon/>
                         </Typography>
                    </Link>
                    </NextLink>)
                     }
                  <NextLink href="/cart" passHref>
                      <Link underline='none'>
                        {cart.cartItems.length >0? <Badge color="secondary" badgeContent ={cart.cartItems.length}>
                        <ShoppingCartIcon/>
                         </Badge> :<ShoppingCartIcon/>}
                     </Link>
                  </NextLink>                 
              </div>
          </Toolbar>
      </AppBar>
      <Container className={classes.main}>
          {children}
      </Container>
      <footer className={classes.footer}>
          <Typography>
              All rights reserved. cool ! :)
          </Typography>
      </footer>
      </ThemeProvider>
  </div>;
}
