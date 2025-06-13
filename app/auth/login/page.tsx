"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/admins/login", { //5000
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Erro ao fazer login ❌");
      } else {
        toast.success("Login bem-sucedido! ✅");
        router.push("/"); // Redirect to home page
      }
    } catch (error) {
      toast.error("Erro de rede. Tente novamente ❌");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 fixed bg-[#ccfffc] justify-center items-center left-0 w-screen h-screen">
      <Toaster position="top-center" /> {/* Toast container */}
      
      <form onSubmit={handleSubmit} className="flex flex-col bg-[#3BDCD2] gap-3 py-7 px-11 w-96 items-center rounded-md">
        <h1 className="text-4xl font-semibold text-[#ccfffc]">LOGIN</h1> 

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
