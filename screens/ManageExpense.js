import React, { useContext, useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

export default function ManageExpenses({ route, navigation }) {
	const expenseCtx = useContext(ExpensesContext);
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;

	const selectedExpense = expenseCtx.expenses.find((expense) => {
		return expense.id === editedExpenseId;
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [navigation, isEditing]);

	function deleteExpesne() {
		expenseCtx.removeExpense(editedExpenseId);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function confirmHandler(expenseData) {
		if (isEditing) {
			expenseCtx.updateExpense(editedExpenseId, expenseData);
		} else {
			expenseCtx.addExpense(expenseData);
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<ExpenseForm
				onCancel={cancelHandler}
				submitButtonLabel={isEditing ? "Update" : "Add"}
				onSubmit={confirmHandler}
				defaultValues={selectedExpense}
			/>

			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon="trash"
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpesne}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},

	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: "center",
	},
});
