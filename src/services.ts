const BASE_URL = 'https://api.staging.myautochek.com';

interface Params {
    [key: string]: any;
}

const getFetch = async (url: string) => {
    const response: any = await fetch(url);
    if (!response.ok) {
        throw new Error(response?.message || response.statusText);
    }
    return response.json();
};

const buildGetRequest = (url: string, params: Params) => {
    return url + '?' + new URLSearchParams(params).toString();
};

/**
 * /v1/inventory/make?popular=true
 * Gets popular car makes
 */

export const getPopularMakesApi = async (params: Params) => {
    const url = buildGetRequest(`${BASE_URL}/v1/inventory/make`, params);
    return await getFetch(url);
};

/**
 * /v1/inventory/car/search
 * Gets a paginated list of cars
 */

export const getCarsApi = async (params: Params) => {
    const url = buildGetRequest(`${BASE_URL}/v1/inventory/car/search`, params);
    return await getFetch(url);
};

/**
 * /v1/inventory/car/{id}
 * Gets a single car
 */

export const getCarApi = async (id: string) => {
    const url = `${BASE_URL}/v1/inventory/car/${id}`;
    return await getFetch(url);
};

/**
 * /v1/inventory/car_media
 * Gets a list of media for a car
 */

export const getCarMediaApi = async (params: Params) => {
    const url = buildGetRequest(`${BASE_URL}/v1/inventory/car_media`, params);
    return await getFetch(url);
};
