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
		convertingCurrency(state) {
			state.isLoading = true;
		},

		deposit(state, action) {
			state.balance += action.payload;
			state.isLoading = false;
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

export const { payLoan, requestLoan, withdraw } = accountSlice.actions;

export function deposit(amount, currency) {
	if (currency === "USD") return { type: "account/deposit", payload: amount };

	return async function (dispatch, getState) {
		dispatch({ type: "account/convertingCurrency" });

		const res = await fetch(
			`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
		);
		const data = await res.json();
		const converted = data.rates.USD;

		dispatch({ type: "account/deposit", payload: converted });
	};
}

export default accountSlice.reducer;
