import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
	expenses: [],
	setExpenses: (expenses) => {},
	addExpense: ({ description, amount, date }) => {},
	removeExpense: (id) => {},
	updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
	switch (action.type) {
		case "ADD":
			return [...state, action.payload];

		case "SET":
			const invertedArray = action.payload.reverse();
			return invertedArray;

		case "DELETE":
			return state.filter((expense) => expense.id !== action.id);
		case "UPDATE":
			return state.map((expense) => {
				if (expense.id === action.id) {
					return { ...expense, ...action.payload };
				} else {
					return expense;
				}
			});
		default:
			return state;
	}
}

const ExpensesContextProvider = ({ children }) => {
	const [expensesState, dispatch] = useReducer(expensesReducer, []);

	const setExpenses = (expenses) => {
		dispatch({ type: "SET", payload: expenses });
	};

	const addExpense = (expenseData) => {
		dispatch({ type: "ADD", payload: expenseData });
	};

	const removeExpense = (id) => {
		dispatch({ type: "DELETE", id });
	};

	const updateExpense = (id, { description, amount, date }) => {
		dispatch({ type: "UPDATE", id, payload: { description, amount, date } });
	};

	return (
		<ExpensesContext.Provider
			value={{
				expenses: expensesState,
				setExpenses,
				addExpense,
				removeExpense,
				updateExpense,
			}}
		>
			{children}
		</ExpensesContext.Provider>
	);
};

export default ExpensesContextProvider;
