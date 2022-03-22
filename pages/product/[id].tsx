import { Button, Grid, List, ListItem, Typography } from '@material-ui/core';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { Rating } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router'
import Layout from '../../layouts/Layout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousRoundedIcon from '@mui/icons-material/DangerousRounded';
import { useActions } from '../../utils/hooks/useActions';
import { useTypedSelector } from '../../utils/hooks/useTypedSelector';
import { wrapper } from '../../store';
import { IProduct } from '../../types/Product.type';
import ProductsDataService from '../../api/products'
import { useState } from 'react';
import { useSnackbar } from 'notistack';


interface ProductScreenProps {
    product: IProduct
}
const ProductScreen: NextPage<ProductScreenProps> = ({ product }) => {
    const { cartAddItem } = useActions();
    const { items } = useTypedSelector(state => state.cart);
    const [size, setSize] = useState('');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const router = useRouter()
    const addToCartHandler = async () => {
        closeSnackbar()
        if (size === '') {
            enqueueSnackbar('Выберите размер!', { variant: 'error' });
            return;
        }
        const existItem = items.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        cartAddItem({ ...product, quantity, size })
        router.push('/cart')
    }

    const handleChange = (event: any) => {
        setSize(event.target.value);
    };
    return (
        <Layout title={product?.name} description={product?.description}>
            <Grid container spacing={2}>
                <Grid item md={6} xs={12} >
                    <List>
                        <ListItem>
                            <img src={product.image} />
                        </ListItem>
                    </List>

                </Grid>
                <Grid item md={6} xs={12}>
                    <List>
                        <ListItem>
                            <Typography variant='h4' style={{ fontWeight: '700' }} >
                                {product.name}
                            </Typography>
                        </ListItem>

                        <ListItem>
                            <Rating name="read-only" value={product.rating} readOnly />
                        </ListItem>
                        <ListItem>
                            <Typography variant='h5' style={{ fontWeight: '700', color: 'blue' }}>
                                {product.price} ₽
                            </Typography>
                        </ListItem>
                        <ListItem>
                            {product.InStock
                                ? (
                                    <>
                                        <CheckCircleIcon color="success" />
                                        <Typography>
                                            &nbsp;В наличии.
                                        </Typography>
                                    </>
                                )
                                : (
                                    <>
                                        <DangerousRoundedIcon color="error" />
                                        <Typography>
                                            &nbsp;Нет в наличии.
                                        </Typography>
                                    </>
                                )
                            }
                        </ListItem>
                        <ListItem >
                            <Typography>
                                Выберите размер:
                            </Typography>
                            <FormControl style={{ width: '80px', margin: '0 0 0 10px' }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    variant='standard'
                                    value={size}
                                    onChange={handleChange}
                                >
                                    {
                                        product.sizes?.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <Typography style={{ textAlign: 'justify' }}>
                                {product.description}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Button
                                fullWidth
                                variant='contained'
                                color='primary'
                                onClick={addToCartHandler}
                                disabled={!product.InStock}
                            >
                                Добавить в корзину
                            </Button>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default ProductScreen;


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ctx => {
    //@ts-ignore
    const { id } = ctx.params;
    const product = await ProductsDataService.getProduct(id);
    return {
        props: {
            product
        }
    }
});