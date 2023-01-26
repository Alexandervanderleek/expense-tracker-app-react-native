import React from 'react'
import { Text,FlatList } from 'react-native'
import ExpenseItem from './ExpenseItem'

function renderExpenseItem(itemData){
    return (
        <ExpenseItem {...itemData.item}></ExpenseItem>
    )
}


export default function ExpensesList({expenses}) {
  
  
  
    return (
    <FlatList data={expenses} keyExtractor={(item)=>item.id} renderItem={renderExpenseItem}>

    </FlatList>
  )
}
