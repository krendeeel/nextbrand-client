import {
    Button,
    Grid,
    Link,
    List,
    ListItem,
    Typography,
    Card,
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../layouts/Layout';
import OrderCollection from '../components/OrderCollection';
import { useActions } from '../utils/hooks/useActions';
import { useTypedSelector } from '../utils/hooks/useTypedSelector';
import { ICartItem } from '../types/Cart.type';
import { NextPage } from 'next';

const Cart: NextPage = () => {
    const { cartAddItem, cartRemoveItem, cartSetItems } = useActions();
    const { items } = useTypedSelector(state => state.cart)
    const router = useRouter();
    const updateCartHandler = async (item: ICartItem, quantity: number) => {
        cartAddItem({ ...item, quantity })
    }

    const removeItemHandler = (item: ICartItem) => {
        cartRemoveItem(item)
    }

    const checkoutHandler = () => {
        router.push('/shipping');
    }
    return (
        <Layout title='Корзина'>
            {items.length === 0 ?
                (
                    <>
                        <Typography className='bolder' variant='h4' align='center' style={{ marginTop: '10px' }}>
                            Корзина пуста!
                        </Typography>
                        <Typography className='bolder' variant='h6' align='center'>
                            <NextLink href='/products' passHref>
                                <Link>К покупкам</Link>
                            </NextLink>
                        </Typography>
                    </>)
                :
                (
                    <>
                        <Typography component='h1' variant='h5' style={{ margin: '10px 0' }}>Корзина</Typography>
                        <Grid container spacing={1}>
                            <Grid item md={9} xs={12}>
                                <OrderCollection
                                    items={items}
                                    cart
                                    onRemove={removeItemHandler}
                                    onUpdate={updateCartHandler}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <Card>
                                    <List>
                                        <ListItem>
                                            <Typography variant='h6'>
                                                Ваша корзина
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Grid container>
                                                <Grid item xs={6} >
                                                    <Typography> Товары ({items.reduce((a: number, c) => a + c.quantity, 0)})</Typography>
                                                </Grid>
                                                <Grid item xs={6} >
                                                    <Typography align='right'> {items.reduce((a: number, c) => a + c.quantity * c.price, 0)} ₽</Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem>
                                            <Button onClick={checkoutHandler} variant='contained' color='primary' fullWidth>
                                                Оформить заказ
                                            </Button>
                                        </ListItem>
                                    </List>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                )
            }
        </Layout >
    )
}

export default dynamic(() => Promise.resolve(Cart), { ssr: true })
