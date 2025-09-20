import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthData, isLoggedIn, removeAuthCookie } from '@/utils/apiHandlers';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

// Async function to fetch user details
export const getUser = createAsyncThunk(
  '/users/me',
  async (_, { rejectWithValue }) => {
    const islogin = isLoggedIn();
    if (!islogin) {
      return rejectWithValue('User not logged in');
    }
    try {
      const response = await getAuthData('/users/me');
      if (response?.status === 200) {
        return response.data;
      } else if (
        (response?.status === 403 || response?.status === 401) &&
        response?.statusText === 'Unauthorized'
      ) {
        Cookies.remove('__users__isLoggedIn');
        Cookies.remove('__user_type');
        Cookies.remove('test__users__isLoggedIn');
        Cookies.remove('development__users__isLoggedIn');
        Cookies.remove('test__users__isLoggedIn');
        toast.error(response?.data?.message);
        removeAuthCookie();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        window.location.href = '/login';
        return rejectWithValue('User not authorized');
      }
      return rejectWithValue('User not authorized');
    } catch (e) {
      console.error(e);
      return rejectWithValue(e.message || 'Error fetching user data');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    cleanup: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        if (isLoggedIn()) {
          state.status = 'loading';
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        if (isLoggedIn()) {
          state.status = 'failed';
          state.error = action.payload;
        }
      });
  },
});

export const { setUser, cleanup } = userSlice.actions;
export default userSlice.reducer;
