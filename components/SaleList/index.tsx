const venda = [
    {item: 1, name: 'vagalume atômico', qtd: 10, pUnit: 10.00},
    {item: 2, name: 'vagalume ocimota', qtd: 5, pUnit: 5.00},
    {item: 3, name: 'besouro elétrico', qtd: 8, pUnit: 7.50},
    {item: 4, name: 'borboleta solar', qtd: 15, pUnit: 3.00},
    {item: 5, name: 'grilo gigante', qtd: 12, pUnit: 6.25},
    {item: 6, name: 'formiga robótica', qtd: 20, pUnit: 4.75},
    {item: 7, name: 'mosca invisível', qtd: 10, pUnit: 8.00},
    {item: 8, name: 'aranha de aço', qtd: 6, pUnit: 9.50},
    {item: 9, name: 'abelha turbo', qtd: 18, pUnit: 2.25},
    {item: 10, name: 'joaninha blindada', qtd: 7, pUnit: 12.00},
    {item: 11, name: 'libélula supersônica', qtd: 13, pUnit: 6.80},
    {item: 12, name: 'cigarra vibrante', qtd: 9, pUnit: 5.60},
    {item: 13, name: 'mosquito laser', qtd: 16, pUnit: 4.90},
    {item: 14, name: 'escorpião mecânico', qtd: 8, pUnit: 11.00},
    {item: 15, name: 'cupim trator', qtd: 5, pUnit: 10.50},
    {item: 16, name: 'gafanhoto saltador', qtd: 14, pUnit: 3.75},
    {item: 17, name: 'louva-a-deus espectral', qtd: 12, pUnit: 7.25},
    {item: 18, name: 'vespa de fogo', qtd: 10, pUnit: 9.90},
    {item: 19, name: 'mariposa fantasma', qtd: 11, pUnit: 4.35},
    {item: 20, name: 'caranguejeira de ferro', qtd: 6, pUnit: 15.00},
    {item: 21, name: 'cascudo blindado', qtd: 13, pUnit: 5.20},
    {item: 22, name: 'louva-a-deus de titânio', qtd: 8, pUnit: 8.10},
    {item: 23, name: 'cigarra de choque', qtd: 14, pUnit: 6.40},
    {item: 24, name: 'formiga de aço', qtd: 9, pUnit: 5.50},
    {item: 25, name: 'aranha laser', qtd: 11, pUnit: 10.20},
    {item: 26, name: 'besouro foguete', qtd: 6, pUnit: 9.00},
    {item: 27, name: 'gafanhoto turbo', qtd: 15, pUnit: 4.10},
    {item: 28, name: 'abelha de prata', qtd: 12, pUnit: 7.80},
    {item: 29, name: 'mosca robótica', qtd: 17, pUnit: 3.25},
    {item: 30, name: 'vespa invisível', qtd: 10, pUnit: 6.90},
    {item: 31, name: 'grilo explosivo', qtd: 14, pUnit: 5.75},
    {item: 32, name: 'joaninha de fogo', qtd: 7, pUnit: 11.00},
    {item: 33, name: 'mosquito supersônico', qtd: 16, pUnit: 6.50},
    {item: 34, name: 'borboleta de cristal', qtd: 12, pUnit: 4.20},
    {item: 35, name: 'louva-a-deus de plasma', qtd: 9, pUnit: 8.75},
    {item: 36, name: 'escorpião fantasma', qtd: 13, pUnit: 7.40},
    {item: 37, name: 'mariposa de aço', qtd: 11, pUnit: 5.90},
    {item: 38, name: 'cupim blindado', qtd: 18, pUnit: 6.30},
    {item: 39, name: 'abelha explosiva', qtd: 10, pUnit: 7.15},
    {item: 40, name: 'formiga turbo', qtd: 8, pUnit: 9.60}
];


export default function SaleList(){
    return(
        <div className='flex flex-col w-full bg-[#B8FFF7] border border-[#5CC5BE] rounded-md overflow-hidden flex-grow'>
            <h2 className="bg-[#28A9A1] font-bold text-white text-center">LISTA DE VENDAS</h2>
            <div className="overflow-auto">    
                <table className='table-fixed w-full'>
                    <thead className='bg-[#5CC5BE] border-0 sticky top-0'>
                        <tr className="border-2 border-[#5CC5BE] text-xs text-white">
                            <th className=" w-1/12">Item</th>
                            <th className=" w-5/12">Produto</th>
                            <th className=" w-1/12">Qtd</th>
                            <th className=" w-2/12">P.Unit</th>
                            <th className=" w-3/12">Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#B8FFF7] text-xs flex-grow overflow-auto">
                        {venda.map((product) => (
                            <tr className="border-b border-b-[#5CC5BE]" key={product.item}>
                                <td className="pl-1 pr-1 text-[#135550] border-r-2 border-r-[#5cc5be] font-bold text-center">{product.item}</td>
                                <td className="pl-1 pr-1 text-[#135550] border-r-2 border-r-[#5CC5BE]">{product.name}</td>
                                <td className="pl-1 pr-1 text-[#135550] border-r-2 border-r-[#5CC5BE] text-center">{product.qtd}</td>
                                <td className="pl-1 pr-1 text-[#135550] border-r-2 border-r-[#5CC5BE]">{"R$ "+(product.pUnit).toFixed(2)}</td>
                                <td className="pl-1 pr-1 text-[#135550] border-l-2 border-l-[#5CC5BE] font-bold">{"R$ "+(product.qtd*product.pUnit).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>            
        </div>
    )
}