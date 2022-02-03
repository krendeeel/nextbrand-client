import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { SnackbarProvider } from 'notistack';
import '../styles/globals.css';
import { NextThunkDispatch, wrapper } from '../store/index'
import { getUser, setUser } from '../store/action-creators/auth';
import AuthDataService from '../api/auth'
import axios from '../api/axios';
import cookies from 'next-cookies'



function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, []);
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Component {...pageProps} />
    </SnackbarProvider>
  )
}


// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ctx => {
//   const dispatch = store.dispatch as NextThunkDispatch
//   await dispatch(setUser({
//     _id: '1',
//     name: 'vase',
//     email: 'asdfghj',
//     isAdmin: false
//   }))
//   return {
//     props: {}
//   }
// });

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ ctx, Component }) => {
  const dispatch = store.dispatch as NextThunkDispatch
  const { token } = cookies(ctx);
  try {
    const response = await axios.get('https://shielded-mountain-38473.herokuapp.com/auth/user', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    await dispatch(await setUser(response.data))
  } catch (error) {
    await dispatch(await setUser(null))
  }

  return {
    pageProps: {
      ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
      pathname: ctx.pathname,
    }
  }

});

export default wrapper.withRedux(MyApp);

