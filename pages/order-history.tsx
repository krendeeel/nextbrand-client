import {
    Card,
    Grid,
    List,
    ListItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core'
import { IconButton } from '@mui/material'
import Link from 'next/link'
import InfoIcon from '@mui/icons-material/Info';
import Layout from '../layouts/Layout'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import { GetServerSideProps, NextPage } from 'next'
import { wrapper } from '../store';
import cookies from 'next-cookies'
import OrdersDataService from '../api/orders/index'
import { IOrder } from '../types/Order.type';
import { getDate } from '../utils/getDate';
interface OrderHistoryProps {
    orders: Array<IOrder>
}

const OrderHistory: NextPage<OrderHistoryProps> = ({ orders }) => {
    return (
        <Layout title='История заказов'>
            <Grid container spacing={1} justifyContent='center'>
                <Grid item md={9} xs={12}>
                    <Card className='section'>
                        <List>
                            <ListItem>
                                <Typography component='h1' variant='h4'>
                                    История заказов
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center'>id</TableCell>
                                                <TableCell align='center'>Дата</TableCell>
                                                <TableCell align='center'>Цена</TableCell>
                                                <TableCell align='center'>Оплачено</TableCell>
                                                <TableCell align='center'>Доставлено</TableCell>
                                                <TableCell align='center'>Детали</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map((order) => (
                                                <TableRow key={order._id}>
                                                    <TableCell align='center'>{order._id.substring(20, 24)}</TableCell>
                                                    <TableCell align='center'>{getDate(order.createdAt)}</TableCell>
                                                    <TableCell align='center'>{order.totalPrice} ₽</TableCell>
                                                    <TableCell align='center'>
                                                        {
                                                            order.isPaid
                                                                ? <CheckCircleOutlineIcon color='success' />
                                                                : <ErrorIcon color='error' />
                                                        }
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        {
                                                            order.isDelivered
                                                                ? <CheckCircleOutlineIcon color='success' />
                                                                : <ErrorIcon color='error' />
                                                        }
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        <Link href={`/order/${order._id}`} passHref>
                                                            <IconButton>
                                                                <InfoIcon color='info' />
                                                            </IconButton>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout >
    )
}

export default OrderHistory;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ctx => {
    try {
        const { token } = cookies(ctx);
        const response = await OrdersDataService.getOrdersHistory(token);
        return {
            props: {
                orders: response
            }
        }
    } catch (error) {
        return {
            props: {
                orders: []
            }
        }
    }

});