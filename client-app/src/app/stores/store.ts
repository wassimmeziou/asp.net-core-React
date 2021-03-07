import { createContext } from "react";
import ActivityStore from "./ActivityStore";

// interface Store {
//   activityStore: ActivityStore;
// }

export const store /* : Store */ = {
  activityStore: new ActivityStore(),
};

export const storeContext = createContext(store);
