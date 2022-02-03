import {
    Button,
    Grid,
    Link,
    List,
    ListItem,
    Typography,
    Card,
    CircularProgress
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react'
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../layouts/Layout';
import OrderCollection from '../components/OrderCollection';
import { useTypedSelector } from '../utils/hooks/useTypedSelector';
import OrdersDataService from '../api/orders/index'
import { useActions } from '../utils/hooks/useActions';
import { IShipping } from '../types/Cart.type';
import { parseCookies } from 'nookies';
import { NextPage } from 'next';

const PlaceOrder: NextPage = () => {
    const { token } = parseCookies();
    const { shipping, payment, items, isLoading } = useTypedSelector(state => state.cart);
    const router = useRouter();
    const { cartSetLoading } = useActions()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100
    const itemsPrice = round2(items.reduce((a, c) => a + c.price * c.quantity, 0));
    const shippingPrice = itemsPrice < 200 ? 0 : 1500;
    const taxPrice = round2(itemsPrice * 0.15)
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

    useEffect(() => {
        if (!payment) {
            router.push('/payment')
        }
        if (items.length === 0) {
            router.push('/cart')
        }
    }, [])

    const placeorderHandler = async () => {
        closeSnackbar()
        try {
            cartSetLoading(true)
            const order = await OrdersDataService.createOrder({
                orderItems: items,
                paymentMethod: payment?.number.substr(14, 16) as string,
                shippingAddress: shipping as IShipping,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            }, token)
            enqueueSnackbar("Оплата прошла успешно!", { variant: 'success' })
            router.push(`/order/${order._id}`)

        } catch (err) {
            enqueueSnackbar("Заказ не оплачен!", { variant: 'error' })
        }
        cartSetLoading(false)
    }




    return (
        <Layout title='Оплата заказа'>
            <CheckoutWizard activeStep={3} />
            <Grid container spacing={1}>
                <Grid item md={9} xs={12}>
                    <List>
                        <Typography
                            align='center'
                            component='h3'
                            variant='h5'
                            className='bolder'
                        >
                            Проверьте детали заказа
                        </Typography>
                        <ListItem>
                            <NextLink href='/shipping' passHref>
                                <Link>
                                    <Typography component='h2' variant='h6'>Адрес</Typography>
                                </Link>
                            </NextLink>
                        </ListItem>
                        <ListItem>
                            {shipping?.fullName}, {shipping?.address}, {' '} {shipping?.city}, {shipping?.postalCode} {' '}, {shipping?.country}
                        </ListItem>
                        <ListItem>
                            <NextLink href='/payment' passHref>
                                <Link>
                                    <Typography component='h2' variant='h6'>Карта</Typography>
                                </Link>
                            </NextLink>
                        </ListItem>
                        <ListItem>
                            <Typography> **** **** **** {payment?.number.substr(14, 16)}</Typography>
                        </ListItem>
                        <ListItem>
                            <NextLink href='/cart' passHref>
                                <Link>
                                    <Typography component='h2' variant='h6'>Корзина</Typography>
                                </Link>
                            </NextLink>
                        </ListItem>
                        <ListItem>
                            <OrderCollection items={items} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card className='section'>
                        <List>
                            <ListItem>
                                <Typography variant='h6'>
                                    Заказ
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6} >
                                        <Typography>Товары:</Typography>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Typography align='right'>{itemsPrice} ₽</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6} >
                                        <Typography>Комиссия:</Typography>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Typography align='right'>{taxPrice} ₽</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6} >
                                        <Typography>Доставка:</Typography>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Typography align='right'>{shippingPrice} ₽</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6} >
                                        <Typography><strong>Итого:</strong></Typography>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Typography align='right'><strong>{totalPrice} ₽</strong></Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button onClick={placeorderHandler} variant='contained' color='primary' fullWidth>
                                    {isLoading ? <CircularProgress /> : 'Оплатить'}
                                </Button>
                            </ListItem>
                            {isLoading && (<ListItem>
                                <CircularProgress />
                            </ListItem>)}
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false })
