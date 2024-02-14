import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState{
    isAdmin: boolean;
    isSignedIn: boolean;
}

const initialState: UserState = {
    isAdmin: false,
    isSignedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return {...state, ...action.payload};
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
