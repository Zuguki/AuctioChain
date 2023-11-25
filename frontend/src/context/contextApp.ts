import { createContext } from 'react';
import UserStore from '../authorizationLogic/userStore.ts';

const userStore = new UserStore();
const Context = createContext({ userStore });

export { Context, userStore };
