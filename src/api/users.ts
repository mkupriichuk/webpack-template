import { Requests } from "./config";
import axios, { AxiosRequestConfig } from "axios";
import { IUser } from "../models/users";

const usersInstance = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com",
	withCredentials: true,
});

const usersRequests = new Requests(usersInstance);

class Users {
	getUserById(n: number, options?: AxiosRequestConfig): Promise<IUser> {
		return usersRequests.get(`/users/${n}`, options);
	}
}

export default new Users();
