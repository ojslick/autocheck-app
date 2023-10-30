import { ReactNode, createContext, useContext, useState } from 'react';

interface PageProps {
    children: ReactNode;
}

interface LoaderContextType {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultLoaderValue: LoaderContextType = {
    isLoading: false,
    setIsLoading: () => {},
};

const LoaderContext = createContext<LoaderContextType>(defaultLoaderValue);

export const useLoader = () => {
    return useContext(LoaderContext);
};

export const LoaderProvider = ({ children }: PageProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};
