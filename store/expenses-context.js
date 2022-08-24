import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
	{
		id: "e1",
		description: "A pair of shoes",
		amount: 59.99,
		date: new Date("2021-12-19"),
	},

	{
		id: "e2",
		description: "A hat",
		amount: 29.99,
		date: new Date("2022-1-20"),
	},

	{
		id: "e3",
		description: "Some bananas",
		amount: 1.99,
		date: new Date("2022-1-21"),
	},

	{
		id: "e4",
		description: "A book",
		amount: 10.99,
		date: new Date("2022-2-19"),
	},

	{
		id: "e5",
		description: "Another book",
		amount: 10.99,
		date: new Date("2022-2-18"),
	},
];

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: ({ description, amount, date }) => {},
	removeExpense: (id) => {},
	updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
	switch (action.type) {
		case "ADD":
			const id = new Date().toString() + Math.random().toString();
			return [...state, { id, ...action.payload }];
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
	const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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
