import { IoMdSearch } from "react-icons/io";
import ItemList from './ItemList/page';

interface Item {
    id: number;
    name: string;
    value: number;
    image?: string;
  }

const products = [
  { id: 1, name: 'Apple iPhone 13', value: 799.99, image: 'https://images.app.goo.gl/dABttVzkbYf89uxU7' },
  { id: 2, name: 'Samsung Galaxy S21', value: 699.99, image: 'https://example.com/galaxys21.jpg' },
  { id: 3, name: 'Sony WH-1000XM4 Headphones', value: 349.99, image: 'https://example.com/sony-headphones.jpg' },
  { id: 4, name: 'Dell XPS 13 Laptop', value: 999.99, image: 'https://example.com/dellxps13.jpg' },
  { id: 5, name: 'Nintendo Switch', value: 299.99, image: 'https://example.com/nintendo-switch.jpg' },
  { id: 6, name: 'Apple MacBook Air', value: 1099.99, image: 'https://example.com/macbookair.jpg' },
  { id: 7, name: 'Sony PlayStation 5', value: 499.99, image: 'https://example.com/ps5.jpg' },
  { id: 8, name: 'Bose SoundLink Bluetooth Speaker', value: 129.99, image: 'https://example.com/bose-speaker.jpg' },
  { id: 9, name: 'Fitbit Charge 4', value: 149.99, image: 'https://example.com/fitbit.jpg' },
  { id: 10, name: 'Dyson V11 Vacuum Cleaner', value: 599.99, image: 'https://example.com/dyson-v11.jpg' },
  { id: 11, name: 'Apple iPhone 13', value: 799.99, image: 'https://example.com/iphone13.jpg' },
  { id: 12, name: 'Samsung Galaxy S21', value: 699.99, image: 'https://example.com/galaxys21.jpg' },
  { id: 13, name: 'Sony WH-1000XM4 Headphones', value: 349.99, image: 'https://example.com/sony-headphones.jpg' },
  { id: 14, name: 'Dell XPS 13 Laptop', value: 999.99, image: 'https://example.com/dellxps13.jpg' },
  { id: 15, name: 'Nintendo Switch', value: 299.99, image: 'https://example.com/nintendo-switch.jpg' },
  { id: 16, name: 'Apple MacBook Air', value: 1099.99, image: 'https://example.com/macbookair.jpg' },
  { id: 17, name: 'Sony PlayStation 5', value: 499.99, image: 'https://example.com/ps5.jpg' },
  { id: 18, name: 'Bose SoundLink Bluetooth Speaker', value: 129.99, image: 'https://example.com/bose-speaker.jpg' },
  { id: 19, name: 'Fitbit Charge 4', value: 149.99, image: 'https://example.com/fitbit.jpg' },
  { id: 20, name: 'Dyson V11 Vacuum Cleaner', value: 599.99, image: 'https://example.com/dyson-v11.jpg' },
  { id: 21, name: 'Dyson V11 Vacuum Cleaner', value: 599.99, image: 'https://example.com/dyson-v11.jpg' }
];

interface ProductListProps{
  handleSelectProduct: (product: {name:string; value:number; image?:string}) => void
}

export default function ProductList({handleSelectProduct}:ProductListProps) {
  return (
      <div className=" flex flex-col overflow-hidden min-w-[500px]">
        <label className="text-sm text-[#198A83]">Lista de Produtos</label>
        <div className="flex flex-col flex-grow bg-[#B8FFF7] rounded-md overflow-hidden">
          <div className="flex">
            <input
              type="text"
              placeholder="Digite o produto..."
              className="flex-grow bg-[#198A83] placeholder-[#46b0a9] text-white text-lg h-8 pl-2 hover:bg-[#189890]"
            />
            <button className="w-8 bg-[#198A83] text-white text-xl flex items-center justify-center hover:bg-[#19a097]">
              <IoMdSearch />
            </button>
          </div>
            <div className="flex-grow overflow-auto h-screen">
              <ul className=" ">
                {products.map((product) => (
                  <ItemList 
                    key={product.id} 
                    {...product} 
                    onSelect={() => handleSelectProduct(product)}
                  />
                ))}
              </ul>
            </div>
        </div>
      </div>
  );
}
