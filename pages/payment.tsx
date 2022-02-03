import { Button, List, ListItem, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { SyntheticEvent, useEffect, useState } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../layouts/Layout';
import Card from '../components/Card'
import { Grid, TextField } from '@mui/material';
import InputMask from 'react-input-mask';
import { useTypedSelector } from '../utils/hooks/useTypedSelector';
import { NextPage } from 'next';
import { useActions } from '../utils/hooks/useActions';


const Payment: NextPage = () => {
    const { shipping, payment } = useTypedSelector(state => state.cart);
    const router = useRouter();
    useEffect(() => {
        !shipping && router.push('/shipping');
    }, [])
    const { cartSetPayment } = useActions();
    const [focus, setFocus] = useState(false);
    const [cvc, setCvc] = useState(payment?.cvc || '');
    const [number, setNumber] = useState(payment?.number || '');
    const [owner, setOwner] = useState(payment?.owner || '');
    const [expires, setExpires] = useState(payment?.expires || '');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        closeSnackbar();
        if (
            cvc[cvc.length] == '_' ||
            number[number.length] == '_' ||
            owner[owner.length] == '_' ||
            expires[expires.length] == '_' ||
            !cvc || !owner || !number || !expires
        ) {
            enqueueSnackbar('Ошибка в указании данных!', { variant: 'error' });
        } else {
            cartSetPayment({ owner, number, expires, cvc });
            router.push('/placeorder');
        }
    }

    const backHandler = () => {
        router.push('/shipping')
    }

    return (
        <Layout title='Способ оплаты'>
            <CheckoutWizard activeStep={2} />
            <Grid
                container
                spacing={1}
                direction='row'
                alignItems='center'
                justifyContent='center'
                className='payment'>
                <Grid item md={6} xs={12}>
                    <Card
                        back={focus}
                        number={number}
                        expires={expires}
                        cvc={cvc}
                        owner={owner} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <List>
                        <Typography variant='h5' className='bolder' align='center'>
                            Заполните данные карты
                        </Typography>
                        <ListItem>
                            <TextField
                                defaultValue={payment?.owner || ''}
                                onChange={(e) => setOwner(e.target.value)}
                                fullWidth
                                label='Владелец'
                            />
                        </ListItem>
                        <ListItem>
                            <InputMask
                                defaultValue={payment?.number || ''}
                                mask="9999 9999 9999 9999"
                                onChange={(e) => setNumber(e.target.value)}
                            >
                                {(inputProps: any) =>
                                    <TextField
                                        {...inputProps}
                                        fullWidth
                                        label='Номер карты'
                                    />}
                            </InputMask >
                        </ListItem>
                        <ListItem>
                            <InputMask
                                defaultValue={payment?.expires || ''}
                                mask="99/99"
                                onChange={(e) => setExpires(e.target.value)}
                            >
                                {(inputProps: any) =>
                                    <TextField
                                        {...inputProps}
                                        label='Срок действия'
                                        fullWidth
                                    />}
                            </InputMask>
                        </ListItem>
                        <ListItem>
                            <InputMask
                                defaultValue={payment?.cvc || ''}
                                mask="999"
                                onChange={(e) => setCvc(e.target.value)}
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                            >
                                {(inputProps: any) =>
                                    <TextField
                                        {...inputProps}
                                        fullWidth
                                        label='СVC код'
                                    />}
                            </InputMask>
                        </ListItem>
                        <ListItem>
                            <Button
                                fullWidth
                                onClick={submitHandler}
                                variant='contained'
                                color='primary'
                            >
                                Продолжть
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button
                                fullWidth
                                type='button'
                                variant='contained'
                                onClick={backHandler}
                            >
                                Назад
                            </Button>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Layout >
    )
}

export default Payment;