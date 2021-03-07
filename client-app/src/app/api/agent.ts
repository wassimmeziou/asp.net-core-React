import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    return await Promise.reject(error);
  }
});

const response = <T>(resp: AxiosResponse<T>) => resp.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(response),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(response),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(response),
  delete: <T>(url: string) => axios.delete<T>(url).then(response),
};

const Activities = {
  List: () => request.get<Activity[]>("/activities"),
  Details: (id: string) => request.get<Activity>(`/activities/${id}`),
  Create: (act: Activity) => request.post<void>("/activities", act),
  Update: (act: Activity) => request.put<void>(`/activities/${act.id}`, act),
  Delete: (id: string) => request.delete<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
