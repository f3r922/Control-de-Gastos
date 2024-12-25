import { useMemo } from "react"
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { Expense } from "../types"
import { formatDate } from "../helpers"
import { AmountDisplay } from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget";

interface ExpenseDetailProps {
    expense: Expense
}

export const ExpenseDetail = ({ expense } : ExpenseDetailProps ) => {

    const{ expenseName, amount, category, date, id } = expense

    const{ dispatch } = useBudget()

    //Nos trae un arreglo por eso posicion [0]
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === category)[0], [expense])
    
    const leadingActions = () => (
      <LeadingActions>
        <SwipeAction 
          onClick={ () => dispatch({ type:'get-expense-by-id', payload:{id:id} }) }
        >
          Actualizar
        </SwipeAction>
      </LeadingActions>
    )

    const trailingActions = () => (
      <TrailingActions>
        <SwipeAction 
          onClick={() => dispatch({ type:'remove-expense', payload:{id: id} })}
          destructive={true}
        >
          Eliminar
        </SwipeAction>
      </TrailingActions>
    )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">

            <div>
              <img 
                src={`/icono_${categoryInfo.icon}.svg`}
                alt="Icono Gasto"
                className="w-20"
              />
            </div>

            <div className="flex-1 space-y-3">
              <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
              <p>{expenseName}</p>
              <p className="text-slate-600 text-sm">{ formatDate(date!.toString()) }</p>
            </div>
            <AmountDisplay
              amount={amount}
            />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
