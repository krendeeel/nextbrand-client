import {
    Button,
    CircularProgress,
    Grid,
    List,
    ListItem,
    TextField,
    Typography
} from '@material-ui/core'
import { GetServerSideProps, NextPage } from 'next';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Layout from '../layouts/Layout';
import { wrapper } from '../store';
import { useActions } from '../utils/hooks/useActions';
import { useTypedSelector } from '../utils/hooks/useTypedSelector';
import { fullFormOptions } from '../utils/formOptions';

const Profile: NextPage = () => {

    const { updateUser } = useActions();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { user, isLoading, error } = useTypedSelector(state => state.auth);
    const { handleSubmit, control, formState: { errors }, setValue } = useForm(fullFormOptions);

    useEffect(() => {
        setValue('name', user ? user.name : '')
        setValue('email', user ? user.email : '')
    }, [user, setValue])

    const submitHandler = ({ name, email, password }: any) => {
        closeSnackbar()
        updateUser({ name, email, password })
        error
            ? enqueueSnackbar(error, { variant: 'error' })
            : enqueueSnackbar('Данные успешно обновлены!', { variant: 'success' });
    }

    return (
        <Layout title='Настройки'>
            <Grid container spacing={1} justifyContent='center'>
                <Grid item md={9} xs={12}>
                    <form className='form' onSubmit={handleSubmit(submitHandler)}>
                        <Typography component='h1' variant='h4' align='center'>
                            Настройки
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
                                    {isLoading ? <CircularProgress /> : 'Обновить'}
                                </Button>
                            </ListItem>
                        </List>
                    </form>
                </Grid>
            </Grid>
        </Layout >
    )
}
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ctx => {
    const user = store.getState().auth.user
    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {}
        }
    }
    return {
        props: {}
    }
});

export default Profile;