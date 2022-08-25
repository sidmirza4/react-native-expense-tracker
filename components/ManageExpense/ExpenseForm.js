import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";

import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

export default function ExpenseForm({
	onCancel,
	onSubmit,
	submitButtonLabel,
	defaultValues,
}) {
	const [inputs, setInputs] = useState({
		amount: {
			value: defaultValues ? defaultValues.amount.toString() : "",
			isValid: true,
		},
		date: {
			value: defaultValues ? getFormattedDate(defaultValues.date) : "",
			isValid: true,
		},
		description: {
			value: defaultValues ? defaultValues.description : "",
			isValid: true,
		},
	});

	function inputChangeHandler(inputIdentifier, enteredValue) {
		setInputs((prevValues) => ({
			...prevValues,
			[inputIdentifier]: {
				value: enteredValue,
				isValid: true,
			},
		}));
	}

	function submitHandler() {
		const expenseData = {
			amount: +inputs.amount.value,
			date: new Date(inputs.date.value),
			description: inputs.description.value,
		};

		const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid = expenseData.date.toString() !== "Invalid Date";
		const descriptionIsValid = expenseData.description.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			setInputs((prevValues) => ({
				...prevValues,
				amount: {
					value: prevValues.amount.value,
					isValid: amountIsValid,
				},
				date: {
					value: prevValues.date.value,
					isValid: dateIsValid,
				},
				description: {
					value: prevValues.description.value,
					isValid: descriptionIsValid,
				},
			}));
			return;
		}

		onSubmit(expenseData);
	}

	const formIsInvalid =
		!inputs.amount.isValid ||
		!inputs.date.isValid ||
		!inputs.description.isValid;

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>

			<View style={styles.inputRow}>
				<Input
					style={styles.rowInput}
					label="Amount"
					invalid={!inputs.amount.isValid}
					textInputConfig={{
						keyboardType: "decimal-pad",
						onChangeText: inputChangeHandler.bind(this, "amount"),
						value: inputs.amount.value,
					}}
				/>
				<Input
					style={styles.rowInput}
					label="Date"
					invalid={!inputs.date.isValid}
					textInputConfig={{
						placeholder: "YYYY-MM-DD",
						maxLength: 10,
						onChangeText: inputChangeHandler.bind(this, "date"),
						value: inputs.date.value,
					}}
				/>
			</View>
			<Input
				label="Description"
				invalid={!inputs.description.isValid}
				textInputConfig={{
					multiline: true,
					onChangeText: inputChangeHandler.bind(this, "description"),
					value: inputs.description.value,
				}}
			/>

			{formIsInvalid && (
				<Text style={styles.error}>
					Please check your inputs and try again.
				</Text>
			)}

			<View style={styles.buttons}>
				<Button style={styles.button} mode="flat" onPress={onCancel}>
					Cancel
				</Button>

				<Button onPress={submitHandler} style={styles.button}>
					{submitButtonLabel}
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	form: {
		marginTop: 24,
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		marginVertical: 24,
		textAlign: "center",
	},

	inputRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	rowInput: {
		flex: 1,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},

	button: {
		minWidth: 120,
		marginVertical: 8,
	},

	error: {
		color: GlobalStyles.colors.error500,
		textAlign: "center",
	},
});
