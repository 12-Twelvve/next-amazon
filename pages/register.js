import { Button, Link, List, ListItem, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link'
import axios from 'axios';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';

export default function Register() {
    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const {redirect} = router.query; 
    const {state, dispatch} =useContext(Store);
    const {userInfo} = state; 
    useEffect(()=>{
        if (userInfo){
            router.push('/');
        }
    },[]);
    const classes = useStyles();
    const submitHandler =  async({name, email, password, confirmPassword})=>{
        closeSnackbar();        
        if(password === confirmPassword){
            try{
                const {data} = await axios.post('/api/users/register',
                {name, email, password}
                );
                
                dispatch({type:'USER_LOGIN', payload:data});
                Cookies.set('userInfo',JSON.stringify(data))
                router.push(redirect || '/');
            }catch(err){
                // enqueueSnackbar(
                //     err.response.data ? err.response.data.message : err.message,
                //     { variant: 'error' }
                //   );
                enqueueSnackbar(getError(err), { variant: 'error' });
             }
        }else{
            enqueueSnackbar("Passwords didn't match. Try Again", { variant: 'error' });
        }
        }
  return(
      <Layout title = "Register">
          <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
              <Typography component="h1" variant="h1" fullWidth>
                  Register
              </Typography>
              <List>
                  <ListItem>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                        minLength: 3,
                    }}
                    render={({ field }) => (
                        <TextField
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Name"
                        inputProps={{ type: 'name' }}
                        error={Boolean(errors.name)}
                        helperText={
                            errors.name
                            ? errors.name.type === 'minLength'
                                ? 'Name length is more than 2'
                                : 'Name is required'
                            : ''
                        }
                        {...field}
                        ></TextField>
                    )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    }}
                    render={({ field }) => (
                        <TextField
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email"
                        inputProps={{ type: 'email' }}
                        error={Boolean(errors.email)}
                        helperText={
                            errors.email
                            ? errors.email.type === 'pattern'
                                ? 'Email is not valid'
                                : 'Email is required'
                            : ''
                        }
                        {...field}
                        ></TextField>
                    )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                        minLength: 8,
                    }}
                    render={({ field }) => (
                        <TextField
                        variant="outlined"
                        fullWidth
                        id="password"
                        label="Password"
                        inputProps={{ type: 'password' }}
                        error={Boolean(errors.password)}
                        helperText={
                            errors.password
                            ? errors.password.type === 'minLength'
                                ? 'Use 8 characters or more for your password'
                                : 'Password is required'
                            : ''
                        }
                        {...field}
                        ></TextField>
                    )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                        minLength: 8,
                    }}
                    render={({ field }) => (
                        <TextField
                        variant="outlined"
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        inputProps={{ type: 'password' }}
                        error={Boolean(errors.confirmPassword)}
                        helperText={
                            errors.confirmPassword
                            ? errors.confirmPassword.type === 'minLength'
                                ? 'Use 8 characters or more for your password'
                                : 'Password is required'
                            : ''
                        }
                        {...field}
                        ></TextField>
                    )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                      <Button variant='contained' type="submit" color="primary" fullWidth>
                          Register
                      </Button>
                  </ListItem>
                  <ListItem>
                     <Typography>Already have an account?&nbsp;&nbsp;</Typography> 
                      <NextLink href={`/login?redirect=${redirect || '/'} `} passHref>
                          <Link> Login</Link>
                      </NextLink>
                  </ListItem>
              </List>
          </form>
      </Layout>
  );
}
