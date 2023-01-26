import React, { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ExpenseForm from '../components/Manage/ExpenseForm';
import { GlobalStyles } from '../constants/styles';
import { ExpenseContext } from '../store/expenses-ctxt';
import ErrorOverlay from '../UI/ErrorOverlay';
import IconButton from '../UI/IconButton';
import LoadingOverlay from '../UI/LoadingOverlay';
import { deleteExpenses, storeExpense, updateExpense } from '../util/https';

export default function ManageExpenses({route, navigation}) {

  const expenseCtx = useContext(ExpenseContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  )

  useLayoutEffect(()=>{
    navigation.setOptions({
      title: isEditing  ? 'Edit Expense' : 'Add Expense'
    })
  },[navigation, isEditing])

  
  async function deleteExpenseHandler(){
    setIsLoading(true);
    try{
      await deleteExpenses(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack(); 
    }catch(error){
      setError(error);
      setIsLoading(false);
    }
    

  }

  function cancelHandler(){
    navigation.goBack();
  }



  async function submitHandler(expenseData){
    setIsLoading(true);
    if(isEditing){
      expenseCtx.updateExpense(editedExpenseId, expenseData);
      await updateExpense(editedExpenseId,expenseData);
    }else{
      const id = await storeExpense(expenseData);
      expenseCtx.addExpense({...expenseData, id: id})
    }
    navigation.goBack();
  };

  if(error){
    return <ErrorOverlay message="error" onConfirm={()=>{setError(null)}} >

    </ErrorOverlay>
  }

  if(loading){
    return <LoadingOverlay>

    </LoadingOverlay>
  }


  return (
    <View style={styles.container}>
      <ExpenseForm defaultValues={selectedExpense} submitButtonLabel={isEditing ? 'Update' : 'Add'} onCancel={cancelHandler} isEditing={isEditing} onSubmit={submitHandler}></ExpenseForm>
      
      {isEditing && 
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}>
          </IconButton>
          </View>
        }
    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  deleteContainer:{
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
  
})
