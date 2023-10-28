import type { AppProps } from 'next/app';
import { Navbar } from '@/components/Navbar';
import { theme } from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline } from '@mui/material';
import { LoaderProvider } from '@/loaderContext';
import { CentralLoader } from '@/components/CentralLoader';

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();
    return (
        <LoaderProvider>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <CentralLoader />
                    <CssBaseline />
                    <Navbar />
                    <Component {...pageProps} />
                </QueryClientProvider>
            </ThemeProvider>
        </LoaderProvider>
    );
}
