import '../styles/vendors/normalize.css'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Layout from '../components/Layout'

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
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    )
}

export default MyApp
