import '../styles/vendors/normalize.css'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Layout from '../components/Layout'
import { CurrentUserContextProvider } from '../components/context/context'

const theme = createTheme({
    palette: {
        primary: {
            main: '#d1515a',
        },
        secondary: {
            main: '#122441',
        }
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <CurrentUserContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </CurrentUserContextProvider>
        </ThemeProvider>
    )
}

export default MyApp
