"use client";
import React, { useState } from "react";
import { v4 as generateUniqueId } from "uuid";
import { Category } from "@/enum";
import { ExpenseItem } from "./Modal";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase/firebase";
import {FaTrash} from "react-icons/fa"

function Table({ expenses }: { expenses: ExpenseItem[] }) {
  // const deleteItem=async(id:string)=>{
  //   await deleteDoc(doc(db,'expenses',id));
  // }
  const deleteItem = async (id: string) => {
    console.log("Deleting item with ID:", id);
    try {
      console.log("Deleting item with ID:", id);
      const expenseRef = doc(
        db,
        "users",
        auth?.currentUser?.uid ?? "",
        "expenses",
        id
      ); // Replace 'yourFirestoreCollection' with your Firestore collection name
      await deleteDoc(expenseRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  // const total = expenses.reduce((sum, expense) => sum + expense.price, 0);
  console.log("Expenses:", expenses);
  // Check if expenses is defined before using reduce
  if (!expenses) {
    return null; // or handle the case where expenses is not provided
  }
  // Calculate the total price
   const total = expenses.reduce((sum, expense) => {
    // Log each expense and its price during the calculation
    console.log("Expense:", expense);
    console.log("Price:", expense.price);

    return sum + expense.price;
  }, 0);

  // Log the final total
  console.log("Total:", total);
  return (
    <>

      <div className="flex flex-col">
        <div className="flex flex-col text-black bg-[#c6c5a0] p-6 mt-0 w-[100%] rounded-[13px]">
          <h1 className="text-2xl font-semibold">Expense List</h1>
          <span className="font-bold"></span>
        </div>
        <div className="mt-2 overflow-y-scroll scroll whitespace-nowrap scroll-smooth h-[620px]  ">
        {expenses.map((expense) => {
          return (
            <div key={expense.id} className="flex flex-col bg-white   bg-opacity-[0.1]    w-[100%] rounded-[13px] mt-2 ">
              <div className="flex flex-row justify-between text-white p-3">
              <p className="text-white">  ₹{expense.price}</p>
              <div className="flex px-3">
              <p className="text-white mx-6"> {expense.category}</p>
              <p className="text-white hover:cursor-pointer"  onClick={async () => {
                      console.log("Delete button clicked for ID:", expense.id);
                      await deleteItem(expense.id);
                    }}>  <FaTrash/></p>
              </div>
            </div>
            <div className="flex flex-row text-white">
              <p className="text-gray-400 p-2">  {new Date(expense.date).toLocaleDateString()}</p>
            </div>
            </div>
          );
        })}
        </div>
      </div>
    </>
  );
}

export default Table;


