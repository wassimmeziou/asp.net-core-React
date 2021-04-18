import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import commonStore from "./commonStore";

// interface Store {
//   activityStore: ActivityStore;
// }

export const store /* : Store */ = {
  activityStore: new ActivityStore(),
  commonStore: new commonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
