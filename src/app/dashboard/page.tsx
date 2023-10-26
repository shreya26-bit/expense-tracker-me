"use client";
// import React from 'react'
import { TypeAnimation } from "react-type-animation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
import { ExpenseItem } from "../components/Modal";
import { Category } from "@/enum";
import { auth } from "../components/firebase/firebase";
import { useRouter } from "next/navigation";
import Navbar from "../components/HeroSection";

function Dashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    auth.authStateReady().then(() => {
      if (auth.currentUser === null) {
        router.push("/");
      }
    });
  }, [auth]);

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
  //  <----------------------------------------------END LOGIC------------------------------------------------>
  return (
    <>
      {/*<--------------------------------------------{Models  Section}--------------------------------------------------------- */}
      {/* <Modal
        show={modalIsOpen}
        onClose={setModalIsOpen}
        expenses={expenses}
        setExpenses={setExpenses}
      /> */}

      {/* <div className="flex flex-row">  
     <div className="h-[250px] ">
        </div>  */}
      {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 text-5xl">
              Hey!!!
            </span>
            <TypeAnimation
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-red-600 mt-4"
              sequence={["Glimpse at your montly expenses", 500]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1> */}
      {/* <button
            onClick={() => {
              setModalIsOpen(true);
            }}
            className="mt-8 border-[1px] bg-gradient-to-r from-purple-900 to-pink-400 rounded-2xl p-2 font-bold text-black hover:bg-white"
          >
            Add Expenses{" "}
          </button> */}
      {/* {
           expenses.length==0&&(
          <div className="text-black font-extrabold bg-[#eff6be] p-3 rounded-2xl mt-10">
                What are you thinking, Add your first expense? 😉
            </div>
         )
          }
        </div> */}

      {/* <----------------------------------------------Model section end-----------------------------------------------------> */}

      {/* <-----------------------------------------charts UI------------------------------------------------------------------------>  */}
      {/* <section>
        <div className="mt-2 flex justify-center p-8">
          <div className="w-[350px] h-[350px] m-5">
            <Doughnut data={chartData} />
          </div>
          <div className="w-[350px] h-[350px]">
            <Doughnut data={chartData} />
          </div>
        
        </div>
        
     
        </section> */}
      <Navbar />
      {/* 
      <h1 className="m-4 text-gray-300  text-3xl font-semibold  ">Chart section🙂</h1> */}

      {/* <div className=" flex lg:flex-row md:flex-row flex-col justify-between  text-white mt-40 "> */}
      {/* <div className="  bg-white mx-4 bg-opacity-[0.1] lg:w-[60%] lg:h-[350px] md:w-[60%] rounded-2xl flex justify-center">
          <p className="p-4 text-2xl mt-4">
            <Doughnut data={chartData} />
          </p>
        </div> */}
      {/* <div className="  bg-white m-4 bg-opacity-[0.05] lg:w-[50%] h-[800px] rounded-2xl">
          <h1 className="text-4xl rounded-3xl p-4 bg-opacity-[0.09]  font-semibold">
            Purchase details
          </h1>
          {expenses.length == 0 ? (
            <div className="flex flex-col px-4">
              <div className="text-black font-extrabold bg-[#eff6be] p-5 rounded-2xl mt-10 text-2xl">
                What are you thinking, Add your first expense?😉
              </div>
              <button
                onClick={() => {
                  setModalIsOpen(true);
                }}
                className="mt-8 border-[1px] bg-gradient-to-r lg:w-[30%] from-purple-900 to-pink-400 rounded- p-4 font-bold text-black hover:bg-white text-2xl  "
              >
                Add Expenses{" "}
              </button>
            </div>
          ) : (
            <> */}
      {/* <Table expenses={expenses}  /> */}
      {/* <button
                onClick={() => {
                  setModalIsOpen(true);
                }}
                className="mt-8 border-[1px] bg-gradient-to-r from-purple-900 to-pink-400 rounded-2xl p-2 font-bold text-black hover:bg-white"
              >
                Add Expenses{" "}
              </button>
            </>
          )}
        </div>
        <div className="flex flex-col lg:w-[50%] ">
          <div className=" bg-white m-4  bg-opacity-[0.1] md:w-[40] rounded-2xl  ">
            <p className="p-2 text-2xl mt-4">Expenses Structure</p>
            <div className="flex justify-center">
              <p className=" text-2xl p-2">
                <Doughnut data={chartData} />
              </p>
            </div>
          </div>
          <div className=" bg-white m-4  bg-opacity-[0.1] md:w-[40] h-[300px] rounded-2xl">
            <p className="p-4 text-3xl mt-4">Tracker Board😉</p>
            <div className="flex mt-8">
              <div className="flex flex-col w-[100%]  text-black rounded-2xl p-4 m-2 bg-[#f0f1cd]">
                <h1 className="font-bold text-3xl">Total</h1>
                <span className="font-bold">₹ </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <h1 className="m-4 text-white text-6xl font-bold mt-6">Expenses💰</h1>

      <div className=" flex flex-row justify-between  text-white mt-10">
        <div className="  bg-white m-4 bg-opacity-[0.05] w-[40%] h-[930px] rounded-2xl">
          <h1 className="text-4xl rounded-3xl p-4 bg-[#f3ebeb] bg-opacity-[0.09] font-semibold">
            Category
          </h1>
          <div className="flex flex-col mt-8">
            <div className="flex flex-col w-[100%] text-black rounded-2xl p-6 bg-[#c4f4d1]">
              <h1 className="font-bold text-3xl">Entertainment</h1>
              <span className="font-bold">
                ₹ {categoryTotalPrices[Category.Entertainment] || 0}
              </span>
            </div>
            <div className="flex flex-col text-black bg-[#eaeec7] p-6 mt-6 w-[100%] rounded-2xl">
              <h1 className="text-3xl font-bold">Food</h1>
              <span className="font-bold">
                ₹ {categoryTotalPrices[Category.Food] || 0}
              </span>
            </div>
            <div className="flex flex-col text-black bg-[#c4eff4] p-6 mt-6 w-[100%] rounded-2xl">
              <h1 className="text-3xl font-bold">Travel</h1>
              <span className="font-bold">
                ₹{categoryTotalPrices[Category.Travel] || 0}
              </span>
            </div>
            <div className="flex flex-col text-black bg-[#efb1bd] p-6 mt-6 w-[100%] rounded-2xl">
              <h1 className="text-3xl font-bold">Subscription</h1>
              <span className="font-bold">
                ₹ {categoryTotalPrices[Category.Subsrciption] || 0}
              </span>
            </div>
            <div className="flex flex-col text-black bg-[#f9c66e] p-6 mt-6 w-[100%] rounded-2xl">
              <h1 className="text-3xl font-bold">Rent</h1>
              <span className="font-bold">
                ₹ {categoryTotalPrices[Category.Rent] || 0}
              </span>
            </div>
            <div className="flex flex-col text-black bg-[#ece948] p-6 mt-6 w-[100%] rounded-2xl">
              <h1 className="text-3xl font-bold">other</h1>
              <span className="font-bold">
                {categoryTotalPrices[Category.Other] || 0}
              </span>
            </div>
          </div>
        </div>
        </div> */}

      {/* <div className="  bg-white m-4 bg-opacity-[0.05] w-[60%] h-[800px] rounded-2xl">
          <h1 className="text-4xl rounded-3xl p-4 bg-opacity-[0.09]  font-semibold">
            Purchase details
          </h1>
          {expenses.length == 0 ? (
            <div className="flex flex-col px-4">
              <div className="text-black font-extrabold bg-[#eff6be] p-5 rounded-2xl mt-10 text-2xl">
                What are you thinking, Add your first expense? 😉
              </div>
              <button
                onClick={() => {
                  setModalIsOpen(true);
                }}
                className="mt-8 border-[1px] bg-gradient-to-r w-[30%] from-purple-900 to-pink-400 rounded- p-4 font-bold text-black hover:bg-white text-2xl  "
              >
                Add Expenses{" "}
              </button>
            </div>
          ) : (
            <>
              <Table expenses={expenses} />

              <button
                onClick={() => {
                  setModalIsOpen(true);
                }}
                className="mt-8 border-[1px] bg-gradient-to-r from-purple-900 to-pink-400 rounded-2xl p-2 font-bold text-black hover:bg-white"
              >
                Add Expenses{" "}
              </button>
            </>
          )}
        </div> */}
      {/* </div> */}

      {/* <div className=" flex lg:flex-row md:flex-row flex-col justify-between  text-white mt-5 "> */}
      {/* <div className="  bg-white mx-4 bg-opacity-[0.1] lg:w-[60%] lg:h-[350px] md:w-[60%] rounded-2xl flex justify-center">
          <p className="p-4 text-2xl mt-4">
            <Doughnut data={chartData} />
          </p>
        </div> */}
      {/* <div className="  bg-white m-4 bg-opacity-[0.05] lg:w-[50%] h-[800px] rounded-2xl">
            <h1 className="text-4xl rounded-3xl p-4 bg-opacity-[0.09]  font-semibold">
              Purchase details
            </h1> */}
      {/* {expenses.length == 0 ? (
              <div className="flex flex-col px-4">
                <div className="text-black font-extrabold bg-[#eff6be] p-2 rounded-2xl mt- text-2xl">
                  What are you thinking, Add your first expense?😉
                </div> */}
      {/* <button
                  onClick={() => {
                    setModalIsOpen(true);
                  }}
                  className="mt-8 border-[1px] bg-gradient-to-r lg:w-[30%] from-purple-900 to-pink-400 rounded- p-4 font-bold text-black hover:bg-white text-2xl  "
                >
                  Add Expenses{" "}
                </button> */}
      {/* </div>
            ) : (
              
                <div className="  bg-white m-4 bg-opacity-[0.05] lg:w-[50%] h-[800px] rounded-2xl">
            <h1 className="text-4xl rounded-3xl p-4 bg-opacity-[0.09]  font-semibold">
              Purchase details
            </h1>
                <Table expenses={expenses}  /> */}
      {/* <button
                  onClick={() => {
                    setModalIsOpen(true);
                  }}
                  className="mt-8 border-[1px] bg-gradient-to-r from-purple-900 to-pink-400 rounded-2xl p-2 font-bold text-black hover:bg-white"
                >
                  Add Expenses{" "}
                </button> */}
      {/* </div>
              
            )}
          </div> */}
    </>
  );
}
export default Dashboard;
