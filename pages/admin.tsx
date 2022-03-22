import {
    IconButton,
    Link,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { GetServerSideProps, NextPage } from 'next';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import Layout from '../layouts/Layout';
import { wrapper } from '../store';
import AuthDataService from '../api/auth';
import { adminInfo } from '../types/Auth.type';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductsDataService from '../api/products';
import AddProductForm from '../components/AddProductForm';
import NextLink from 'next/link';

interface AdminProps {
    adminInfo: adminInfo
}

const Admin: NextPage<AdminProps> = ({ adminInfo }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const removeProduct = async (id: string) => {
        closeSnackbar();
        try {
            await ProductsDataService.removeProduct(id);
            enqueueSnackbar('Товар успешно удален!', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Ошибка', { variant: 'error' });
        }
    }

    return (
        <Layout title='Управление'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddProductForm setOpen={setOpen} />
            </Modal>
            <div className='admin'>
                <section className='admin__info'>
                    <div className='admin__info_item'>
                        <span>Пользователи</span>
                        <span>{adminInfo.usersCount}</span>
                    </div>
                    <div className='admin__info_item'>
                        <span>Товары</span>
                        <span>{adminInfo.productsCount}</span>
                    </div>
                    <div className='admin__info_item'>
                        <span> Заказы</span>
                        <span>{adminInfo.ordersCount}</span>
                    </div>
                </section>
                <hr style={{ marginTop: '20px' }} />
                <section className='admin__dashboard'>
                    <div className='dashboard__products'>
                        <h5>
                            Каталог товаров
                            <IconButton>
                                <AddCircleIcon
                                    onClick={handleOpen}
                                    color='success'
                                />
                            </IconButton>
                        </h5>

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>id</TableCell>
                                        <TableCell align='center'>Название</TableCell>
                                        <TableCell align='center'>Удалить</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {adminInfo.products.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell align='center'>{product._id}</TableCell>
                                            <TableCell align='center'>
                                                <NextLink href={`/product/${product._id}`} passHref>
                                                    <Link>
                                                        {product.name}
                                                    </Link>
                                                </NextLink >
                                            </TableCell>
                                            <TableCell align='center'>
                                                <IconButton onClick={() => removeProduct(product._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <hr />
                    <div className='dashboard__orders'>
                        <h5 style={{ margin: '15px 0 7px 0' }}>Список заказов</h5>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>id</TableCell>
                                        <TableCell align='center'>Информация</TableCell>
                                        <TableCell align='center'>Доставка</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {adminInfo.orders.map((order) => (
                                        <TableRow
                                            key={order._id}
                                        >
                                            <TableCell align='center'>{order._id}</TableCell>
                                            <TableCell align='center'>
                                                <NextLink href={`/order/${order._id}`} passHref>
                                                    <IconButton>
                                                        <InfoIcon color='info' />
                                                    </IconButton>
                                                </NextLink>
                                            </TableCell>
                                            <TableCell align='center'>
                                                {
                                                    order.isPaid
                                                        ? <CheckCircleOutlineIcon color='success' />
                                                        : <ErrorIcon color='error' />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </section>
            </div>
        </Layout >
    )
}
//@ts-ignore
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ctx => {
    try {
        const user = store.getState().auth.user;
        if (!user.isAdmin) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/login",
                },
                props: {}
            }
        }
        const adminInfo = await AuthDataService.getAdminInfo();
        return {
            props: {
                adminInfo
            }
        }
    } catch (error) {
        return {
            props: {
                adminInfo: {}
            }
        }
    }

});

export default Admin;