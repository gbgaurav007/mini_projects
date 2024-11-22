import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gradient-to-tr from-sky-950 via-blue-900 to-blue-800 w-full h-screen">
      <div className="font-dosis flex justify-center pt-4 text-5xl font-semibold text-transparent bg-gradient-to-tr bg-clip-text from-sky-300 via-pink-300 to-red-500">
        Mini Projects
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center pt-10 p-8">

        <Link to="/products" className="bg-yellow-800 border-2 border-yellow-950 rounded-lg text-white h-40 flex flex-col items-center justify-center p-2 hover:opacity-85 shadow-2xl">
          <img src='assets/cart_icon.png' alt="Chatbot" className="h-14 w-14 mb-2" />
          <span className="text-lg sm:text-xl font-bold">Shopping Cart</span>
        </Link>

        <Link to="/counter" className="bg-teal-500 border-2 border-teal-700 rounded-lg text-white h-40 flex flex-col items-center justify-center p-2 hover:opacity-85 shadow-2xl">
          <img src='assets/counter_icon.png' alt="Chatbot" className="h-14 w-14 mb-2" />
          <span className="text-lg sm:text-xl font-bold">Countdown Timer</span>
        </Link>

        <Link to="/todolist" className="bg-sky-500 border-2 border-sky-700 rounded-lg text-white h-40 flex flex-col items-center justify-center hover:opacity-85 p-2 shadow-2xl">
          <img src='assets/todolist_icon.png' alt="Chatbot" className="h-14 w-14 mb-2" />
          <span className="text-lg sm:text-xl font-bold">To Do List</span>
        </Link>

        <Link to="/signup" className="bg-rose-500 border-2 border-rose-700 rounded-lg text-white h-40 flex flex-col items-center justify-center p-2 hover:opacity-85 shadow-2xl">
          <img src='assets/signup_icon.png' alt="Translator" className="h-14 w-14 mb-2" />
          <span className="text-lg sm:text-xl font-bold">Form Validation</span>
        </Link>

        <div className="bg-purple-500 border-2 border-purple-700 rounded-lg text-white h-40 flex items-center justify-center hover:opacity-85 shadow-2xl blur-xs">
          <span className="text-lg sm:text-xl font-bold"></span>
        </div>

        <Link to="/profile" className="bg-yellow-500 border-2 border-yellow-600 rounded-lg text-white h-40 flex flex-col items-center justify-center p-2 hover:opacity-85 shadow-2xl">
          <img src='assets/profile_icon.png' alt="About" className="h-14 w-14 mb-2" />
          <span className="text-lg sm:text-xl font-bold">Profile Card</span>
        </Link>

      </div>
    </div>
  );
}