import { makeAutoObservable, observable } from "mobx";

export default class ActivityStore {
  title = "Hello from MobX ";

  constructor() {
    makeAutoObservable(this, { title: observable });
    }
    
}
