import { Box, IconButton } from '@material-ui/core';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import React from 'react';

const LoginButton: React.FC = () => {
    return (
        <Link href='/login' passHref>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <IconButton aria-label="login">
                    <LoginIcon sx={{ color: 'white' }} />
                </IconButton>
            </Box>

        </Link>
    );
}

export default LoginButton;