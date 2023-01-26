import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import Button from '../../UI/Button';
import { getFormattedDate } from '../../util/date';
import Input from './Input'

export default function ExpenseForm({defaultValues,onCancel, submitButtonLabel, onSubmit}) {

  const [inputValue, setInputValue] = useState({
    amount: {value:defaultValues ? defaultValues.amount.toString() : '',
            isValid: true},
    date: {value:defaultValues ? getFormattedDate(defaultValues.date): '',
          isValid: true},
    description: {value: defaultValues ? defaultValues.description: '',
          isValid: true}
  });

  function confirmHandler(){
    const expenseData = {
      amount: +inputValue.amount.value,
      date: new Date(inputValue.date.value),
      description: inputValue.description.value
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const decripValid = expenseData.description.trim().length > 0;


    if(!amountIsValid || !dateIsValid || !decripValid){
      //return Alert.alert('Invalid prompt', 'Please double check data');
      setInputValue(()=>{
        return {
          amount: {value: inputValue.amount.value , isValid: amountIsValid},
          date: {value: inputValue.date.value , isValid: dateIsValid},
          description: {value: inputValue.description.value , isValid: decripValid}
        }
      });
      return;
    }


    onSubmit(expenseData);
  }

  function inputChangedHandler(inputID ,enteredValue){
    setInputValue((current)=>{
      return {
        ...current,
        [inputID]: {value: enteredValue, isValid: true}
      }
    })
  }

  const forminvalid = !inputValue.amount.isValid || !inputValue.date.isValid || !inputValue.description.isValid 

  return (
   <View style={styles.overall}>
    <Text style={styles.title}>Your Expense</Text>
    <View style={styles.container}>
    <Input invalid={!inputValue.amount.isValid} style={styles.rowIn} label="Amount" textInputConfig={{
      keyboardType: 'decimal-pad',
      onChangeText: inputChangedHandler.bind(this, 'amount'),
      value: inputValue.amount.value
     }}></Input>
     <Input invalid={!inputValue.date.isValid} style={styles.rowIn}  label="Date" textInputConfig={{
      placeholder: 'YYYY-MM-DD',
      maxLength: 10,
      onChangeText: inputChangedHandler.bind(this, 'date'),
      value: inputValue.date.value
     }}></Input>
    </View>
     
     <Input invalid={!inputValue.description.isValid} label="Description" textInputConfig={{
      multiline: true,
      onChangeText: inputChangedHandler.bind(this, 'description'),
      value: inputValue.description.value
     }}></Input>
     {forminvalid && (<Text style={styles.error}>Invalid Input Values Check Data</Text>)}
    <View style={styles.buttons}>
        <Button style={styles.buttonStyle} mode="flat" onPress={onCancel}>Cancel</Button>
        <Button style={styles.buttonStyle} onPress={confirmHandler}>{submitButtonLabel}</Button>

      </View>

   </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flexDirection: 'row'
  },
  rowIn: {
    flex: 1
  },
  title:{
    marginVertical: 24,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  overall:{
    marginTop: 40,

  },
  buttonStyle:{
    minWidth: 120,
    marginHorizontal: 8
  },
  buttons:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  error:{
    textAlign: 'center',
    color: GlobalStyles.colors.error500
  }
})