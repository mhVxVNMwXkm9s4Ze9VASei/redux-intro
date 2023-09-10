const initialStateCustomer = {
	createAt: "",
	fullName: "",
	nationalID: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
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

// Customer action creators
export function createCustomer(fullName, nationalID) {
	return {
		type: "customer/createCustomer",
		payload: {
			createdAt: new Date().toISOString,
			fullName,
			nationalID,
		},
	};
}

export function updateName(fullName) {
	return { type: "customer/updateName", payload: fullName };
}
