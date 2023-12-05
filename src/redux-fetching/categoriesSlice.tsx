import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryData } from './interfaces';

interface CategoriesState {
  categories: CategoryData[];
  loading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  loading: true,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryData[]>) => {
      state.categories = action.payload;
      state.loading = false;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
