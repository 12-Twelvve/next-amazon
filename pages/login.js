import { Button, Link, List, ListItem, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect} from 'react';
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


export default function Login() {
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
    const submitHandler =  async({email, password})=>{
        closeSnackbar();
        try{
            const {data} = await axios.post('/api/users/login',
             {email, password}
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
    }
  return(
      <Layout title = "LogIn">
          <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
              <Typography component="h1" variant="h1" fullWidth>
                  Login
              </Typography>
              <List>
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
                                ? 'Hint: Email is not valid'
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
                                ? 'Hint: Atleast 8 characters'
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
                          Login
                      </Button>
                  </ListItem>
                  <ListItem>
                     <Typography>Don&apos;t have account?&nbsp;&nbsp;</Typography> 
                      <NextLink href={`/register?redirect=${redirect || '/'} `} passHref>
                          <Link> Register</Link>
                      </NextLink>
                  </ListItem>
              </List>
          </form>
      </Layout>
  );
}
