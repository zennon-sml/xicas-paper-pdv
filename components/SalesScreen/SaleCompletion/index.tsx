import { useState, useEffect } from "react";
import ModalEndSale from "./ModalEndSale/page";

interface IItensList {
  id: number;
  name: string;
  qtd: number;
  pUnit: number;
  desconto: string;
}

export default function SaleCompletion({
  props,
  resetProps,
}: {
  props: IItensList[];
  resetProps: () => void;
}) {
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalQtd, setTotalQtd] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  console.log(props);

  useEffect(() => {
    if (props.length > 0) {
      const prop = props[props.length - 1];

      setTotalQtd((prev) => prev + prop.qtd);
      setTotalDiscount((prev) => prev + Number(prop.desconto));
      setTotalValue((prev) => prev + (prop.qtd * prop.pUnit - Number(prop.desconto)));
    }
  }, [props]);

  const handleFinalizeSale = async () => {
    if (props.length === 0) {
      alert("Sua venda está vazia");
      return;
    }else{
      setShowModal(true);
    }

    // try {
    //   const admin_id = 1; // admin padrão

    //   await Promise.all(
    //     props.map(async (item) => {
    //       const saleData = {
    //         product_id: item.id,
    //         admin_id,
    //         quantity: item.qtd,
    //       };

    //       const response = await fetch("http://localhost:5000/api/sales", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(saleData),
    //       });

    //       if (!response.ok) {
    //         throw new Error(`Erro ao vender ${item.name}`);
    //       }
    //     })
    //   );

    //   setShowModal(true);
    // } catch (error: any) {
    //   alert(error.message || "Erro ao finalizar venda");
    // }
  };

  const closeModal = () => {
    setTotalValue(0);
    setTotalQtd(0);
    setTotalDiscount(0);
    resetProps();
    setShowModal(false);
  };

  return (
    <div className="flex justify-between ml-7 mt-3 mb-7">
      <div className="flex gap-2">
        <div className="flex flex-col">
          <label className="text-sm text-[#198A83]">Total Itens</label>
          <input
            disabled
            value={totalQtd}
            type="text"
            className="border-2 border-[#28A9A1] rounded-md w-28 h-12 text-center"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-[#198A83]">Total Desconto</label>
          <input
            disabled
            value={"R$ " + totalDiscount.toFixed(2)}
            type="text"
            className="border-2 border-[#28A9A1] rounded-md w-28 h-12 text-center"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-[#198A83]">Sub. Total</label>
          <input
            disabled
            value={"R$ " + totalValue.toFixed(2)}
            type="text"
            className="border-2 border-[#28A9A1] rounded-md w-40 h-12 text-center"
          />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={closeModal}
          className="bg-[#FE3F3F] text-white font-bold w-28 h-12 rounded-md hover:bg-[#af2c2c]"
        >
          CANCELAR
        </button>

        <button
          onClick={handleFinalizeSale}
          className="bg-[#59cf5d] text-white font-bold w-40 h-12 rounded-md hover:bg-[#29782c]"
        >
          FINALIZAR VENDA
        </button>

        <ModalEndSale showModal={showModal} totalValue={totalValue} productsList={props} closeModal={closeModal} />
      </div>
    </div>
  );
}
