import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { getCarsApi, getPopularMakesApi } from '../services';
import Page, { getServerSideProps } from '.';
import { carList, popularCarMakes } from '../fixtures';
import { GetServerSidePropsContext } from 'next';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../services.ts', () => ({
    getCarsApi: jest.fn(),
    getPopularMakesApi: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

const getPopularMakesApiMock = getPopularMakesApi as jest.Mock;
const getCarsApiMock = getCarsApi as jest.Mock;

test('renders popular car makes and cars data correctly', async () => {
    getPopularMakesApiMock.mockResolvedValueOnce(popularCarMakes);
    getCarsApiMock.mockResolvedValueOnce(carList);

    render(<Page popularCarMakes={popularCarMakes} carsData={carList as any} />);

    expect(screen.getByText('Land Rover')).toBeInTheDocument();
    expect(screen.getByText('2010 Toyota Venza')).toBeInTheDocument();
});

test('handles pagination correctly', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockImplementationOnce(() => ({
        push: pushMock,
        query: {},
        pathname: '/',
    }));

    render(<Page popularCarMakes={popularCarMakes} carsData={carList as any} />);

    fireEvent.click(screen.getByLabelText('Go to page 2'));

    expect(pushMock).toHaveBeenCalledWith({
        pathname: '/',
        query: { page: 2 },
    });
});

test('handles error correctly', async () => {
    render(<Page popularCarMakes={null} carsData={null} />);

    expect(
        screen.getByText('Something went wrong fetching popular car makes or cars')
    ).toBeInTheDocument();
});

describe('getServerSideProps', () => {
    const mockContext: GetServerSidePropsContext = {
        req: {} as any,
        res: {} as any,
        resolvedUrl: '',
        query: { page: '1' },
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetches popular car makes and cars data successfully', async () => {
        getPopularMakesApiMock.mockResolvedValueOnce(popularCarMakes);
        getCarsApiMock.mockResolvedValueOnce(carList);

        const response = await getServerSideProps(mockContext);

        expect(response).toEqual({
            props: { popularCarMakes: popularCarMakes, carsData: carList },
        });
    });
});
