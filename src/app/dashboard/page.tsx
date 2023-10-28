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
      <Navbar />
    </>
  );
}
export default Dashboard;
