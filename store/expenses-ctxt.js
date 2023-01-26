import { createContext, useReducer } from "react";


export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date})=>{},
    setExpenses: (expenses)=>{},
    deleteExpense: (id)=>{},
    updateExpense: (id, {description, amount, date})=>{}
});


function expensesReducer(state, action) {
    switch(action.type){
        case 'ADD':
            
            return [action.payload,...state]
        case 'UPDATE':
            const updateableExpenseIndex = state.findIndex((expense)=> expense.id === action.payload.id);
            const updateableExpense = state[updateableExpenseIndex];
            const updatedItem = {...updateableExpense, ...action.payload.data}
            const updatedExpenses = [...state];
            updatedExpenses[updateableExpenseIndex] = updatedItem;
            return updatedExpenses;
        
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload)
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        
        default:
            return state;

    }
}


function ExpenseContextProvider({children}){

    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData) {
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    function setExpenses(expenses){
        dispatch({type:'SET',payload: expenses})
    }

    function updateExpense(id, expenseData) {
        
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }


    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return <ExpenseContext.Provider value={value}>
        {children}
    </ExpenseContext.Provider>
}


export default ExpenseContextProvider;