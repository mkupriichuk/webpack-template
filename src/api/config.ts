import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.API_URL || 'https://jsonplaceholder.typicode.com/posts';

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
	get: (url: string): Promise<any> => axios.get(url).then(responseBody),
	post: (url: string, body: Record<string, unknown>): Promise<any> =>
		axios.post(url, body).then(responseBody),
	put: (url: string, body: Record<string, unknown>): Promise<any> =>
		axios.put(url, body).then(responseBody),
	del: (url: string): Promise<any> => axios.delete(url).then(responseBody),
};
