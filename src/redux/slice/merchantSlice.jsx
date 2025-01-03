import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetMerchant } from "../../server/GetMerchant";
import { v4 as uuidv4 } from "uuid"

export const getUserLocalStorage = () => {
  let user = localStorage.getItem('relisoft_users')
  if (user) {
      return user
  }else{
    return localStorage.setItem("relisoft_users",uuidv4())
  }
}

export const fetchMerchant = createAsyncThunk("fetchMerchant", async ({key, crnid}, thunkAPI) => {
  getUserLocalStorage()
  // console.log('test :::', error);
  const data = await GetMerchant(key, crnid)

  if (data.status !== "success") {
    return thunkAPI.rejectWithValue(data)
  }

  return data
});

const merchantSlice = createSlice({
  name: "merchant",
  initialState: {
    user : getUserLocalStorage(),
    promotionData: [],
    urlApi: null,
    isLoading: false,
    error: false,
    loi: null
  },
  extraReducers: (builder) =>{
    builder.addCase(fetchMerchant.pending, (state, action)=>{
      state.isLoading = true
      state.error = false
    })
    builder.addCase(fetchMerchant.fulfilled, (state, action)=>{
      state.isLoading = false
      state.promotionData = action.payload?.metadata
      state.urlApi= action.payload?.metadata?.MerchantInfor?.MrtUrlApi
    })
    builder.addCase(fetchMerchant.rejected, (state, action)=>{
      state.isLoading = false
      state.error = true
      state.loi = action.payload
    })
  }
});



export default merchantSlice.reducer;
