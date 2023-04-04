import { firebaseConfig } from "./firebase";

export const environment = {
  production: true,
  // Firebase Configuration
  ...firebaseConfig,
  NUMBER_OF_ALL_DESKS: 100 
};
