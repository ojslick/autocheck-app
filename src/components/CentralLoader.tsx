import { useLoader } from '@/loaderContext';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export function CentralLoader() {
    const { isLoading } = useLoader();

    if (!isLoading) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                backgroundColor: 'common.white',
            }}
        >
            <CircularProgress />
        </Box>
    );
}
