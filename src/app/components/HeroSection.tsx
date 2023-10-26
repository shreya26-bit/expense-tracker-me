"use client";
// import React from 'react'
import { TypeAnimation } from "react-type-animation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./Modal";
import Table from "./Table";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
import { ExpenseItem } from "./Modal";
import { Category } from "@/enum";
import { auth } from "./firebase/firebase";
import { useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function Navbar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    auth.authStateReady().then(() => {
      if (auth.currentUser === null) {
        router.push("/");
      }
    });
  }, [auth]);

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
  // <-------------------------------LOGIC FOR SHOW EACK Category ON CHARTS ON THE BASIS OF PRICE---------------------->
  function calculateCategoryTotalPrices(expenses: ExpenseItem[]) {
    const categoryTotalPrices: any = {};

    expenses.forEach((expense) => {
      const { category, price } = expense;
      if (!categoryTotalPrices[category]) {
        categoryTotalPrices[category] = 0;
      }

      categoryTotalPrices[category] += price;
      console.log("Category Total Price is ", categoryTotalPrices);
    });
    console.log(categoryTotalPrices);

    return categoryTotalPrices;
  }


  // const expenses = ...; // Your array of expenses
  const categoryTotalPrices = calculateCategoryTotalPrices(expenses);

  const chartData = {
    labels: Object.keys(categoryTotalPrices),
    datasets: [
      {
        data: Object.values(categoryTotalPrices),
        backgroundColor: [
          "#fa98d8", // Color for the first category
          "#a8d2f0",
          "#e2e6a8",
          "#9080e1",
          "#fabcf3",
          "#ceef13",
          // Color for the second category
          // Add more colors as needed
        ],
        borderWidth: 1,
        borderRadius: 30,
        cutout: "80%",
      },
    ],
  };
  return (
    <>
      <Modal

        show={modalIsOpen}
        onClose={setModalIsOpen}
        expenses={expenses}
        setExpenses={setExpenses}
      />
      <div className="flex flex-col">
        <h1 className="text-white  text-5xl font-sans font-bold m-6 ">
          🕵️SPENDIFY🕵️
        </h1>
        {/* <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
          <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
            <h1 className="text-white text-5xl font-sans font-bold m-6 ">
              🕵️SPENDIFY🕵️
            </h1>
            <div className="mobile-menu  block md:hidden">
              {!navbarOpen ? (
                <button
                  onClick={() => setNavbarOpen(true)}
                  className="flex items-center px-3 py-2 border rounded border-slate-200 text-red-900 hover:text-white  hover:border-white"
                >
                  {" "}
                  <Bars3Icon className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={() => setNavbarOpen(false)}
                  className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </nav> */}

        <div
          className={
            navbarOpen
              ? "md:hidden absolute top-[100px] right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen bg-slate-800 text-white ease-in duration-300"
              : "md:hidden absolute top-[100px] right-0 bottom-0 left-[-100%] flex justify-center items-center w-full h-screen bg-slate-800 text-white ease-in duration-300"
          }
        >
          <div className="flex flex-col w-[100%] text-black rounded-2xl p-6 mt-6 mx-2 bg-[#d8f9e0] bg-opacity-[0.7]">
            <h1 className="font-bold text-2xl">Entertainment</h1>
            <span className="font-bold text-2xl">
              ₹ {categoryTotalPrices[Category.Entertainment] || 0}
            </span>
          </div>
        </div>

        <div className="">
          <h1 className="text-white mt-5 mx-6 text-2xl">Track Your Expenses</h1>
          <p className="text-white mx-6 text-1xl mt-2">
            keeping track of your expenses is important part of managing your
            overall finanace
          </p>
          <button
            onClick={() => {
              setModalIsOpen(true);
            }}
            className="mt-8 m-4 border-[1px] bg-gradient-to-r from-purple-900 to-pink-400 rounded-2xl p-2 font-bold text-black hover:bg-white"
          >
            Add Expenses{" "}
          </button>
        </div>

        <div className=" flex lg:flex-row md:flex-row flex-col justify-between  text-white mt-5 ">
          {expenses.length == 0 ? (
            <div className="flex flex-col px-4">
              <div className="text-black font-extrabold bg-[#eff6be] p- rounded-2xl mt- text-2xl">
                What are you thinking, Add your first expense?😉
              </div>
            </div>
          ) : (
            <>
              {/* <div className=" bg-white m-4  bg-opacity-[0.1] md:w-[40] h-[200px] rounded-2xl lg:hidden md:hidden sm:hidden">
                <p className="p-2 text-3xl mt-4">Tracker Board😉</p>
                <div className="flex mt-4">
                  <div className="flex flex-col w-[100%]  text-black rounded-2xl p-2 m-2 bg-[#c6c8f2]">
                    <h1 className="font-bold text-2xl">Total</h1>
                    <span className="font-bold text-[25px]">₹ {total}</span>
                  </div>
                </div>
              </div> */}
              <div className="  bg-white m-4 bg-opacity-[0.05] lg:w-[50%] h-[710px] rounded-2xl md:w-[100%]">
                {/* <h1 className="text-4xl rounded-3xl p-4 bg-opacity-[0.09]  font-semibold">
                Purchase details
              </h1> */}
                <Table expenses={expenses} />
              </div>
            </>
          )}
          <div className="flex flex-col lg:w-[50%] ">
            <div className=" bg-white m-4  bg-opacity-[0.1] md:w-[40] rounded-2xl  ">
              <p className="p-2 text-2xl mt-4">Expenses Structure</p>
              <div className="flex justify-center">
                <p className=" text-2xl p-2">
                  <Doughnut data={chartData} />
                </p>
              </div>
            </div>
            <div className=" bg-white m-4 bg-opacity-[0.1] md:w-[40] h-[300px] rounded-2xl ">
              <p className="p-4 text-3xl mt-4">Tracker Board😉</p>
              <div className="flex mt-8">
                <div className="flex flex-col w-[100%]  text-black rounded-2xl p-4 m-2 bg-[#ebee96]">
                  <h1 className="font-bold text-2xl">Total</h1>
                  <span className="font-bold text-3xl">₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:flex  lg:flex-row justify-between flex-col text-white mt-10">
          <div className="  bg-white m-2 bg-opacity-[0.05] lg:w-[100%] lg:h-[250px] md:[250px] rounded-2xl ">
            <h1 className="text-3xl rounded-3xl p-4 bg-[#f4dada] bg-opacity-[0.09]">
              Category
            </h1>
            <div className="lg:flex grid grid-cols-3 lg:flex-row md:flex-col flex-col mt-2">
              <div className="flex flex-col justify-between lg:w-[100%]   text-black rounded-2xl lg:p-6 p-2  mt-6 mx-1 bg-[#d8f9e0] bg-opacity-[0.7] ">
                <h1 className="font-bold lg:text-2xl">Entertainment</h1>
                <span className="font-bold text-2xl">
                  ₹ {categoryTotalPrices[Category.Entertainment] || 0}
                </span>
              </div>
              <div className="flex flex-col text-black bg-[#eaeec7] lg:p-6 mt-6 p-2 w-[100%] rounded-2xl mx-1 bg-opacity-[0.7]">
                <h1 className="lg:text-2xl font-bold bg-opacity-[0.7]">Food</h1>
                <span className="font-bold text-2xl">
                  ₹ {categoryTotalPrices[Category.Food] || 0}
                </span>
              </div>
              <div className="flex flex-col text-black bg-[#c4eff4] lg:p-6 mt-6 p-2 w-[100%] rounded-2xl mx-3">
                <h1 className="lg:text-2xl font-bold bg-opacity-[0.7]">
                  Travel
                </h1>
                <span className="font-bold text-2xl">
                  ₹{categoryTotalPrices[Category.Travel] || 0}
                </span>
              </div>
              <div className="flex flex-col text-black bg-[#efb1bd] lg:p-6 mt-6 p-2 w-[100%] rounded-2xl mx-1 bg-opacity-[0.7]">
                <h1 className="lg:text-2xl font-bold">Subscription</h1>
                <span className="font-bold text-2xl">
                  ₹ {categoryTotalPrices[Category.Subsrciption] || 0}
                </span>
              </div>
              <div className="flex flex-col text-black bg-[#f9c66e] lg:p-6 mt-6 p-2 w-[100%] rounded-2xl mx-2 bg-opacity-[0.7]">
                <h1 className="lg:text-2xl font-bold">Rent</h1>
                <span className="font-bold text-2xl">
                  ₹ {categoryTotalPrices[Category.Rent] || 0}
                </span>
              </div>
              <div className="flex flex-col text-black bg-[#ece948] lg:p-6 p-2 mt-6 w-[100%] rounded-2xl mx-3 bg-opacity-[0.7]">
                <h1 className="lg:text-2xl font-bold">other</h1>
                <span className="font-bold text-2xl">
                  {categoryTotalPrices[Category.Other] || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    </>
  );
}

export default Navbar;
