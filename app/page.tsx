export default function Home() {
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav className="fixed top-0 w-full flex justify-between gap-2 p-2 bg-slate-800">
        <button className="bg-green-400 rounded-md p-2">XICAS</button>
        <button className="bg-green-400 rounded-md p-2">VENDER</button>
      </nav>
      <h1>XICAS PAPER MY FRIEND</h1>
    </div>
  );
}
