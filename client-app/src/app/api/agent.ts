import { User, UserFormValues } from "./../models/User";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity } from "../models/activity";
import { history } from "./../../index";
import { store } from "./../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(config=> {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    // try {
    await sleep(2000);
    return response;
    // } catch (error) {
    //   return await Promise.reject(error);
    // }
  },
  (error: AxiosError) => {
    let err = error.response;
    switch (err?.status) {
      case 400:
        if (typeof err.data === "string") {
          toast.error(err.data);
        }
        if (
          err.config.method === "get" &&
          err.data.errors.hasOwnProperty("id")
        ) {
          history.push("/not-found");
        }
        if (err.data.errors) {
          const modalSateSerrors = [];
          for (const key in err.data.errors) {
            if (err.data.errors[key])
              modalSateSerrors.push(err.data.errors[key]);
          }
          throw modalSateSerrors.flat();
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 404:
        toast.error("not found");
        break;
      case 200:
        toast.done("added");
        break;
      case 500:
        store.commonStore.setServerError(err.data);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

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
const Account = {
  Current: () => request.get<User>("/account"),
  Login: (user: UserFormValues) => request.post<User>(`/account/login/`, user),
  Register: (user: UserFormValues) =>
    request.post<User>("/account/register", user),
};

const agent = {
  Activities,
  Account,
};

export default agent;
