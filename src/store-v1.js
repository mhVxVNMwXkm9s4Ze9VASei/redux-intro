import { combineReducers, createStore } from "redux";

const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

const initialStateCustomer = {
	createAt: "",
	fullName: "",
	nationalID: "",
};

function accountReducer(state = initialStateAccount, action) {
	switch (action.type) {
		case "account/deposit":
			return {
				...state,
				balance: state.balance + action.payload,
			};

		case "account/payLoan":
			return {
				...state,
				loan: 0,
				loanPurpose: "",
				balance: state.balance - state.loan,
			};

		case "account/requestLoan":
			if (state.loan > 0) return state;
			return {
				...state,
				balance: state.balance + action.payload.amount,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
			};

		case "account/withdraw":
			return {
				...state,
				balance: state.balance - action.payload,
			};

		default:
			return state;
	}
}

function customerReducer(state = initialStateCustomer, action) {
	switch (action.type) {
		case "customer/createCustomer":
			return {
				...state,
				createdAt: action.payload.createdAt,
				fullName: action.payload.fullName,
				nationalID: action.payload.nationalID,
			};

		case "customer/updateName":
			return {
				...state,
				fullName: action.payload,
			};

		default:
			return state;
	}
}

const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

const store = createStore(rootReducer);

// Bank action creators

function deposit(amount) {
	return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
	return { type: "account/withdraw", payload: amount };
}

function payLoan() {
	return { type: "account/payLoan" };
}

function requestLoan(amount, purpose) {
	return { type: "account/requestLoan", payloan: { amount, purpose } };
}

// Customer action creators
function createCustomer(fullName, nationalID) {
	return {
		type: "customer/createCustomer",
		payload: {
			createdAt: new Date().toISOString,
			fullName,
			nationalID,
		},
	};
}

function updateName(fullName) {
	return { type: "customer/updateName", payload: fullName };
}
