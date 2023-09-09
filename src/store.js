const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case "account/deposit":
			return {
				...state,
				balance: state.balance + action.payload,
			};

		case "account/repayLoan":
			return {
				...state,
				loan: 0,
				loanPurpose: "",
				balance: state.balance - state.loan,
			};

		case "account/requestLoan":
			if (state.loan > 0) return state;
			return { ...state, loan: action.payload };

		case "account/withdraw":
			return {
				...state,
				balance: state.balance - action.payload,
			};

		default:
			return state;
	}
}
