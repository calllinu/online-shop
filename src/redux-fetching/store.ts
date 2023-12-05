import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import locationCountriesReducer from './locationCountriesSlice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    locationCountries: locationCountriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
