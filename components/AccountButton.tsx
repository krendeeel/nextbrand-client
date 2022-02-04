import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import { MenuItem, IconButton, Box } from '@material-ui/core';
import ListItemIcon from '@mui/material/ListItemIcon';
import { amber } from '@mui/material/colors';
import { Logout, Settings } from '@mui/icons-material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useRouter } from 'next/router';
import { useActions } from '../utils/hooks/useActions';
import { destroyCookie } from 'nookies';

interface AccountButtonProps {
    user: string
}
const AccountButton: React.FC<AccountButtonProps> = ({ user }) => {
    const { setUser } = useActions()
    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logioutClickHandler = () => {
        setAnchorEl(null);
        destroyCookie(null, 'token')
        router.push('/');
        setUser(null);

    }

    const toProfile = () => {
        setAnchorEl(null);
        router.push('/profile')
    }

    const toOrders = () => {
        setAnchorEl(null);
        router.push('/order-history');
    }
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <IconButton
                    onClick={handleClick}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 28, height: 28, bgcolor: amber[500], fontSize: 16 }}>{user.toUpperCase()}</Avatar>
                </IconButton>

            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={toOrders}>
                    <ListItemIcon>
                        <BookmarkBorderIcon fontSize="small" />
                    </ListItemIcon>
                    Заказы
                </MenuItem>
                <MenuItem onClick={toProfile}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Настройки
                </MenuItem>
                <MenuItem onClick={logioutClickHandler}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </React.Fragment >
    );
}

export default AccountButton;