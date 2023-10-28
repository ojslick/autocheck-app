import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ChangeEvent, useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import Pagination from '@mui/material/Pagination';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getCarsApi, getPopularMakesApi } from '../services';
import { Avatar, Chip } from '@mui/material';
import { CarCard } from '../components/CarCard';
import { Car, CarMake } from '../types';
import { useLoader } from '../loaderContext';
import { Typography } from '../components/Typography';

interface PageProps {
    popularCarMakes?: {
        makeList: CarMake[];
        pagination: { total: number; currentPage: number };
    } | null;
    carsData?: { result: Car[]; pagination: { total: number; currentPage: number } } | null;
}

export default function Page({ popularCarMakes, carsData }: PageProps) {
    const router = useRouter();
    const [page, setPage] = useState(carsData?.pagination.currentPage || 1);
    const { setIsLoading } = useLoader();

    const handlePageChange = (e: ChangeEvent<unknown>, pageParam: number) => {
        setPage(pageParam);
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: pageParam },
        });
    };

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    return (
        <>
            {(isEmpty(popularCarMakes?.makeList) || isEmpty(carsData?.result)) && (
                <Container
                    sx={{ mt: 13, py: 8, display: 'flex', justifyContent: 'center' }}
                    maxWidth="xl"
                >
                    <Typography customVariant="smallHeadline">
                        Something went wrong fetching popular car makes or cars
                    </Typography>
                </Container>
            )}
            {!isEmpty(popularCarMakes?.makeList) && !isEmpty(carsData?.result) && (
                <Container
                    sx={{
                        py: 8,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        mt: 12,
                    }}
                    maxWidth="xl"
                >
                    <Box sx={{ display: 'flex' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: 1,
                            }}
                        >
                            {popularCarMakes?.makeList.map((make: CarMake) => (
                                <Chip
                                    key={make.id}
                                    avatar={<Avatar alt="popular-car-make" src={make.imageUrl} />}
                                    label={make.name}
                                    sx={{ mr: 1 }}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Grid
                        container
                        spacing={4}
                        sx={{ flexWrap: 'wrap', justifyContent: 'center', mt: 3 }}
                    >
                        {carsData?.result.map((car: Car) => (
                            <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
                                <CarCard car={car} />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        sx={{ mt: 4 }}
                        count={carsData?.pagination.total}
                        page={page}
                        onChange={handlePageChange}
                    />
                </Container>
            )}
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const page = context.query?.page || 1;

    try {
        const popularCarMakes = await getPopularMakesApi({ popular: true });

        const carsData = await getCarsApi({
            country: 'ng',
            page_number: page,
        });

        return {
            props: { popularCarMakes, carsData },
        };
    } catch (error) {
        return { props: { popularCarMakes: null, carsData: null } };
    }
}
