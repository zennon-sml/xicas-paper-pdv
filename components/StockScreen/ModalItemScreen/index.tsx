import { useEffect, useState } from "react";
import { createProduct, getProductById, updateProductById } from "@/app/services/productService";

import { Product } from "@/app/interfaces/product";

interface ModalItemProps {
    idProduct: number;
    showModal: boolean;
    closeModal: () => void;
}

const lista = [
    ""
]
export default function ModalItemScreen({idProduct, showModal, closeModal}:ModalItemProps) {
    const [product, setProduct] = useState<Product | undefined>(undefined)

    useEffect(() => {
        const fetchProductById = async (id:number) => {

            try{
                if (id !== 0){
                    const productData = await getProductById(id);
                    if (productData) {
                        //console.log("Produto encontrado", productData);
                        setProduct(productData)
                    }
                }
 
            } catch (error){
                console.log("Erro na requisição:", error) // Trata erros
            }
        };
        fetchProductById(idProduct)
    }, [showModal])

    const completionModal = async (value:string) => { // O que vai acontecer quando clicar em conluir
        console.log(idProduct)
        if (value === "confirmar"){
            if (idProduct === 0){ // Produto Novo
                await createProduct(product)
                alert("Produto cadastrado com sucesso!"); // Exemplo de ação final
            }
            else{ // Atualização
                await updateProductById(product?.id, product)
                alert("Produto atualizado com sucesso!")
            }
        }
        closeModal();
        await new Promise((resolve) => setTimeout(resolve, 100));
        setProduct(undefined)
    }

    const updateProduct = (key: keyof Product, value: string | number) => { // Atualiza o UseState do produto, com as atualizações feitas pelo usuario
        setProduct({
            ...product,
            [key]: value
        } as Product)
        //console.log(product)
    }

    const handleImageChange = (type:string, file: any) => {
        if (file) {
            const reader = new FileReader()
            // Quando a leitura da imagem estiver concluída, armazenamos o resultado
            reader.onloadend = () => {
                updateProduct("image", reader.result as string)
                // console.log(reader.result) // Atualiza o estado com a URL da imagem
            }
            reader.readAsDataURL(file) // Converte a imagem para uma URL
        }
        
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
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-3">
                                <div className="flex border border-[#81f7ef] rounded-md overflow-hidden">
                                    <div className="flex bg-white h-36 overflow-hidden">
                                        <img 
                                        alt="img-vazia" 
                                        src={product?.image}
                                        className='bg-[#ffffff] p-1 object-contain object-center'/>
                                    </div>

                                    <div className="flex flex-col overflow-auto h-36 border border-l-[#81f7ef]">
                                        <button 
                                            className=" flex w-10 h-10 bg-lime-500 items-center justify-center hover:bg-lime-700"
                                            onClick={() => document.getElementById('image-upload')?.click()}
                                        >
                                            +
                                        </button>

                                        {/* Input de arquivo escondido */}
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*" // Aceita apenas imagens
                                            style={{ display: "none" }} // Esconde o input
                                            onChange={(e) => handleImageChange("image" ,e.target.files?.[0])}
                                        />

                                        {lista.map((image, i) =>
                                            <img 
                                                className="bg-[#ffffff] w-10 h-10 p-1 object-contain object-center" 
                                                src={image} 
                                                key={i} 
                                                alt={`imagem ${i}`} />
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-1">
                                    <div className="flex gap-1">
                                        <div className="flex flex-col">
                                            <label className='text-xs text-[#198A83]'>Nome do Produto:</label>
                                            <input 
                                            type="text" 
                                            value={product?.name}
                                            onChange={(e) => updateProduct("name", e.target.value)}
                                            className='w-96 h-8 p-2 bg-[#b8f5ee] text-[#198A83]  rounded-md text-sm'
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className='text-xs text-[#198A83]'>ID:</label>
                                            <input 
                                            type="text" 
                                            value={idProduct === 0 ? "" : idProduct}
                                            disabled
                                            className='w-28 h-8 p-2 bg-[#46b0a9] text-white  rounded-md text-sm'
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className='text-xs text-[#198A83]'>Cod. de Barras:</label>
                                        <input 
                                        type="text" 
                                        value={product?.barcode}
                                        onChange={(e) => updateProduct("barcode", e.target.value)}
                                        className='h-8 p-2 bg-[#b8f5ee] text-[#198A83] rounded-md text-sm'
                                        />
                                    </div>
                                    
                                    <div className="flex gap-1 justify-between">
                                        <div className="flex flex-col">
                                            <label className='text-xs text-[#198A83]'>Quantidade:</label>
                                                <input 
                                                type="number" 
                                                value={product?.qtd}
                                                onChange={(e) => updateProduct("qtd", e.target.value)}
                                                className='max-w-40 h-8 p-2 bg-[#b8f5ee] text-[#198A83] text-sm rounded-md'
                                                min={0}
                                                />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className='text-xs text-[#198A83]'>Custo Unit.:</label>
                                                <input 
                                                type="number" 
                                                value={product?.cost}
                                                onChange={(e) => updateProduct("cost", e.target.value)}
                                                className='min-w-40 h-8 p-2 bg-[#b8f5ee] text-[#198A83] text-sm rounded-md'
                                                min={0}
                                                />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className='text-xs text-[#198A83]'>Custo Total:</label>
                                                <input 
                                                disabled
                                                type="number" 
                                                
                                                className='max-w-40 h-8 p-2 bg-[#46b0a9] text-white  text-sm rounded-md'
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
                                    value={product?.description}
                                    onChange={(e) => updateProduct("description", e.target.value)}
                                    className='flex min-w-[554px] h-16 p-2 bg-[#b8f5ee] text-[#198A83] rounded-md text-sm'
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className='text-xs text-[#198A83]'>Tags:</label>
                                    <textarea 
                                    value={product?.tags}
                                    onChange={(e) => updateProduct("tags", e.target.value)}
                                    className='h-16 max-w-44 p-2 bg-[#b8f5ee] text-[#198A83] rounded-md text-sm'
                                    />
                                </div>
                            </div>   
                            <div className="flex gap-1 ">
                                <div className="flex flex-col">
                                    <label className='text-xs text-[#198A83]'>Valor de Venda:</label>
                                    <input
                                    min={0}
                                    type="number"
                                    value={product?.price}
                                    onChange={(e) => updateProduct("price", e.target.value)}
                                    className='h-10 max-w-44 p-2 bg-[#61e0d8] text-[#198A83] rounded-md text-sm'
                                    />
                                </div>
                                
                                <button
                                onClick={() => completionModal("cancelar")} // Fecha o modal
                                className="bg-red-500 text-white py-2 px-4 rounded-md"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={() => completionModal("confirmar")}
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