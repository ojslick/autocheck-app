import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { Car } from '../types';
import { Typography } from '../components/Typography';
import { TruncatedText } from '../components/TruncatedText';
import { ChangeEvent } from 'react';
import Image from 'next/image';
import { useLoader } from '../loaderContext';

export function CarCard({ car }: { car: Car }) {
    const router = useRouter();
    const { setIsLoading } = useLoader();
    const nairaSign = '\u20A6';

    const handleCarClick = (e: ChangeEvent<unknown>) => {
        setIsLoading(true);

        router.push(`/car/${car.id}`);
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
            }}
            onClick={handleCarClick}
            data-testid="card-card"
        >
            <Image
                placeholder="blur"
                blurDataURL="/image-loading-placeholder.webp"
                src={car.imageUrl}
                alt="car-image"
                width={300}
                height={250}
                style={{ width: '100%' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <TruncatedText text={`${car.year} ${car.title}`} variant="headline" />

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TruncatedText variant="bodyBase" text={`${car.city} ${car.state}`} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography customVariant="bodyBaseBold" sx={{ mt: 1 }}>
                        {nairaSign}
                        {car.installment.toLocaleString()}
                    </Typography>
                    <Typography customVariant="bodyBaseBold" sx={{ mt: 1 }}>
                        {nairaSign}
                        {car.installment.toLocaleString()} / Mo
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
