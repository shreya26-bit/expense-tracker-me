"use client";
import Image from "next/image";
import Navbar from "./components/HeroSection";
import Dashboard from "./dashboard/page";
import Table from "./components/Table";
import { v4 as generateUniqueId } from "uuid";
import { Category } from "@/enum";
import { ExpenseItem } from "./components/Modal";
import { useState } from "react";
import LoginWithGoogle from "./Auth";

export default function Home() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

  return (
    <main className="flex min-h-screen flex-col ">
      {/* <div className=" w-[100%]"> */}
      {/* <Navbar /> */}
      {/* <div className=" m-8 "> */}
      {/* <HeroSection expenses={expenses} setExpenses={setExpenses} /> */}
      {/* {
            expenses.length==0?(
              null
            ):(
              <div className="m-5 p-8 mt-[6%]">
              <Table expenses={expenses} />
            </div>
            )
          } */}
      {/* </div> */}
      <LoginWithGoogle />
      {/* </div> */}
      {/* <Table  expenses={expenses}/> */}
    </main>
  );
}
