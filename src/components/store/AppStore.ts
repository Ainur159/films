import { injectable, inject } from "inversify";

export interface AppStoreInterface {
    pageName: string;
}

@injectable()
export class AppStore implements AppStoreInterface {
  pageName: string = "Главная";
}

export const APP_STORE_IDENITIFER = "APP_STORE_IDENITIFER";
