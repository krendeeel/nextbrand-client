import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@material-ui/core';
import NextLink from 'next/link'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Grid } from '@mui/material'
import { SyntheticEvent } from 'react'
import { IProduct } from '../types/Product.type';
import { useActions } from '../utils/hooks/useActions';

interface ProductProps {
    product: IProduct
}

const Product: React.FC<ProductProps> = ({ product }) => {
    const { cartAddItem } = useActions();
    const addToCartHandler = async (e: SyntheticEvent) => {
        e.stopPropagation();
        cartAddItem({
            ...product,
            size: product.sizes ? product.sizes[0] : '',
            quantity: 1
        })
    }
    return (
        <Grid item md={4} xs={12} >
            <Card >
                <NextLink href={`/product/${product._id}`} passHref>
                    <CardActionArea className='product'>
                        <CardMedia
                            style={{ height: 200 }}
                            component='img'
                            image={product.image}
                        ></CardMedia>
                    </CardActionArea>
                </NextLink>
                <section className='product__content'>
                    <Typography className='bolder'>
                        {product.name.slice(0, 30)}
                    </Typography>
                    <div>
                        <Typography color='secondary' className='bolder'>
                            {product.price} ₽
                        </Typography>
                        <IconButton size='large' aria-label="login" onClick={addToCartHandler}>
                            <AddShoppingCartIcon sx={{ color: 'blue' }} />
                        </IconButton>
                    </div>
                </section>
            </Card>
        </Grid>

    );
}


export default Product;