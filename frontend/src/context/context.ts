import { createContext } from "react";
import UserStore from "./userStore.ts";
import StateApp from "./stateApp.ts";

const userStore: UserStore = new UserStore();
const stateApp: StateApp = new StateApp();
const Context = createContext({ userStore, stateApp });

export { Context, userStore, stateApp };
