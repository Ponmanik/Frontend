import React from 'react'

export default function ExpenseList({proexpenses,deleteExpenses,editExpenses}) {
  return (
    <div>ExpenseList
      {proexpenses.map((item,index) => (
        <div key={index}>
          {item.title} - {item.amount}
           <button onClick={()=>deleteExpenses(item._id)}>Delete</button>
            <button onClick={() => editExpenses(item)}>Edit</button>
        </div>
      ))}
    </div>

  )
}