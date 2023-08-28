import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredLooms: [],
};

const loomFilterSlice = createSlice({
  name: "filterLoom",
  initialState,
  reducers: {
    FILTER_LOOMS(state, action) {
      const { allLooms, search } = action.payload;
      const tempLooms = allLooms.filter((loom) =>
        loom.Reg_id.toUpperCase().includes(search.toUpperCase())
      );
      state.filteredLooms = tempLooms;
      // console.log(tempLooms);
    },
  },
});

export const { FILTER_LOOMS } = loomFilterSlice.actions;
export const selectLooms = (state) => state.filterLoom.filteredLooms;

export default loomFilterSlice.reducer;
