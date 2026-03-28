import { AppConfig } from '../types/config';

export const appConfig: AppConfig = {
  appName: "Marketplace Template",

  entity: {
    name: "Car",
    route: "cars",
  },

  fields: [
    { name: "brand", label: "Brand", type: "text" },
    { name: "price", label: "Price", type: "number" },
    { name: "fuel", label: "Fuel Type", type: "text" },
  ],

  features: {
    auth: true,
    admin: true,
  },
};