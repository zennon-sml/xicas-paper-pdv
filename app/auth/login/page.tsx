"use client"
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5000/api/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important to allow cookies from the API
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      console.log("Login successful");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" flex fixed bg-[#ccfffc] justify-center items-center left-0 w-screen h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col bg-[#3BDCD2] gap-3 py-7 px-11 w-96 items-center rounded-md">
        <h1 className=" text-4xl font-semibold text-[#ccfffc]">LOGIN</h1> 
        <div className="flex flex-col">
          <label className="text-[#1e6762]">E-mail</label>
          <input
            type="email"
            className="bg-[#6CE9E2] p-2 rounded-md w-72 text-xs text-[#185c57]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[#1e6762]">Senha</label>
          <input
            type="password"
            className="bg-[#6CE9E2] p-2 rounded-md w-72 text-xs text-[#185c57]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="flex justify-center p-2 bg-[#ccfffc] w-28 rounded-xl mt-3 text-[#30bab1] hover:bg-[#30bab1] hover:text-[#ccfffc]">
          Entrar
        </button>
      </form>
    </div>
  );
}
