import LateralNav from '../components/LateralNav/page';
import ListaProdutos from '../components/ListaProdutos/page';
import PropriedadesItem from '../components/PropriedadesItem/page';

export default function Home() {
  return (
    <div className="">
      <LateralNav />
      <ListaProdutos />
      <PropriedadesItem />
    </div>
  );
}