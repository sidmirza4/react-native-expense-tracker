import { View, Text, FlatList } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
	return <ExpenseItem {...itemData.item} />;
}

export default function ExpensesList({ expenses }) {
	return (
		<FlatList
			data={expenses}
			keyExtractor={(i) => i.id}
			renderItem={renderExpenseItem}
		/>
	);
}
