import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import locationCountriesReducer from './locationCountriesSlice';
import photoSliceReducer from './photoSlice'
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    locationCountries: locationCountriesReducer,
    photos: photoSliceReducer,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
