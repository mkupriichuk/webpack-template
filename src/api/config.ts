import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

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
export class Requests {
	private instance: AxiosInstance;
	constructor(instance: AxiosInstance) {
		this.instance = instance;
	}
	get(url: string, options?: AxiosRequestConfig): Promise<any> {
		return this.instance.get(url, options).then(this.responseBody);
	}
	post(
		url: string,
		body: Record<string, unknown>,
		options?: AxiosRequestConfig
	): Promise<any> {
		return this.instance.post(url, body, options).then(this.responseBody);
	}
	patch(
		url: string,
		body: Record<string, unknown>,
		options?: AxiosRequestConfig
	): Promise<any> {
		return this.instance.patch(url, body, options).then(this.responseBody);
	}
	put(
		url: string,
		body: Record<string, unknown>,
		options?: AxiosRequestConfig
	): Promise<any> {
		return this.instance.put(url, body, options).then(this.responseBody);
	}
	del(url: string, options?: AxiosRequestConfig): Promise<any> {
		return this.instance.delete(url, options).then(this.responseBody);
	}
	private responseBody(response: AxiosResponse) {
		return response.data;
	}
}

// // axios.defaults.baseURL = process.env.API_URL;
// authInstance.interceptors.request.use(
// 	(config) => {
// 		const token = window.localStorage.getItem("token");
// 		if (token) config.headers!.Authorization = `Bearer ${token}`;
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

// authInstance.interceptors.response.use(
// 	(config) => {
// 		return config;
// 	},
// 	async (error) => {
// 		const originalRequest = error.config;
// 		if (
// 			error.response?.status == 401 && !originalRequest._retry
// 		) {
// 			originalRequest._retry = true;
// 			try {
// 				const response = await axios.get<IUser>(`${process.env.AUTH_API_URL}/refresh`, {
// 					withCredentials: true,
// 				});
// 				localStorage.setItem("token", response.data.token);
// 				return authInstance.request(originalRequest);
// 			} catch (_error) {
// 				if (_error.response && _error.response.data) {
// 					return Promise.reject(_error.response.data);
// 				}

// 				return Promise.reject(_error);
// 			}
// 		}
// 		throw error;
// 	}
// );
