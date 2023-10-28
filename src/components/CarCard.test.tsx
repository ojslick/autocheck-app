import { render, fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useLoader } from '../loaderContext';
import { CarCard } from './CarCard';
import { carList } from '../fixtures';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../loaderContext', () => ({
    useLoader: jest.fn(),
}));

describe('CarCard component', () => {
    const pushMock = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        });
        (useLoader as jest.Mock).mockReturnValue({
            setIsLoading: jest.fn(),
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        render(<CarCard car={carList.result[0] as any} />);

        expect(screen.getByText('2010 Toyota Venza')).toBeInTheDocument();
    });

    test('navigates to the correct path when clicked', () => {
        render(<CarCard car={carList.result[0] as any} />);

        fireEvent.click(screen.getByTestId('card-card'));

        expect(pushMock).toHaveBeenCalledWith('/car/JP2LgGfOu');
    });
});
