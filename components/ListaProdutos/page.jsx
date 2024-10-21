import './ListaProdutos.css'
import { IoMdSearch } from "react-icons/io";
import ItemLista from './ItemLista/page';

export default function ListaProdutos(){

    const data = [
        {
            id: 1,
            name: 'vaquinha',
            valor: 10.00
        },
        {
            id: 2,
            name: 'cavalinho loko',
            valor: 20.00
        },
        {
            id: 3,
            name: 'buraco preto',
            valor: 30.00
        },
        {
            id: 4,
            name: 'buraco branco',
            valor: 30.00
        },
        {
            id: 5,
            name: 'macaco mecanico',
            valor: 30.00
        },
        {
            id: 6,
            name: 'ovelha negra',
            valor: 30.00
        },
        {
            id: 7,
            name: 'jabuti atomico',
            valor: 30.00
        },
        {
            id: 8,
            name: 'juvenal tatu',
            valor: 30.00
        },
        {
            id: 7,
            name: 'kayblack cratudo',
            valor: 30.00
        },{
            id: 8,
            name: 'juazeiro do norte',
            valor: 30.00
        },{
            id: 7,
            name: 'buraco preto',
            valor: 30.00
        },{
            id: 7,
            name: 'buraco preto',
            valor: 30.00
        },{
            id: 7,
            name: 'buraco preto',
            valor: 30.00
        },
    ];
    

  return (
    <div>
        <h1>Lista de Produtos</h1>
        <div className='lista-produtos'>
            <div id='topo-lista'>
                <input type="text" placeholder='Digite o produto...' />
                <button><IoMdSearch /></button>
            </div>
            <div>
                <ul>
                    {data.map(prod => (
                        <ItemLista 
                            key={prod.id}
                            name={prod.name}
                            valor={prod.valor}
                        />
                    ))}
                    
                </ul>
            </div>
        </div>
    </div>
  )
}
