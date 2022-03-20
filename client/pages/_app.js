import '../styles/globals.css'
//import { GlobalStyles } from 'twin.macro';
import { Provider } from 'next-auth/client';
import NextProgress from "next-progress";
import NProgress from 'nprogress';
import Router from 'next/router';
import NextNProgress from "nextjs-progressbar"; 
import { ChakraProvider } from '@chakra-ui/react'



Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  return( 
    <Provider session={pageProps.session}>
    
   <NextNProgress height={6} color="#3437eb" />
    <Component {...pageProps} />
   
    </Provider> 
  )
}

export default MyApp
