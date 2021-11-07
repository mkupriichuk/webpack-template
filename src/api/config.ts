import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

axios.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(undefined, (error) => {
	throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
	get: (url: string, options?: AxiosRequestConfig): Promise<any> => axios.get(url, options).then(responseBody),
	post: (url: string, body: Record<string, unknown>, options?: AxiosRequestConfig): Promise<any> =>
		axios.post(url, body, options).then(responseBody),
	put: (url: string, body: Record<string, unknown>, options?: AxiosRequestConfig): Promise<any> =>
		axios.put(url, body, options).then(responseBody),
	del: (url: string, options?: AxiosRequestConfig): Promise<any> => axios.delete(url, options).then(responseBody),
};
