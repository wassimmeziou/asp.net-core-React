import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import commonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

// interface Store {
//   activityStore: ActivityStore;
// }

export const store /* : Store */ = {
  activityStore: new ActivityStore(),
  commonStore: new commonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
