import { createContext } from 'react';
import UserStore from './userStore.ts';
import StateApp from './stateApp.ts';

const userStore = new UserStore();
const stateApp = new StateApp();
const Context = createContext({ userStore, stateApp });

export { Context, userStore, stateApp };
