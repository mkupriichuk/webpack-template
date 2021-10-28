import { IUser } from "../models/users";
import { requests } from "./config";

const Users = {
  getUserById: (n: number): Promise<IUser> => requests.get(`/users/${n}`)
};

export default Users;
