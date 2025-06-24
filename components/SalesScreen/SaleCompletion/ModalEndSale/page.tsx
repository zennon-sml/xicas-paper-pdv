import { useState } from "react";
import { createSale } from "@/app/services/salesService";
import { updateProductById, getProductById } from "@/app/services/productService";

import { ProductSold } from "@/app/interfaces/product";

// Props para o ModalEndSale
interface ModalEndSaleProps {
    showModal: boolean;
    totalValue: number;
    productsList: ProductSold[];
    closeModal: () => void;
}

export default function ModalEndSale({showModal, totalValue, productsList, closeModal}:ModalEndSaleProps){
    const [discountType, setDiscountType] = useState<string>("valor") // tipo de desconto "valor" ou "porcentagem"
    const [discountTotal, setDiscountTotal] = useState<number>(0) // Valor de desconto calculado
    const [discountValue, setDiscountValue] = useState<number>(0) // Valor digitado no campo de desconto
    const [moneyReceived, setMoneyReceived] = useState<number>(0) // Valor em dinheiro pago

    const handleDiscount = (e:number) => { // Calcula o valor de desconto e "zera" os campos caso o tipo de desconto seja alterado
        let discount = 0;
        if (discountType === "valor"){
            discount = e;
        }
        else {
            discount = ((totalValue*e)/100)
        }
        setDiscountTotal(discount) 
        setDiscountValue(e)
    }

    const closeSale = async (event:string) => {
        if (event === "confirm"){
            try {
                await createSale(productsList)
                console.log("lista de produtos", productsList);
                
                // Atualiza o estoque dos produtos vendidos
                for (const item of productsList) {
                    const productData = await getProductById(item.id ?? 0);
                    await updateProductById(productData.id, {
                        ...productData,
                        ["quantity"]: productData.quantity - item.quantity_sold, // Subtrai a quantidade vendida do estoque
                    });
                    //setProduct(productToUpdate);
                }
                


            } catch (error) {
                console.error("Erro ao finalizar a venda:", error);
            }
        }
        setDiscountType("valor")
        setDiscountTotal(0)
        setDiscountValue(0)
        setMoneyReceived(0)
        closeModal()
    }

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
                                    value={totalValue.toFixed(2)}  
                                    />
                            </div>
                            <div className="flex flex-col">
                                <label className='text-sm text-[#198A83]'>Tipo Desconto:</label>
                                <select 
                                onChange={(e) => {
                                    setDiscountType(e.target.value)                                   
                                    handleDiscount(0)
                                }}
                                id='tags' 
                                name='tags' 
                                className="w-60 h-9 p-1 bg-[#3BDCD2] text-[#198A83] rounded-md">
                                    <option value="valor">Valor (R$)</option>
                                    <option value="porcentagem">Porcentagem (%)</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className='text-sm text-[#198A83]'>Total Desconto: <label className="font-semibold">{(discountTotal).toFixed(2)}</label></label>
                                    <input 
                                    onChange={(e) => handleDiscount(Number(e.target.value))}
                                    value={
                                        discountValue === 0
                                        ? ""
                                        : discountValue
                                    }
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
                                    value={(totalValue-discountTotal).toFixed(2)}  
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
                                    {/* <option value="pix">PIX</option>
                                    <option value="debito">Debito</option>
                                    <option value="credito">Credito</option>
                                    <option value="outro">Outro</option> */}
                                </select>
                            </div>


                            {/* Pagamento em dinheiro */}
                            <div className="flex flex-col p-2 gap-3 bg-[#CBFCF6] rounded-md">
                                <div className="flex flex-col">
                                    <label className='text-sm text-[#198A83]'>Valor Recebido:</label>
                                    <input 
                                    onChange={(e) => setMoneyReceived(Number(e.target.value))}
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
                                    value={
                                        moneyReceived-(totalValue-discountTotal) <= 0
                                        ? ""
                                        : (moneyReceived-(totalValue-discountTotal)).toFixed(2)
                                    }  
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between gap-2">
                                <button
                                onClick={() => closeSale("cancel")} // Fecha o modal
                                className="bg-[#FE3F3F] text-white py-2 px-4 rounded-md
                                hover:bg-[#a12828]"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        closeSale("confirm")
                                    }}
                                    className="bg-[#59cf5d] text-white py-2 px-4 rounded-md w-full
                                    hover:bg-[#319034]"
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