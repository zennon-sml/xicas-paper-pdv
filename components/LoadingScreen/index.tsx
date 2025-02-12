export default function LoadingScreen(){
    return(
        <div className=" fixed flex flex-col inset-0 justify-center items-center w-screen h-screen z-[9999] bg-[#8BE8DC] opacity-60">
            <div className="w-16 h-16 border-4 border-[#26a392] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-[#26a392] animate-pulse">
            Carregando...
            </p>
        </div>
    )
}