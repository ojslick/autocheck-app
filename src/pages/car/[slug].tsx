import Container from '@mui/material/Container';
import Image from 'next/image';
import { GetStaticPropsContext } from 'next';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getCarApi, getCarMediaApi } from '../../services';
import { CarDetail } from '../../types';
import { useLoader } from '../../loaderContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { Typography } from '../../components/Typography';

interface PageProps {
    carDetail?: CarDetail;
    carMedia?: { carMediaList: { id: string; url: string }[] };
}

export default function Page({ carDetail, carMedia }: PageProps) {
    const { setIsLoading } = useLoader();
    const nairaSign = '\u20A6';
    const router = useRouter();

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    return (
        <Container maxWidth="lg" sx={{ mt: 10 }}>
            {isEmpty(carDetail) && (
                <Container
                    sx={{ mt: 13, py: 8, display: 'flex', justifyContent: 'center' }}
                    maxWidth="xl"
                >
                    <Typography customVariant="smallHeadline">
                        Something went wrong this car
                    </Typography>
                </Container>
            )}
            {carDetail && (
                <>
                    <Carousel
                        infiniteLoop
                        useKeyboardArrows
                        autoPlay
                        interval={5000}
                        transitionTime={500}
                        showThumbs={false}
                    >
                        {carMedia?.carMediaList.map((image, idx) => (
                            <div key={idx}>
                                <Image
                                    placeholder="blur"
                                    blurDataURL="/image-loading-placeholder.webp"
                                    src={image.url}
                                    alt={`carousel-img-${idx}`}
                                    width={500}
                                    height={700}
                                />
                            </div>
                        ))}
                    </Carousel>
                    <h1>{carDetail?.carName}</h1>
                    <h2>Key Details</h2>
                    <ul>
                        <li>
                            <strong>Body Type:</strong> {carDetail?.bodyType.name}{' '}
                            <Image
                                src={carDetail?.bodyType.imageUrl as string}
                                alt={carDetail?.bodyType.name as string}
                                width={50}
                                height={15}
                            />
                        </li>
                        <li>
                            <strong>Engine Type:</strong> {carDetail?.engineType}
                        </li>
                        <li>
                            <strong>Transmission:</strong> {carDetail?.transmission}
                        </li>
                        <li>
                            <strong>Fuel Type:</strong> {carDetail?.fuelType}
                        </li>
                        <li>
                            <strong>Exterior Color:</strong> {carDetail?.exteriorColor}
                        </li>
                        <li>
                            <strong>Interior Color:</strong> {carDetail?.interiorColor}
                        </li>
                        <li>
                            <strong>Mileage:</strong> {carDetail?.mileage} {carDetail?.mileageUnit}
                        </li>
                        <li>
                            <strong>Condition:</strong> {carDetail?.sellingCondition}
                        </li>
                        <li>
                            <strong>Grade Score:</strong> {carDetail?.gradeScore}
                        </li>
                        <li>
                            <strong>Price:</strong> {nairaSign}
                            {carDetail?.marketplacePrice.toLocaleString()}
                        </li>{' '}
                        <li>
                            <strong>Installment Price:</strong> {nairaSign}
                            {carDetail?.installment.toLocaleString()} / Month
                        </li>
                        {/* Modify currency based on your requirements */}
                        <li>
                            <strong>Location:</strong> {carDetail?.city}, {carDetail?.state},{' '}
                            {carDetail?.country}
                        </li>
                        <li>
                            <strong>VIN:</strong> {carDetail?.vin}
                        </li>
                    </ul>

                    <h2>Additional Information</h2>
                    <ul>
                        <li>
                            <strong>Has Financing:</strong> {carDetail?.hasFinancing ? 'Yes' : 'No'}
                        </li>
                        <li>
                            <strong>Insured:</strong> {carDetail?.insured ? 'Yes' : 'No'}
                        </li>
                        <li>
                            <strong>Owner Type:</strong> {carDetail?.ownerType}
                        </li>
                        <li>
                            <strong>Website:</strong>{' '}
                            <a
                                href={carDetail?.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View on Marketplace
                            </a>
                        </li>
                    </ul>
                </>
            )}
        </Container>
    );
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const { slug } = context.params as { slug: string };

    try {
        const carDetail = await getCarApi(slug);
        const carMedia = await getCarMediaApi({ carId: slug });

        return {
            props: {
                carDetail,
                carMedia,
            },
        };
    } catch (error) {
        return {
            props: {
                carDetail: null,
            },
        };
    }
};
