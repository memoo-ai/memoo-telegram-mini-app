import './index.scss';
import { useNavigate } from 'react-router-dom';
import ConnectWallet from '@/components/ConnectWallet';

const homePath = import.meta.env.VITE_ROUTE_GO;

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-start landing-page h-screen page_container">
      <ConnectWallet />
      <div>212</div>
    </div>
  );
};

export default Landing;
