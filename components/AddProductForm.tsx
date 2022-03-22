import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { List, ListItem, TextField, CircularProgress, } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { produtsFields } from '../data/data';
import ProductsDataService from '../api/products';

interface AddProductFormProps {
    setOpen: (open: boolean) => void
}

const AddProductForm: React.FC<AddProductFormProps> = ({ setOpen }) => {
    const { handleSubmit, control, formState: { errors }, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const submitHandler = async ({ name, category, image, price, brand, foor, sizes, description }: any) => {
        closeSnackbar()
        try {
            setIsLoading(true);
            const addSizes = sizes.split(' ').map((i: string) => i);
            await ProductsDataService.addProduct({
                name,
                category,
                image,
                price,
                brand,
                for: foor,
                sizes: addSizes,
                description,
                InStock: true
            });
            enqueueSnackbar('Товар добавлен!', { variant: 'success' });
            setOpen(false);
        } catch (error) {
            enqueueSnackbar("Ошибка", { variant: 'error' })
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Box className='admin__modal_content'>
            <form className='form' onSubmit={handleSubmit(submitHandler)}>
                <Typography component='h1' variant='h5' align='center'>
                    Заполните данные о товаре
                </Typography>
                <List>
                    {
                        produtsFields.map(i => (
                            <ListItem>
                                <Controller
                                    name={i.name}
                                    control={control}
                                    defaultValue=''
                                    render={({ field }) => (
                                        <TextField
                                            variant='outlined'
                                            id={i.name}
                                            label={i.label}
                                            required
                                            fullWidth
                                            inputProps={{ type: 'text' }}
                                            {...field}
                                        ></TextField>
                                    )}
                                />
                            </ListItem>
                        ))
                    }
                    <ListItem>
                        <Button
                            variant='contained'
                            type='submit'
                            fullWidth
                            color='primary'
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress /> : 'Добавить'}
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Box>
    );
}

export default AddProductForm;
