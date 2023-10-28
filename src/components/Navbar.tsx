import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MusicNoteSharp from '@mui/icons-material/MusicNoteSharp';
import ButtonBase from '@mui/material/ButtonBase';
import CarRental from '@mui/icons-material/CarRental';
import { useRouter } from 'next/router';

import { Typography } from './Typography';
import { useLoader } from '@/loaderContext';

export function Navbar() {
    const router = useRouter();
    const { setIsLoading } = useLoader();

    const handleLogoClick = () => {
        setIsLoading(true);
        router.push('/');
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <ButtonBase disableRipple onClick={handleLogoClick} aria-label="navigate-to-home">
                    <CarRental sx={{ mr: 2 }} />
                    <Typography customVariant="headline" color="inherit" noWrap>
                        Automobile
                    </Typography>
                </ButtonBase>
            </Toolbar>
        </AppBar>
    );
}
