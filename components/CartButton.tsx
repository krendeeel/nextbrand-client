import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px'
    },
}));

interface CartButtonProps {
    badge?: number
}

const CartButton: React.FC<CartButtonProps> = ({ badge }) => {
    return (
        <Link href='/cart' passHref>
            <IconButton size='large' aria-label="cart">
                <Badge badgeContent={badge ? badge : null} color='error'>
                    <ShoppingCartIcon sx={{ color: 'white' }} />
                </Badge>
            </IconButton>
        </Link>
    );
}

export default CartButton;