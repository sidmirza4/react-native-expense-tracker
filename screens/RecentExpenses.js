import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function RecentExpenses() {
	const [isFetching, setIsFething] = useState(true);
	const [error, setError] = useState();
	const expensesCtx = useContext(ExpensesContext);

	useEffect(() => {
		async function get() {
			setIsFething(true);
			try {
				const expenses = await getExpenses();
				expensesCtx.setExpenses(expenses);
			} catch (error) {
				setError("Could not fetch expenses.");
			}

			setIsFething(false);
		}

		get();
	}, []);

	if (error && !isFetching) {
		return <ErrorOverlay message={error} />;
	}

	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7daysAgo = getDateMinusDays(today, 7);

		return expense.date >= date7daysAgo && expense.date <= today;
	});

	if (isFetching) {
		return <LoadingOverlay />;
	}

	return (
		<ExpensesOutput
			expensesPeriod="Last 7 days"
			expenses={recentExpenses}
			fallback="No expenses registered for the last 7 days."
		/>
	);
}
