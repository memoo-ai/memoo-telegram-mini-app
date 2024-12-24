import { Progress } from 'antd';
import './index.scss';
import isMobile from 'is-mobile';
interface props {
  className?: string;
  showInfo?: boolean;
  percent?: number | string;
}
const IProgress = ({ className = '', showInfo = false, percent = 0 }: props) => {
  return (
    <Progress
      className={`${className} ${isMobile() ? 'memoo_progress_mobile !h-1 flex items-center' : 'memoo_progress'}`}
      showInfo={showInfo}
      percent={Number(percent)}
    />
  );
};
export default IProgress;
