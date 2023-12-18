import { createSlice } from "@reduxjs/toolkit";
import prodcts from "../data/products.json";

const productsStat = prodcts.map((product) => ({
  ...product,
  status: null,
}));
const initialState = {
  products: productsStat,
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    approveStatus: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        if(state.products[action.payload.id-1].Quantity===0) return
        if (action.payload.status === "approve") {
          state.products[index].status = "Approved";
        }
        if (action.payload.status ==="missing") {
          state.products[index].status = "Missing";
        }
        if (action.payload.status==="missing urgent") {
          state.products[index].status = "Urgent Missing";
        }
      }
    },
    editProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...action.payload.updates
        };
      }
    },
    editQandP:(state,action)=>{
      console.log(action.payload)
        const index= state.products.findIndex(product=>product.id === action.payload.id)
        if(index !== -1){
          state.products[index] = {
            ...state.products[index],
            ...action.payload.updates
          };
      }
    },
  },
});
export const { approveStatus,editProduct,editQandP} =
  productSlice.actions;
export default productSlice.reducer;
