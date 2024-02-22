import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PhotoData } from './interfaces';

interface PhotosState {
  photos: PhotoData[];
  loading: boolean;
}

const initialState: PhotosState = {
  photos: [],
  loading: true,
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<PhotoData[]>) => {
      state.photos = action.payload;
      state.loading = false;
    },
  },
});

export const { setPhotos } = photosSlice.actions;
export default photosSlice.reducer;
