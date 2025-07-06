import { useState, useEffect } from "react";
import { createSale } from "@/app/services/salesService";
import { updateProductById, getProductById } from "@/app/services/productService";

import { ProductSold, Payment, GeneralSale } from "@/app/interfaces/product";

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
    const [payment, setPayment] = useState<Payment>({money: 0, pix: 0, debit: 0, credit: 0, other: 0}) // Tipo de pagamento escolhido
    const [paymentType, setPaymentType] = useState<string>("money") // Tipo de pagamento selecionado
    const [shouldFinishSale, setShouldFinishSale] = useState<boolean>(false); // Estado para finalizar a venda

    const missingValue = Object.values(payment).reduce((acc, val) => acc + val, 0);
    //const missingValue = (totalValue - discountTotal); // Valor que falta para completar o pagamento
    
    
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

    const handlePayment = (key:string, value:number) => { // Atualiza o estado do pagamento com o valor recebido
        setPayment({
            ...payment,
            [key]: value,
        } as Payment);
    }

    const handleTypePayment = (e:string) => { // Atualiza o tipo de pagamento selecionado
        setPaymentType(e);
    }


    useEffect(() => {
        const finalizeSale = async () => {
            try {
                await createSale({
                    products: productsList,
                    paymentTypes: payment, 
                    generalDiscount: discountTotal
            } as GeneralSale); // Envia os dados da venda para o backend

                for (const item of productsList) {
                    const productData = await getProductById(item.id ?? 0);
                    await updateProductById(productData.id, {
                        ...productData,
                        quantity: productData.quantity - item.quantity_sold,
                    });
                }

                console.log("Finalizando venda com payment:", payment);
                closeModal();
                resetProps();
            } catch (error) {
                console.error("Erro ao finalizar a venda:", error);
            } finally {
                setShouldFinishSale(false); // reseta flag
            }
        };

        if (shouldFinishSale) {
            finalizeSale();
        }
    }, [shouldFinishSale, payment]); // observa `shouldFinishSale` e `payment`


    const closeSale = (event: string) => {
    if (event === "confirm") {
        if ((missingValue + (moneyReceived - (totalValue - discountTotal))) < 0) {
            handlePayment(paymentType, moneyReceived);
            setMoneyReceived(0);
        } else {
            handlePayment(paymentType, moneyReceived); // Atualiza o payment
            setShouldFinishSale(true); // Ativa o gatilho para o useEffect
        }
    } else if (event === "cancel") {
        alert("Venda cancelada");
        closeModal();
        resetProps();
    }
};

    const resetProps = () => { // Reseta os estados do modal
        setDiscountTotal(0);
        setDiscountValue(0); // Reseta o valor do desconto digitado
        setMoneyReceived(0); // Reseta o valor recebido
        setPayment({money: 0, pix: 0, debit: 0, credit: 0, other: 0}); // Reseta o estado do pagamento
        setPaymentType("money"); // Reseta o tipo de pagamento selecionado
        setDiscountType("valor"); // Reseta o tipo de desconto para "valor"
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


                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col">
                                <label className='text-sm text-[#198A83]'>Tipo de Pagamento:</label>
                                <select 
                                id='tags' 
                                name='tags'
                                onChange={(e) => {
                                    handleTypePayment(e.target.value);
                                    
                                }}
                                className="w-60 h-9 p-1 bg-[#3BDCD2] text-[#198A83] rounded-md">
                                    <option value="money">Dinheiro</option>
                                    <option value="pix">PIX</option>
                                    <option value="debit">Debito</option>
                                    <option value="credit">Credito</option>
                                    <option value="other">Outro</option> 
                                </select>
                            </div>


                            {/* Pagamento em dinheiro */}
                            <div className="flex flex-col">

                                <div className="flex flex-col p-2 gap-3 bg-[#CBFCF6] rounded-md">
                                    <div className="flex flex-col">
                                        <label className='text-sm text-[#198A83]'>Valor Recebido:</label>
                                        <input 
                                        onChange={(e) => setMoneyReceived(Number(e.target.value))}
                                        value={moneyReceived === 0 ? "" : moneyReceived}
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
                                        className={`w-60 h-9 p-2 bg-[#46b0a9] rounded-md text-lg ${
                                            missingValue+(moneyReceived-(totalValue - discountTotal)) < 0 ? ' text-red-500 border-2 border-red-500' : 'text-white'
                                        }`}
                                        value={
                                            missingValue+(moneyReceived-(totalValue - discountTotal))
                                        }  
                                        />
                                    </div>
                                </div>

                                {/* Exibe todas as formas de pagamento escolhidos na venda */}        
                                <div className="flex gap-2">
                                    {payment.money > 0 && (
                                        <div>
                                        <label className="text-xs text-[#198A83]">Din: </label>
                                        <input
                                            type="text"
                                            disabled
                                            value={payment.money}
                                            className="h-2 w-14 p-2 bg-[#46b0a9] text-xs text-white rounded-md"
                                        />
                                        </div>
                                    )}
                                    {payment.pix > 0 && (
                                        <div>
                                            <label className="text-xs text-[#198A83]">Pix: </label>
                                            <input
                                            type="text"
                                            disabled
                                            value={payment.pix}
                                            className="h-2 w-14 p-2 bg-[#46b0a9] text-xs text-white rounded-md"
                                            />
                                        </div>
                                    )}
                                    {payment.debit > 0 && (
                                        <div>
                                            <label className="text-xs text-[#198A83]">Deb: </label>
                                            <input
                                            type="text"
                                            disabled
                                            value={payment.debit}
                                            className="h-2 w-14 p-2 bg-[#46b0a9] text-xs text-white rounded-md"
                                            />
                                        </div>
                                    )}
                                    {payment.credit > 0 && (
                                        <div>
                                            <label className="text-xs text-[#198A83]">Cred: </label>
                                            <input
                                            type="text"
                                            disabled
                                            value={payment.credit}
                                            className="h-2 w-14 p-2 bg-[#46b0a9] text-xs text-white rounded-md"
                                            />
                                        </div>
                                    )}
                                    {payment.other > 0 && (
                                        <div>
                                            <label className="text-xs text-[#198A83]">Outro: </label>
                                            <input
                                            type="text"
                                            disabled
                                            value={payment.other}
                                            className="h-2 w-14 p-2 bg-[#46b0a9] text-xs text-white rounded-md"
                                            />
                                        </div>
                                    )}
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
                                    closeSale("confirm");
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