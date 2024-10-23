import SideBar from '../components/SideBar/page';
import ProductList from '../components/ProductList/page';
import ItemProperties from '../components/ItemProperties/page';

export default function Home() {
  return (
    <div className="">
      <SideBar />
      <ProductList />
      <ItemProperties />
    </div>
  );
}