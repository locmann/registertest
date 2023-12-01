import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type UserData = {
  email: string;
  password: string;
};

export type UpdateUserData = {
  oldPassword: string;
  newPassword: string;
};

const initialState = {
  email: "",
  password: "",
  isAuth: false,
};

export const postData = createAsyncThunk(
  "user/postData",
  async (params: UserData, thunkApi) => {
    const url = `http://localhost:5000/users?email=${params.email}`;
    const data = await axios.get(url);
    if (data.data.length > 0) {
      console.log(data.data, "already existing");
      return thunkApi.rejectWithValue("already existing");
    } else {
      const userData = {
        email: params.email,
        password: params.password,
      };
      const postUrl = "http://localhost:5000/users";
      await axios.post(postUrl, userData);
      return userData;
    }
  }
);

export const putData = createAsyncThunk(
  "user/putData",
  async (params: UpdateUserData, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    const url = `http://localhost:5000/users?email=${state.user.email}`;
    const data = await axios.get(url);
    const id = data.data[0].id;

    if (params.oldPassword === data.data[0].password) {
      const putUrl = `http://localhost:5000/users/${id}`;
      const newData = {
        email: state.user.email,
        password: params.newPassword,
        id: id,
      };
      await axios.put(putUrl, newData);
    } else {
      return thunkApi.rejectWithValue("already existing");
    }
  }
);

export const getData = createAsyncThunk(
  "user/getData",
  async (params: UserData, thunkApi) => {
    const url = `http://localhost:5000/users?email=${params.email}`;
    const data = await axios.get(url);

    if (data.data.length > 0) {
      if (data.data[0].password === params.password) {
        console.log(data.data[0], "success");
        return data.data[0];
      } else {
        console.log(data.data[0], "uncorrect email or password");
        return thunkApi.rejectWithValue("uncorrect email or password");
      }
    } else {
      console.log(data.data[0], "uncorrect email or password");
      return thunkApi.rejectWithValue("uncorrect email or password");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      postData.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.isAuth = true;
        state.email = action.payload.email;
        state.password = action.payload.password;
      }
    );
    builder.addCase(
      getData.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.isAuth = true;
        state.email = action.payload.email;
        state.password = action.payload.password;
      }
    );
    builder.addCase(putData.fulfilled, (state) => {
      state.isAuth = false;
      state.email = "";
      state.password = "";
    });
  },
});

export default userSlice.reducer;
