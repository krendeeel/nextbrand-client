import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React from 'react'
import Layout from '../layouts/Layout'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useActions } from '../utils/hooks/useActions'
import { useTypedSelector } from '../utils/hooks/useTypedSelector'
import { fullFormOptions } from '../utils/formOptions'
import { CircularProgress } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import { wrapper } from '../store'

const Register: NextPage = () => {
    const { handleSubmit, control, formState: { errors } } = useForm(fullFormOptions);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const { isLoading, error } = useTypedSelector(state => state.auth)
    const { registerUser } = useActions()
    const router = useRouter()

    const submitHandler = async ({ name, email, password }: any) => {
        closeSnackbar()
        await registerUser({ name, email, password });
        error
            ? enqueueSnackbar(error, { variant: 'error' })
            : router.push('/')
    }

    return (
        <Layout title='Регистрация'>
            <form className='form' onSubmit={handleSubmit(submitHandler)}>
                <Typography component='h1' variant='h4' align='center'>
                    Регистрация
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name='name'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    id='name'
                                    label='Имя'
                                    fullWidth
                                    inputProps={{ type: 'text' }}
                                    {...field}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name ? errors.name.message : ''}
                                ></TextField>
                            )}
                        />
                    </ListItem>
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
                                    error={Boolean(errors.password)}
                                    helperText={errors.password ? errors.password.message : ''}
                                ></TextField>
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name='confirmPassword'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    id='confirmPassword'
                                    label='Подтвердите пароль'
                                    fullWidth
                                    inputProps={{ type: 'password' }}
                                    {...field}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
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
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress /> : 'Зарегистрироваться'}
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Уже есть аккаунт? &nbsp;
                            <NextLink href='/login' passHref>
                                <Link> Войти</Link>
                            </NextLink>
                        </Typography>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Register;


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ctx => {
    const user = store.getState().auth.user
    if (user) {
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