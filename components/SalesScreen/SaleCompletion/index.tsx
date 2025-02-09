import { useState, useEffect } from "react";
import ModalEndSale from "./ModalEndSale/page";

interface ITotals{
    qtd: number;
    pUnit: number;
    desconto: string;
  }

export default function SaleCompletion({props, resetProps}:{ props: ITotals[]; resetProps: () => void }){
    const [totalValue, setTotalValue] = useState<number>(0)
    const [totalQtd, setTotalQtd] = useState<number>(0)
    const [totalDiscount, setTotalDiscount] = useState<number>(0)

    const [showModal, setShowModal] = useState<boolean>(false);

   /*  const addProductList = (item:IItensList) => {
        setItens((prevProducts) => [...prevProducts, item]);
        setSelectedProduct({name:"", value:0, image:""})
      } */

    useEffect(() => { // useEffect vai exectar  algoritmo sempre que "props" for atualizado, 
        if (props.length > 0){
            const prop = props[props.length-1] // Isolando o ultimo item adicionado

            const qtd = prop.qtd
            setTotalQtd(totalQtd + qtd) // atualiza a quantidade total

            const discount = Number(prop.desconto)
            setTotalDiscount(totalDiscount+discount) // atualiza o desconto total

            const total = (qtd*prop.pUnit) - discount
            setTotalValue(totalValue+total) // atualiza o valor total
        }
    }, [props])

    //Para finalizar venda
    const handleFinalizeSale = () => { 
        setShowModal(true); //Exibe o modal
    }

    // Função para fechar o modal
    const closeModal = () => {
        
        setTotalValue(0)
        setTotalQtd(0)
        setTotalDiscount(0)
        resetProps()
        
        setShowModal(false); //Fecha modal
    }

    return(
        <div className="flex justify-between ml-7 mt-3 mb-7">
            <div className="flex gap-2">
                <div className="flex flex-col">
                    <label className="text-sm text-[#198A83]">Total Itens</label>
                    <input 
                    disabled 
                    value={totalQtd}
                    type="text" 
                    placeholder="Tt. Itens" 
                    className="border-2 border-[#28A9A1] rounded-md w-28 h-12 text-center" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-[#198A83]">Total Desconto</label>
                    <input 
                    disabled
                    value={"R$ "+totalDiscount.toFixed(2)}
                    type="text" 
                    placeholder="Tt. Desconto" 
                    className="border-2 border-[#28A9A1] rounded-md w-28 h-12 text-center" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-[#198A83]">Sub. Total</label>
                    <input 
                    disabled 
                    value = {"R$ "+totalValue.toFixed(2)}
                    type="text" 
                    placeholder="Sub Total" 
                    className="border-2 border-[#28A9A1] rounded-md w-40 h-12 text-center"/>
                </div>
            </div>

            <div className="flex gap-2 items-center">
                <button 
                className="
                bg-[#FE3F3F] text-white font-bold
                w-28 h-9 rounded-md"
                >CANCELAR</button>

                <button 
                onClick={handleFinalizeSale}
                className=" 
                bg-[#1DB935] text-white font-bold
                w-40 h-12 rounded-md"
                >FINALIZAR VENDA</button>

                {/* Modal */}
                <ModalEndSale showModal={showModal} totalValue={totalValue} closeModal={closeModal} />

            </div>
        </div>
    )
}