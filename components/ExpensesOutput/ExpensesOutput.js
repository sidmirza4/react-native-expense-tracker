import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

export default function ExpensesOutput({ expenses, expensesPeriod, fallback }) {
	let content = <Text style={styles.infoText}>{fallback}</Text>;

	if (expenses.length > 0) {
		content = <ExpensesList expenses={expenses} />;
	}

	return (
		<View style={styles.container}>
			<ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary700,
	},

	infoText: {
		color: "white",
		fontSize: 16,
		textAlign: "center",
		marginTop: 32,
	},
});
