import { createContext, useContext } from "react";

import { ApiStore } from "./apiStore";
import { FilterStore } from "./filterStore";

export class RootStore {
  apiStore: ApiStore;
  filterStore: FilterStore;
  constructor() {
    this.apiStore = new ApiStore(this);
    this.filterStore = new FilterStore(this);
  }
}

export default RootStore;
export const createStore = () => {
  const rootStore = new RootStore();
  return rootStore;
};
export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;

export const useStore = (): RootStore => {
  return useContext(RootStoreContext);
};
