import { View, Text } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

export default function RecentExpenses() {
	const expensesCtx = useContext(ExpensesContext);

	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7daysAgo = getDateMinusDays(today, 7);

		return expense.date >= date7daysAgo && expense.date <= today;
	});

	return (
		<ExpensesOutput
			expensesPeriod="Last 7 days"
			expenses={recentExpenses}
			fallback="No expenses registered for the last 7 days."
		/>
	);
}
