import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	createAt: "",
	fullName: "",
	nationalID: "",
};

const customerSlice = createSlice({
	initialState,
	name: "customer",
	reducers: {
		createCustomer: {
			prepare(fullName, nationalID) {
				return {
					payload: {
						createdAt: new Date().toISOString(),
						fullName,
						nationalID,
					},
				};
			},

			reducer(state, action) {
				state.createdAt = action.payload.createdAt;
				state.fullName = action.payload.fullName;
				state.nationalID = action.payload.nationalID;
			},
		},

		updateName(state, action) {
			state.fullName = action.payload;
		},
	},
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
