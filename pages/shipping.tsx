import { Button, List, ListItem, TextField, Typography } from '@material-ui/core';
import Layout from '../layouts/Layout';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import { NextPage } from 'next';
import { shippingFormOptions } from '../utils/formOptions';
import { useActions } from '../utils/hooks/useActions';
import { useTypedSelector } from '../utils/hooks/useTypedSelector';
import { useEffect } from 'react';


const Shipping: NextPage = () => {
    const { user } = useTypedSelector(state => state.auth);
    const router = useRouter();
    useEffect(() => {
        !user && router.push('/login');
    }, []);
    const { handleSubmit, control, formState: { errors } } = useForm(shippingFormOptions);
    const { cartSetShipping } = useActions();
    const { shipping } = useTypedSelector(state => state.cart);

    const submitHandler = ({ fullName, address, city, postalCode, country }: any) => {
        cartSetShipping({ fullName, address, city, postalCode, country });
        router.push('/payment');
    };
    return (
        <Layout title='Адрес доставки'>
            <CheckoutWizard activeStep={1} />
            <form className='form' onSubmit={handleSubmit(submitHandler)}>
                <Typography component='h1' variant='h5' align='center' className='bolder'>
                    Заполните адрес доставки
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name='fullName'
                            control={control}
                            defaultValue={shipping?.fullName || ''}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    id='fullName'
                                    label='Полное имя'
                                    fullWidth
                                    {...field}
                                    error={Boolean(errors.fullName)}
                                    helperText={errors.fullName ? errors.fullName.message : ''}
                                ></TextField>
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name='country'
                            control={control}
                            defaultValue={shipping?.country || ''}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    id='country'
                                    label='Страна'
                                    fullWidth
                                    {...field}
                                    error={Boolean(errors.country)}
                                    helperText={errors.country ? errors.country.message : ''}
                                ></TextField>
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name='city'
                            control={control}
                            defaultValue={shipping?.city || ''}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    id='city'
                                    label='Город'
                                    fullWidth
                                    {...field}
                                    error={Boolean(errors.city)}
                                    helperText={errors.city ? errors.city.message : ''}
                                ></TextField>
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name='address'
                            control={control}
                            defaultValue={shipping?.address || ''}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    id='address'
                                    label='Адрес'
                                    fullWidth
                                    {...field}
                                    error={Boolean(errors.address)}
                                    helperText={errors.address ? errors.address.message : ''}
                                ></TextField>
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name='postalCode'
                            control={control}
                            defaultValue={shipping?.postalCode || ''}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    id='postalCode'
                                    label='Почтовый индекс'
                                    fullWidth
                                    {...field}
                                    error={Boolean(errors.postalCode)}
                                    helperText={errors.postalCode ? errors.postalCode.message : ''}
                                ></TextField>
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Button variant='contained' type='submit' fullWidth color='primary'>
                            Продолжить
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Shipping;