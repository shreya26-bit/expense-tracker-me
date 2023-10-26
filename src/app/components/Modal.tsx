"use client";
import React, { useEffect } from "react";
import ExpensesItemCategory from "./ExpensesItemCategory";
import { Category } from "@/enum";
import { v4 as generateUniqueId } from "uuid";
import { Dispatch, SetStateAction, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import {
  collection,
  addDoc,
  QuerySnapshot,
  query,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "./firebase/firebase";

export interface ExpenseItem {
  id: string;
  title: string;
  price: number;
  category: Category;
  date: number;
}

export interface ExpenseInput {
  title: string;
  price: number;
  category: Category;
}

function Modal({
  show,
  onClose,
  expenses,
  setExpenses,
}: {
  show: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;

  expenses: ExpenseItem[];
  setExpenses: Dispatch<SetStateAction<ExpenseItem[]>>;
}) {
  const [inputValue, setInputValue] = useState<ExpenseInput>({
    price: 0,
    title: "",
    category: Category.Food,
  });
  const [total, setTotal] = useState(0);

  // <---------------------------FUNCTINS FOR INPUT------------------------------------------------->
  const handleInputChange = (e: any) => {
    setInputValue({
      ...inputValue,
      [e.target.name]:
        e.target.name === "price" ? parseInt(e.target.value) : e.target.value,
    });
  };

  useEffect(() => {
    console.log("Inputvalue", inputValue);
  }, [inputValue]);

  // <-------------------------------END---------------------------------------------------------------------->

  // <---------------------------------ADD ITEMS TO DATABASE------------------------------------------------->
  const addItem = async () => {
    if (inputValue.price && inputValue.title)
      try {
        // Create a new expense object

        const newExpense: ExpenseItem = {
          ...inputValue,
          id: generateUniqueId(),
          date: new Date().getTime(),
        };

        // Add the new expense to Firestore
        const docRef = await addDoc(
          collection(db, "users", auth?.currentUser?.uid ?? "", "expenses"),
          newExpense
        );

        // Log the document reference (optional)
        console.log("Expense added with ID: ", docRef.id);

        // Update the local state (if needed)
        setExpenses([...expenses, newExpense]);

        // Clear the input fields
        setInputValue({
          price: 0,
          title: "",
          category: Category.Food,
        });
        onClose(false);
      } catch (error) {
        console.error("Error adding expense: ", error);
      }
  };
  // <--------------------------------------------------------------------------------------------------------->

  // <------------------------READ ITEMS FROM DATABASE------------------------------------------------------>
  useEffect(() => {
    console.log("Auth", auth);
    auth.authStateReady().then(() => {
      if (auth.currentUser) {
        console.log("Reading Started");
        const q = query(
          collection(db, "users", auth?.currentUser?.uid ?? "", "expenses")
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          const expenseArr: ExpenseItem[] = [];

          QuerySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("data is ", data);
            if (data) {
              const expensesItem: ExpenseItem = {
                id: doc.id,
                title: data.title || " ",
                price: data.price || 0,
                category: data.category || Category.Food,
                date: data.date || new Date().getTime(),
              };
              expenseArr.push(expensesItem);
            }
          });
          setExpenses(expenseArr);

          //Read total from Expenses
          const calculated = () => {
            const totalPrice = expenseArr.reduce(
              (sum, item) => sum + item.price,
              0
            );
            setTotal(totalPrice);
          };
          calculated();
          return () => unsubscribe();
        });
        return () => unsubscribe();
      }
    });
  }, [auth]);
  // <-------------------------------------------------------------------------------------------------------------->

  return (
    <div
      style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)",
      }}
      className="absolute top-[80px] left-0 w-full h-full transition-all duration-700"
    >
      <div className="container mx-auto max-w-3xl h-[80vh] rounded-3xl bg-gradient-to-r from-purple-300 to-pink-300 py-6 px-3 ">
        <button
          onClick={() => {
            onClose(false);
          }}
          className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-300 hover:bg-white"
        >
          X
        </button>
        <div className="input mx-4 ">
          <div className="input_text  mx-4 font-bold ">
            <input
              required
              className="p-5 w-[100%] rounded-2xl "
              type="number"
              value={inputValue.price}
              name="price"
              placeholder="Enter Price"
              onChange={handleInputChange}
            />
            <input
              required
              className=" mt-10 p-5 w-[100%] rounded-2xl"
              type="text"
              value={inputValue.title}
              name="title"
              placeholder="Enter"
              onChange={handleInputChange}
            />
            <select
              required
              className="mt-10 w-[100%] p-5 rounded-2xl"
              name="category"
              onChange={handleInputChange}
              value={inputValue.category}
            >
              {Object.keys(Category).map((categoryType, index) => {
                return (
                  <option
                    key={categoryType}
                    value={Object.values(Category)[index]}
                  >
                    {categoryType}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input_date font-semibold">
            <button
              className="mx-2 p-4 mt-[20%] text-white bg-red-500 rounded-3xl w-[95%] hover:bg-[#6f77e4] hover:text-black"
              onClick={addItem}
            >
              Add
            </button>
          </div>
        </div>
        {/* <--------------------------Expenses Section-------------------------------------> */}
      </div>
      return ();
    </div>
  );
}

export default Modal;
