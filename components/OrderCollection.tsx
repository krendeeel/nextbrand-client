import {
    IconButton,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import NextLink from 'next/link';
import { ICartItem } from '../types/Cart.type';


interface OrderCollectionProps {
    items: ICartItem[],
    cart?: boolean,
    onRemove?: (item: ICartItem) => void,
    onUpdate?: (item: ICartItem, value: number) => void,
}

const OrderCollection: React.FC<OrderCollectionProps> =
    ({ items, cart = false, onRemove, onUpdate }) => {
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Фото</TableCell>
                            <TableCell align='center'>Продукт</TableCell>
                            <TableCell align='center'>Размер</TableCell>
                            <TableCell align='center'>Количество</TableCell>
                            <TableCell align='center'>Цена</TableCell>
                            {cart && <TableCell align='center'>Удалить</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell align='center'>
                                    <NextLink href={`/product/${item._id}`} passHref>
                                        <Link>
                                            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                                        </Link>
                                    </NextLink>
                                </TableCell>

                                <TableCell align='center'>
                                    <NextLink href={`/product/${item._id}`} passHref>
                                        <Link underline='none'>
                                            <Typography>{item.name}</Typography>
                                        </Link>
                                    </NextLink>
                                </TableCell>
                                <TableCell align='center'>
                                    {item.size}
                                </TableCell>
                                <TableCell align='center'>
                                    {cart
                                        ? (
                                            <FormControl style={{ width: '50px', margin: '7px 0 0 10px' }}>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    variant='standard'
                                                    value={item.quantity}
                                                    onChange={(e: any) => (onUpdate ? onUpdate(item, e.target.value) : null)}
                                                >
                                                    {
                                                        [1, 2, 3].map(s => <MenuItem key={s + 'key'} value={s}>{s}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>)
                                        : (
                                            <Typography>{item.quantity} </Typography>
                                        )}
                                </TableCell>
                                <TableCell align='center' >
                                    {item.price} ₽
                                </TableCell>
                                {cart &&
                                    (
                                        <TableCell align='center'>
                                            <IconButton onClick={() => (onRemove ? onRemove(item) : null)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

export default OrderCollection;