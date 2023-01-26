import React, { useContext, useEffect, useState } from 'react'
import { Text } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpenseContext } from '../store/expenses-ctxt'
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverlay';
import { getDateMinusDays } from '../util/date';
import { getExpenses} from '../util/https';


export default function RecentExpenses() {

  const expensesCtx = useContext(ExpenseContext);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(()=>{
    async function getExpensesItems(){
      setIsLoading(true);
      try{
        const items = await getExpenses();
        expensesCtx.setExpenses(items);
      }catch(error){
        setError(error)
      }
      setIsLoading(false);
    }
    getExpensesItems();
  },[])


  function errorHandler(){
    setError(null);
  }

  if(loading){
    return <LoadingOverlay>

    </LoadingOverlay>
  }

  if(error){
    return <ErrorOverlay message={error} onConfirm={errorHandler}></ErrorOverlay>
  }

  const recentExpenses = expensesCtx.expenses.filter((expense)=>{
    const today = new Date();
    const date7ago = getDateMinusDays(today, 7);
    return expense.date >= date7ago;
  })

  return (
          <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallbackText={"No expenses"}></ExpensesOutput>
    
  )
}
