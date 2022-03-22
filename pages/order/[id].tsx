import {
    Grid,
    List,
    ListItem,
    Typography,
    Button,
    CircularProgress
} from '@material-ui/core';
import { GetServerSideProps, NextPage } from 'next';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import Layout from '../../layouts/Layout';
import OrderCollection from '../../components/OrderCollection';
import CheckIcon from '@mui/icons-material/Check';
import { wrapper } from '../../store';
import OrdersDataService from '../../api/orders'
import { IOrder } from '../../types/Order.type';
import cookies from 'next-cookies';
import { useTypedSelector } from '../../utils/hooks/useTypedSelector';


interface OrderProps {
    order: IOrder,
    token?: string
}

const Order: NextPage<OrderProps> = ({ order, token }) => {
    const { shippingAddress: { fullName, address, city, country, postalCode } } = order;
    const { user } = useTypedSelector(state => state.auth)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const deliveredOrder = async () => {
        closeSnackbar();
        setLoading(true);
        try {
            const newOrder = await OrdersDataService.diliveredOrder(order._id, token);
            order.deliveredAt = newOrder.deliveredAt;
            order.isDelivered = newOrder.isDelivered;
        } catch (e) {
            enqueueSnackbar('Доставка не подтверждена!', { variant: 'error' })
        }
        setLoading(false)
    }

    return (
        <Layout title='Заказ'>
            <Grid container spacing={1} justifyContent='center'>
                <Grid item md={9} xs={12}>
                    <List>
                        <Typography
                            align='center'
                            component='h3'
                            variant='h5'
                            className='bolder'
                        >
                            Заказ {order._id}
                        </Typography>
                        <ListItem>
                            <Typography component='h2' variant='h6'>Адрес</Typography>
                        </ListItem>
                        <ListItem>
                            {fullName}, {address}, {' '} {city}, {postalCode} {' '}, {country}
                        </ListItem>
                        <ListItem>
                            <Typography component='h2' variant='h6'>Карта</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography> **** **** **** {order.paymentMethod}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography component='h2' variant='h6'>Цена</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>{order.totalPrice} ₽</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography component='h2' variant='h6'>Оплачено</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className='bolder' style={{ color: 'green' }}>{order.paidAt}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography component='h2' variant='h6'>Доставлено</Typography>
                        </ListItem>
                        <ListItem>
                            {order.isDelivered
                                ? (<Typography className='bolder' style={{ color: 'green' }}>{order.deliveredAt}</Typography>)
                                : (<Typography>Заказ отправлен</Typography>)
                            }
                        </ListItem>
                        <ListItem>
                            <Typography component='h2' variant='h6' align='center'>Заказ</Typography>
                        </ListItem>
                        <ListItem>
                            <OrderCollection items={order.orderItems} />
                        </ListItem>
                        {!order.isDelivered && <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
                            {(order._id === user?._id) && <Button
                                variant="contained"
                                style={{ background: 'green', color: 'white' }}
                                endIcon={<CheckIcon />}
                                disabled={loading}
                                onClick={deliveredOrder}
                            >
                                {loading ? <CircularProgress /> : 'Потвердить получение'}
                            </Button>}
                        </ListItem>}
                    </List>
                </Grid>
            </Grid>
        </Layout >
    )
}
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ctx => {
    try {
        const { token } = cookies(ctx);
        //@ts-ignore
        const { id } = ctx.params;
        const response = await OrdersDataService.getOneOrder(id, token || '');
        return {
            props: {
                order: response,
                token
            }
        }
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {
                order: {} as IOrder,
                token: ''
            }
        }
    }

});

export default Order;
