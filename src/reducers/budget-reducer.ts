import { v4 as uuid } from 'uuid'
import { Category, DraftExpense, Expense } from "../types"

export type BudgetActions = 
{ type: 'add-budget', payload: { budget: number } } |
{ type: 'show-modal'} |
{ type: 'close-modal'} |
{ type: 'add-expense', payload:{ expense: DraftExpense } } |
{ type: 'remove-expense', payload:{ id: Expense['id'] } } |
{ type: 'get-expense-by-id', payload:{ id: Expense['id'] } } |
{ type: 'update-expense', payload: { expense: Expense } } |
{ type: 'restart-app' } |
{ type: 'add-filter-category', payload: {id: Category['id']}}


export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = () : Expense[] => {
    const expenses = localStorage.getItem('expenses')
    return expenses? JSON.parse(expenses) : []
}

export const initialState : BudgetState ={
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId:'',
    currentCategory: ''
}

const createExpense = (drafExpense: DraftExpense) : Expense => {
    return{
        ...drafExpense,
        id: uuid()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if( action.type === 'add-budget' ){
        return{
            ...state,
            budget: action.payload.budget
        }
    }

    if( action.type === 'show-modal' ){
        return{
            ...state,
            modal: true
        }
    }
    
    if( action.type === 'close-modal' ){
        return{
            ...state,
            modal: false,
            editingId:''
        }
    }

    if( action.type === 'add-expense' ){

        const expenses = createExpense(action.payload.expense)

        return{
            ...state,
            expenses: [...state.expenses, expenses],
            modal: false
        }
    }

    if( action.type === 'remove-expense' ){

        const updateExpenses = state.expenses.filter( item => item.id !== action.payload.id )

        return{
            ...state,
            expenses: updateExpenses,
        }
    }

    if( action.type === 'get-expense-by-id' ){

        return{
            ...state,
            editingId: action.payload.id,
            modal:true
        }
    }

    if( action.type === 'update-expense' ){

        return{
            ...state,
            expenses: state.expenses.map( expense => expense.id === action.payload.expense.id ?
                action.payload.expense : expense
            ),
            modal: false,
            editingId:''
        }
    }

    if( action.type === 'restart-app' ){
        return{
            ...state,
            budget:0,
            expenses:[]
        }
    }

    if( action.type === 'add-filter-category' ){
        return{
            ...state,
            currentCategory: action.payload.id
        }
    }


    return state
}