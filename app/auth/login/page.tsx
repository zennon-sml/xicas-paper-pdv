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
    <div>
      <h1>Form Test</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 p-2">
        <input
          type="text"
          className="bg-zinc-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="bg-zinc-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="flex p-2 align-middle bg-zinc-800">
          send
        </button>
      </form>
    </div>
  );
}
