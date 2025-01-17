interface ModalItemProps {
    showModal: boolean;
    closeModal: () => void;
}
const lista = [
    "/img/iphone13.jpg",
    "/img/iphone13.jpg",
    "/img/iphone13.jpg",
    "/img/iphone13.jpg",
    "/img/iphone13.jpg",
    "/img/iphone13.jpg",
    "/img/iphone13.jpg",
    "/img/iphone13.jpg",
    "/img/iphone13.jpg"
]
export default function ModalItemScreen({showModal, closeModal}:ModalItemProps) {
    return(
        <div>
            {showModal && (
                <div
                className="
                    fixed inset-0 flex items-center justify-center
                    bg-black bg-opacity-50 z-50"
                >
                    <div
                        className="
                        bg-white rounded-lg p-6 gap-4 w-auto
                        flex justify-between"
                    >   
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-3">
                                <div className="flex border border-[#81f7ef] rounded-md overflow-hidden">
                                    <div className="flex bg-white h-36 overflow-hidden">
                                        <img 
                                        alt="img-vazia" 
                                        src={"/img/sem-foto.jpg"}
                                        className='bg-[#ffffff] p-1 object-contain object-center'/>
                                    </div>

                                    <div className="flex flex-col overflow-auto h-36 border border-l-[#81f7ef]">
                                        {lista.map((image, i) =>
                                            <img className="bg-[#ffffff] w-10 h-10 p-1 object-contain object-center" src={image} key={i} alt={`imagem ${i}`} />
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-1">
                                    <div className="flex gap-1">
                                        <div className="flex flex-col">
                                            <label className='text-xs text-[#198A83]'>Nome do Produto:</label>
                                            <input 
                                            type="text" 
                                            className='w-96 h-8 p-2 bg-[#46b0a9] text-white  rounded-md text-sm'
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className='text-xs text-[#198A83]'>ID:</label>
                                            <input 
                                            type="text" 
                                            disabled
                                            className='w-28 h-8 p-2 bg-[#46b0a9] text-white  rounded-md text-sm'
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className='text-xs text-[#198A83]'>Cod. de Barras:</label>
                                        <input 
                                        type="text" 
                                        className='h-8 p-2 bg-[#46b0a9] text-white  rounded-md text-sm'
                                        />
                                    </div>
                                    
                                    <div className="flex gap-1 justify-between">
                                        <div className="flex flex-col">
                                            <label className='text-xs text-[#198A83]'>Quantidade:</label>
                                                <input 
                                                type="number" 
                                                className='max-w-40 h-8 p-2 bg-[#3BDCD2] text-[#198A83] text-sm rounded-md'
                                                min={0}
                                                />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className='text-xs text-[#198A83]'>Custo Unit.:</label>
                                                <input 
                                                type="number" 
                                                className='min-w-40 h-8 p-2 bg-[#3BDCD2] text-[#198A83] text-sm rounded-md'
                                                min={0}
                                                />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className='text-xs text-[#198A83]'>Custo Total:</label>
                                                <input 
                                                type="number" 
                                                className='max-w-40 h-8 p-2 bg-[#3BDCD2] text-[#198A83] text-sm rounded-md'
                                                min={0}
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div className="flex gap-1 justify-between">
                                <div className="flex flex-col">
                                    <label className='text-xs text-[#198A83]'>Descrição:</label>
                                    <textarea 
                                    className='flex min-w-[554px] h-16 p-2 bg-[#46b0a9] text-white  rounded-md text-sm'
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className='text-xs text-[#198A83]'>Tags:</label>
                                    <textarea 
                                    className='h-16 max-w-44 p-2 bg-[#46b0a9] text-white  rounded-md text-sm'
                                    />
                                </div>
                            </div>   
                            <div className="flex gap-1 ">
                                <div className="flex flex-col">
                                    <label className='text-xs text-[#198A83]'>Valor:</label>
                                    <input
                                    min={0}
                                    type="number"
                                    className='h-10 max-w-44 p-2 bg-[#46b0a9] text-white  rounded-md text-sm'
                                    />
                                </div>
                                
                                <button
                                onClick={closeModal} // Fecha o modal
                                className="bg-red-500 text-white py-2 px-4 rounded-md"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={() => {
                                    closeModal();
                                    alert("Produto cadastrado co sucesso!"); // Exemplo de ação final
                                    }}
                                    className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
                                >
                                    Confirmar
                                </button>
                        
                            </div>
                        </div>
                    </div>     
                </div>
            )}
        </div>
    )
}