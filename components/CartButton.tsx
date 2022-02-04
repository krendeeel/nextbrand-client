import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { Badge, IconButton } from '@material-ui/core';

interface CartButtonProps {
    badge?: number
}

const CartButton: React.FC<CartButtonProps> = ({ badge }) => {
    return (
        <Link href='/cart' passHref >
            <IconButton aria-label="cart">
                <Badge badgeContent={badge ? badge : null} color='error'>
                    <ShoppingCartIcon sx={{ color: 'white' }} />
                </Badge>
            </IconButton>
        </Link>
    );
}

export default CartButton;