import axios, { AxiosResponse } from 'axios';
import { ITodo } from '../models/posts';

axios.defaults.baseURL = process.env.API_URL;

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, error => {
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string): Promise<any> =>
    axios
      .get(url)
      .then(responseBody),
  post: (url: string, body: Record<string, unknown>): Promise<any> =>
    axios
      .post(url, body)
      .then(responseBody),
  put: (url: string, body: Record<string, unknown>): Promise<any> =>
    axios
      .put(url, body)
      .then(responseBody),
  del: (url: string): Promise<any> =>
    axios
      .delete(url)
      .then(responseBody),
};

const Todos = {
  allPosts: (): Promise<ITodo[]> => requests.get('/posts'),
  postById: (n: number): Promise<ITodo> => requests.get(`/posts/${n}`)
};

export default {
  Todos,
};
