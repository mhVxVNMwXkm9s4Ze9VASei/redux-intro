import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	balance: 0,
	isLoading: false,
	loan: 0,
	loanPurpose: "",
};

const accountSlice = createSlice({
	initialState,
	name: "account",
	reducers: {
		deposit(state, action) {
			state.balance += action.payload;
		},

		payLoan(state, action) {
			state.balance -= state.loan;
			state.loan = 0;
			state.loanPurpose = "";
		},

		requestLoan: {
			prepare(amount, purpose) {
				return {
					payload: { amount, purpose },
				};
			},

			reducer(state, action) {
				if (state.loan > 0) return;

				state.loan = action.payload.amount;
				state.loanPurpose = action.payload.purpose;
				state.balance += action.payload.amount;
			},
		},

		withdraw(state, action) {
			state.balance -= action.payload;
		},
	},
});

export const { deposit, payLoan, requestLoan, withdraw } = accountSlice.actions;

export default accountSlice.reducer;
