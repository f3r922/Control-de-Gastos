import { createContext, ReactNode, useReducer, useMemo } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: React.Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

type BugetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)//o puedo usar null! 



export const BugetProvider = ({children} : BugetProviderProps) => {

    const[state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0), 
    [state.expenses])

    const remainingBudget = state.budget - totalExpenses

    return(
       <BudgetContext.Provider
            value={{
                state, 
                dispatch, 
                totalExpenses,
                remainingBudget
            }}
       >
            {children}
       </BudgetContext.Provider>
    )
}