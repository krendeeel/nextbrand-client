import { AppBar, Container, CssBaseline, Link, Toolbar, Typography } from '@material-ui/core';
import NextLink from 'next/link';
import Head from 'next/head';
import React, { ReactChild, ReactFragment, ReactPortal } from 'react';
import CartButton from '../components/CartButton';
import AccountButton from '../components/AccountButton';
import LoginButton from '../components/LoginButton';
import Footer from '../components/Footer';
import { useTypedSelector } from '../utils/hooks/useTypedSelector';


interface LayoutProps {
    title?: string,
    description?: string,
    children: boolean | ReactChild | ReactFragment | ReactPortal,
    keywords?: string
}

const Layout: React.FC<LayoutProps> = ({ title, description, keywords, children }) => {
    const { user } = useTypedSelector(state => state.auth)
    const { items } = useTypedSelector(state => state.cart)

    return (
        <div className='wrapper'>
            <Head>
                <title>{title ? `${title} - Next Brand` : 'Next Brand'}</title>
                {description && <meta name='description' content={description}></meta>}
                <link rel="shortcut icon" href="/images/logo.png" />
                <meta name="description" content={`Обувь на любой вкус`} />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content={keywords || "Обувь, кроссовки, туфли"} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <CssBaseline />
            <AppBar position='static'>
                <Container >
                    <Toolbar>
                        <NextLink href='/' passHref>
                            <Link underline="none">
                                <Typography className='brand'>NextBrand</Typography>
                            </Link>
                        </NextLink>
                        <div className='grow'></div>
                        <div style={{ display: 'flex' }}>
                            <CartButton badge={items.length} />
                            {user ? (
                                <>
                                    <AccountButton user={user.name[0]} admin={user.isAdmin} />
                                </>
                            )
                                : (
                                    <LoginButton />
                                )}
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container className='main'>
                {children}
            </Container>
            <Footer />
        </div >
    )
}

export default Layout;
