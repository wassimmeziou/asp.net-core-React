import { store } from "./store";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User } from "../models/User";
import { UserFormValues } from "../models/User";
import { history } from "../..";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.Login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      console.log(user);
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
  };
  
  getUser = async () => {
    try {
      const user = await agent.Account.Current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.Register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };
}
