import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core';
import Layout from '../layouts/Layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { loginFormOptions } from '../utils/formOptions';
import { wrapper } from '../store';
import { GetServerSideProps, NextPage } from 'next';
import { CircularProgress } from '@mui/material';
import { useActions } from '../utils/hooks/useActions'
import { useState } from 'react';

const Login: NextPage = () => {
    const { handleSubmit, control, formState: { errors } } = useForm(loginFormOptions);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { loginUser } = useActions();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const submitHandler = async ({ email, password }: any) => {
        closeSnackbar();
        try {
            setLoading(true);
            await loginUser({ email, password });
            router.push('/');
        } catch (e) {
            enqueueSnackbar('Неправильный логин или пароль', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    }
    return (
        <Layout title='Вход'>
            <form className='form' onSubmit={handleSubmit(submitHandler)}>
                <Typography component='h1' variant='h4' align='center'>
                    Вход
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name='email'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    id='email'
                                    label='Email'
                                    fullWidth
                                    inputProps={{ type: 'email' }}
                                    {...field}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email ? errors.email.message : ''}
                                ></TextField>
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name='password'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    id='password'
                                    label='Пароль'
                                    fullWidth
                                    inputProps={{ type: 'password' }}
                                    {...field}
                                    type='password'
                                    error={Boolean(errors.password)}
                                    helperText={errors.password ? errors.password.message : ''}
                                ></TextField>
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Button
                            variant='contained'
                            type='submit'
                            fullWidth
                            color='primary'
                            disabled={loading}
                        >
                            {loading ? <CircularProgress /> : 'Войти'}
                        </Button>
                    </ListItem>
                    <ListItem >
                        <Typography>
                            Нет аккаунта? &nbsp;
                            <NextLink href='/register' passHref>
                                <Link>Зарегистрироваться</Link>
                            </NextLink>
                        </Typography>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Login;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ctx => {
    const user = store.getState().auth.user
    if (user?._id) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {}
        }
    }
    return {
        props: {}
    }
});

