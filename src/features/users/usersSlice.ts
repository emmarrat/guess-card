import {User} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

interface UsersState {
  user: User | null;
  error: string | null;
  isSuccess: boolean;
}


const initialState: UsersState = {
  user: null,
  error: null,
  isSuccess: false
}

const correctUser: User = {
  username: 'player',
  password: '12345'
}


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      if (action.payload.username === correctUser.username && action.payload.password === correctUser.password) {
        state.user = action.payload;
        state.error = null;
        state.isSuccess = true;
      } else {
        state.error = 'Username or Password is not correct!';
      }
    },
    unsetUser: (state) => {
      state.user = null;
      state.isSuccess = false;
    },
  }
});

export const usersReducer = usersSlice.reducer;
export const {loginUser, unsetUser} = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectError = (state: RootState) => state.users.error;
export const selectIsSuccess = (state: RootState) => state.users.isSuccess;


