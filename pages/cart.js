import { Button, Card, Grid, IconButton, Link, List, ListItem, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link'
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useRouter } from 'next/router';



function CartScreen() {
  const {state, dispatch} = useContext(Store);
  const {cart:{cartItems}} = state; 
  const router = useRouter();
  const updateCartHandler = async(item, quantity)=>{
    const {data} = await axios.get(`/api/products/${item._id}`);
    if(data.countInStock < quantity){
        window.alert('sorry product is out of stock');
        return;
    }
    dispatch({type:'CART_ADD_ITEM', payload:{...item, quantity}});
  }
const removeItemHandler = (item)=>{
    dispatch({type:'CART_REMOVE_ITEM', payload:item});
}    
    const checkOutHandler = ()=>{
        router.push('/shipping')
    }

    return (
        <Layout title="shopping cart">
            <Typography component="h1" variant="h1"> Shopping Cart</Typography>
            {cartItems.length ===0? 
            (<div>
                Cart is Empty.{' '}
                <NextLink href="/" passHref>
                    <Link>
                    <h2>
                        {/* empty component */}
                      Go shopping
                    </h2>
                    </Link>
                </NextLink>
            </div>):
            (
                <Grid container spacing ={1}>
                    <Grid item md={9} xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableCell>Image</TableCell>
                                    <TableCell>name</TableCell>
                                    <TableCell align='right'>Quantity</TableCell>
                                    <TableCell align='right'>Price</TableCell>
                                    <TableCell align='right'>Action</TableCell>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item)=>(
                                        <TableRow key = {item._id}>
                                            <TableCell>
                                                <NextLink href={`/product/${item.slug}`} passHref>
                                                    <Link>
                                                    <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                                                    </Link>
                                                </NextLink>
                                            </TableCell>
                                            <TableCell>
                                                <NextLink href={`/product/${item.slug}`} passHref>
                                                    <Link>
                                                    <Typography>{item.name}</Typography>
                                                    </Link>
                                                </NextLink>
                                            </TableCell>
                                            <TableCell align='right'>
                                                <Select
                                                 value={item.quantity}
                                                 onChange={(e)=>updateCartHandler(item, e.target.value)}
                                                 >
                                                    {[...Array(item.countInStock).keys()].map((x)=>(
                                                            // x+1<=10?
                                                            <MenuItem key={x+1} value={x+1}>
                                                                {x+1}
                                                            </MenuItem>
                                                            // :(x+1)<=100?
                                                            // (
                                                            //  ((x+1)%10)==0 && 
                                                            //  <MenuItem key= {x+1} value={x+1}>{x+1}</MenuItem>
                                                            // )
                                                            // :
                                                            // (x+1)%100==0 && 
                                                            // <MenuItem key= {x+1} value={x+1}>{x+1}</MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell align='right'>
                                                ${item.price}
                                            </TableCell>
                                            <TableCell align='right'>
                                                <IconButton color="warning" onClick={()=>removeItemHandler(item)}>
                                                <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
            
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card>
                            <List>
                                <ListItem>
                                    <Typography variant="h2">
                                        Subtotal : {cartItems.reduce((a, c)=> a + c.quantity, 0)}{' '}items
                                    </Typography>
                                                                       
                                </ListItem>
                                <ListItem>
                                   <Typography variant='h2'>
                                       Total Price :  ${cartItems.reduce((a, c) => a+ c.quantity * c.price, 0)}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Button onClick={checkOutHandler} variant="contained" color="primary" fullwidth>
                                        Check Out
                                    </Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            )
            }
        </Layout>
    )
}

export default dynamic(()=> Promise.resolve(CartScreen), {ssr:false});