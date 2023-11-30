import { createContext } from 'react';
import UserStore from './userStore.ts';

const userStore = new UserStore();
const ContextUser = createContext({ userStore });

export { ContextUser, userStore };
