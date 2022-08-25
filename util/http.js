import axios from "axios";

const url = "https://expense-tracker-f9ed4-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
	const res = await axios.post(`${url}/expenses.json`, expenseData);
	return res.data.name;
}

export async function getExpenses() {
	const response = await axios.get(`${url}/expenses.json`);

	const expenses = [];

	for (const key in response.data) {
		const expenseObj = {
			id: key,
			amount: response.data[key].amount,
			description: response.data[key].description,
			date: new Date(response.data[key].date),
		};

		expenses.push(expenseObj);
	}

	return expenses;
}

export function updateExpense(id, expenseData) {
	return axios.put(`${url}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
	return axios.delete(`${url}/expenses/${id}.json`);
}
