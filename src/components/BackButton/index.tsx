import './index.scss';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  path?: string;
}

const BackPath = import.meta.env.VITE_ROUTE_DASHBOARD;
const BackButton = ({ path = BackPath, ...rest }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <img src="@/assets/image/back.svg" alt="" onClick={() => navigate(-1)} />
    </div>
  );
};
export default BackButton;
