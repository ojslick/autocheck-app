module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testPathIgnorePatterns: ['./.next/', './node_modules/'],
    transform: {
        '^.+\\.(ts|tsx)$': './node_modules/babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!<rootDir>/.next/',
        '!<rootDir>/node_modules/',
        '!<rootDir>/public/',
        '!<rootDir>/src/types.ts',
        '!<rootDir>/src/theme.js',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};
