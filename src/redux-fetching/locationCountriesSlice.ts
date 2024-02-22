import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataItem } from './interfaces';

interface LocationCountriesState {
  locationCountries: DataItem[]; 
  loading: boolean;
}

const initialState: LocationCountriesState = {
  locationCountries: [],
  loading: true,
};

const locationCountriesSlice = createSlice({
  name: 'locationCountries',
  initialState,
  reducers: {
    setLocationCountries: (state, action: PayloadAction<DataItem[]>) => {
      state.locationCountries = action.payload;
      state.loading = false;
    },
  },
});

export const { setLocationCountries } = locationCountriesSlice.actions;
export default locationCountriesSlice.reducer;