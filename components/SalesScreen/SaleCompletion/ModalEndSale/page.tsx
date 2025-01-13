interface ModalEndSaleProps {
    showModal: boolean;
    totalValue: number;
    closeModal: () => void;
}

export default function ModalEndSale({showModal, totalValue, closeModal}:ModalEndSaleProps){
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
                        <div className="flex flex-col p-2 gap-3 bg-[#CBFCF6] rounded-md">
                            <div className="flex flex-col">
                                <label className='text-sm text-[#198A83]'>Venda Total:</label>
                                    <input 
                                    type="text" 
                                    disabled/* readOnly */
                                    className='w-60 h-9 p-2 bg-[#46b0a9] text-white  rounded-md text-lg'
                                    value={totalValue}  
                                    />
                            </div>
                            <div className="flex flex-col">
                                <label className='text-sm text-[#198A83]'>Tipo Desconto:</label>
                                <select 
                                id='tags' 
                                name='tags' 
                                className="w-60 h-9 p-1 bg-[#3BDCD2] text-[#198A83] rounded-md">
                                    <option value="valor">Valor (R$)</option>
                                    <option value="porcentagem">Porcentagem (%)</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className='text-sm text-[#198A83]'>Total Desconto:</label>
                                    <input 
                                    type="number" 
                                    className='w-60 h-9 p-2 bg-[#3BDCD2] text-[#198A83]  rounded-md'
                                    min={0}
                                    />
                            </div>
                            <div className="flex flex-col">
                                <label className='text-sm text-[#198A83]'>Valor Final:</label>
                                    <input 
                                    type="text" 
                                    disabled/* readOnly */
                                    className='w-60 h-9 p-2 bg-[#46b0a9] text-white  rounded-md text-lg'
                                    value={""}  
                                    />
                            </div>
                            
                        </div>


                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label className='text-sm text-[#198A83]'>Tipo de Pagamento:</label>
                                <select 
                                id='tags' 
                                name='tags' 
                                className="w-60 h-9 p-1 bg-[#3BDCD2] text-[#198A83] rounded-md">
                                    <option value="money">Dinheiro</option>
                                    <option value="pix">PIX</option>
                                    <option value="debito">Debito</option>
                                    <option value="credito">Credito</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </div>


                            {/* Pagamento em dinheiro */}
                            <div className="flex flex-col p-2 gap-3 bg-[#CBFCF6] rounded-md">
                                <div className="flex flex-col">
                                    <label className='text-sm text-[#198A83]'>Valor Recebido:</label>
                                        <input 
                                        type="number" 
                                        className='w-60 h-9 p-2 bg-[#3BDCD2] text-[#198A83]  rounded-md'
                                        min={0}
                                        />
                                </div>
                                <div className="flex flex-col">
                                <label className='text-sm text-[#198A83]'>Troco:</label>
                                    <input 
                                    type="text" 
                                    disabled/* readOnly */
                                    className='w-60 h-9 p-2 bg-[#46b0a9] text-white  rounded-md text-lg'
                                    value={""}  
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between gap-2">
                                <button
                                onClick={closeModal} // Fecha o modal
                                className="bg-red-500 text-white py-2 px-4 rounded-md"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                    closeModal();
                                    alert("Venda finalizada com sucesso!"); // Exemplo de ação final
                                    }}
                                    className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
                                >
                                    Confirmar
                                </button>
                            </div>

                        </div>
                        
                        
                        {/* <h2 className="text-lg font-bold text-[#198A83] mb-4">
                        Confirmação
                        </h2>
                        <p className="text-gray-700 text-center mb-4">
                        Deseja realmente finalizar a venda no valor de{" "}
                        <span className="font-bold">R$ {totalValue.toFixed(2)}</span>?
                        </p>
                        <div className="flex gap-4">
                        <button
                            onClick={closeModal} // Fecha o modal
                            className="bg-red-500 text-white py-2 px-4 rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                            closeModal();
                            alert("Venda finalizada com sucesso!"); // Exemplo de ação final
                            }}
                            className="bg-green-500 text-white py-2 px-4 rounded-md"
                        >
                            Confirmar
                        </button>
                        </div> */}

                    </div>
                </div>
            )}
        </div>
    )
}