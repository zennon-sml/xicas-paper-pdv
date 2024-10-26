import SideBar from '../components/SideBar/page';
import ProductList from '../components/ProductList/page';
import ItemProperties from '../components/ItemProperties/page';

export default function Home() {
  return (
    <div>
      <SideBar />
      <div className='flex flex-col h-screen'>
        <ProductList />
        <ItemProperties />
      </div>
    </div>
  );
}