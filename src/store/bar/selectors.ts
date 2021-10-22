import { RootState } from "..";

export const barStore = (store: RootState) => store.bar;

export const getName = (store: RootState) => barStore(store).name;

