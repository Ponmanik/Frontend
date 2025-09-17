import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import { v4 as uid } from "uuid";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import { useEffect } from "react";
import  axios  from 'axios';

 const EXPENSES = [
  { id: uid(), title: "Expense 1", amount: 100 },
  { id: uid(), title: "Expense 2", amount: -200 },
];
 
export default function ExpenseTrack() {
  const [expenses, setExpenses] = useState(EXPENSES);
  const [itemToEdit,setItemToEdit] = useState(null);
  useEffect(() =>{
    axios.get("http://localhost:3001/api/getdata")
    .then((res) => setExpenses(res.data))
    .catch((err) => console.error("Fetch error:",err)); 
  },[])

  const addExpense = (title, amount,id) => {
    if(id){
       //Edit existing
      const updated = expenses.map((exp) =>
      exp.id === id? {...exp,title,amount:Number(amount)}:exp);
      setExpenses(updated);
      setItemToEdit(null);// Reset edit mode
    }
    else{
      axios.post("http://localhost:3001/api/postdata",{title,amount:Number(amount)})
      .then((res) => setExpenses([...expenses,res.data]))
      .catch((err) => console.error("Add error:",err));
      
    /*setExpenses([
      ...expenses,
      {
        id: uid(),
        title,
        amount: Number(amount),
      },
    ]);*/
  };
}
  const deleteExpense = (id) => {
    axios.delete(`http://localhost:3001/api/${id}`)
    .then(() => setExpenses(expenses.filter((exp)=> exp._id !== id)))
    .catch((err) => console.error("Delete error:",err));
  };
  return (
    <div>
      <h2>Expense Tracker</h2>
      <ExpenseForm addExpense={addExpense} itemToEdit = {itemToEdit}/>
      <ExpenseList proexpenses={expenses} deleteExpenses={deleteExpense} editExpenses={setItemToEdit}/>

      <ExpenseSummary proexpenses={expenses}/>
    </div>
  );
}