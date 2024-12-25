import HoverImage from '../HoverImage';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import backIcon from '@/assets/images/back.svg';
interface BackButtonProps {
  path?: string;
  className?: string;
}

const BackButton = ({ path, className, ...rest }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <div className={className} onClick={() => (path ? navigate(path) : navigate(-1))}>
      <HoverImage imgUrl={backIcon} rootClassName="w-[42px] h-[40px]" showBg={false} />
    </div>
  );
};
export default BackButton;
