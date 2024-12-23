import './index.scss';
import { useNavigate } from 'react-router-dom';
import ConnectWallet from '@/components/ConnectWallet';

const memooGo = import.meta.env.VITE_ROUTE_GO;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-start">
      <ConnectWallet />
    </div>
  );
};

export default Home;
