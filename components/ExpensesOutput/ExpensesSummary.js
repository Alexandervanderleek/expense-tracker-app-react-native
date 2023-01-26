import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles';

export default function ExpensesSummary({expenses,periodName}) {
  
  const expenseSum = expenses.reduce((sum, expense)=> {
    return sum + expense.amount
  }, 0);
  
    return (
    <View style={stlyes.container}>
        <Text style={stlyes.period}>{periodName}</Text>
        <Text style={stlyes.sum}>${expenseSum.toFixed(2)}</Text>
    </View>
  )
}


const stlyes = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500   
    }
})