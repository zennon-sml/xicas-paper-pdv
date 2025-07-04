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
        if (value === "confirmar"){
            if (idProduct === 0){ // Produto Novo
                if (product) {
                    await createProduct(product)
                    alert("Produto cadastrado com sucesso! "); // Exemplo de ação final
                } else {
                    alert("Produto inválido. Não foi possível cadastrar.");
                }
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

    const handleImageChange = (type: string, file: File | undefined) => {
    // Verifica se um arquivo foi selecionado
        if (file) {
            const reader = new FileReader(); 
            // Cria um leitor de arquivos do navegador

            reader.readAsDataURL(file); 
            // Lê o arquivo e converte em uma URL base64

            reader.onload = (event) => { 
                // Quando a leitura do arquivo terminar, executa essa função

                const img = new Image(); 
                // Cria um novo elemento de imagem na memória

                img.src = event.target?.result as string; 
                // Define o src da imagem com o base64 gerado pelo FileReader

                img.onload = () => { 
                    // Quando a imagem estiver carregada na memória, executa isso

                    const canvas = document.createElement("canvas"); 
                    // Cria um elemento canvas (não aparece na tela, usado só na memória para processar a imagem)

                    const maxWidth = 400; // Largura máxima desejada
                    const maxHeight = 400; // Altura máxima desejada

                    let width = img.width; // Pega a largura original da imagem
                    let height = img.height; // Pega a altura original da imagem

                    // ⚖️ Mantém a proporção da imagem original
                    if (width > height) { 
                        // Se a largura for maior que a altura (imagem na horizontal)
                        if (width > maxWidth) {
                            height *= maxWidth / width; // Reduz altura proporcionalmente
                            width = maxWidth; // Define a nova largura
                        }
                    } else { 
                        // Caso contrário (imagem na vertical ou quadrada)
                        if (height > maxHeight) {
                            width *= maxHeight / height; // Reduz largura proporcionalmente
                            height = maxHeight; // Define a nova altura
                        }
                    }

                    // Define o tamanho final do canvas (já redimensionado)
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext("2d"); 
                    // Obtém o contexto 2D do canvas (permite desenhar nele)

                    ctx?.drawImage(img, 0, 0, width, height); 
                    // Desenha a imagem dentro do canvas, já no tamanho reduzido

                    // Gera uma imagem no formato JPEG, reduzindo a qualidade (0.7 = 70%)
                    const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7); 

                    // Atualiza o estado do produto com a imagem já comprimida
                    updateProduct("image", compressedDataUrl);

                    // Loga no console o tamanho da imagem comprimida (em KB)
                    console.log("Imagem comprimida:", compressedDataUrl.length / 1024, "KB");
                };
            };
        }
    };

    
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
                                    <div className="flex bg-white h-36 w-36 overflow-hidden">
                                        <img 
                                        alt="img-vazia" 
                                        src={product?.image}
                                        className='bg-[#ffffff] p-1 object-contain object-center'/>
                                    </div>

                                    <div className="flex flex-col overflow-auto border border-l-[#81f7ef]">
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
                                                value={Number(product?.quantity).toFixed(0)}
                                                onChange={(e) => updateProduct("quantity", Number(e.target.value))}
                                                className='max-w-40 h-8 p-2 bg-[#b8f5ee] text-[#198A83] text-sm rounded-md'
                                                min={0}
                                                />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className='text-xs text-[#198A83]'>Custo Unit. (R$):</label>
                                                <input 
                                                type="number" 
                                                value={Number(product?.cost)}
                                                onChange={(e) => updateProduct("cost", Number(e.target.value))}
                                                className='min-w-40 h-8 p-2 bg-[#b8f5ee] text-[#198A83] text-sm rounded-md'
                                                min={0}
                                                />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className='text-xs text-[#198A83]'>Custo Total (R$):</label>
                                                <input 
                                                disabled
                                                type="number" 
                                                value={(Number(product?.quantity) * Number(product?.cost)).toFixed(2)}
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
                                    <label className='text-xs text-[#198A83]'>Valor de Venda (Preço):</label>
                                    <input
                                    min={0}
                                    type="number"
                                    value={product?.price}
                                    onChange={(e) => updateProduct("price", Number(e.target.value))}
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