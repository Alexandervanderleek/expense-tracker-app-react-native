import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpenseContext } from '../store/expenses-ctxt';

export default function AllExpenses() {
  const expensesCtx = useContext(ExpenseContext);
  return (
    <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="no expenses"></ExpensesOutput>
    )
}
