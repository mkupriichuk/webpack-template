import { AxiosRequestConfig } from "axios";
import { IUser } from "../models/users";
import { requests } from "./config";

const Users = {
  getUserById: (n: number, options?: AxiosRequestConfig): Promise<IUser> => requests.get(`/users/${n}`, options)
};

export default Users;
