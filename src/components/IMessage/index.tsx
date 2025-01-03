import { message as antdMessage } from 'antd';
import './index.scss';
import { IconSuccess, IconInfo, IconWarning, IconError } from '@/components/icons';
interface ConfigOptions {
  className?: string;
  content?: string;
  duration?: number;
  key?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  top?: string | number;
}
const message = () => {
  return null;
};

message.success = (
  content: string,
  options: Omit<ConfigOptions, 'content'> = {
    duration: 3,
  },
) => {
  antdMessage.success({
    ...options,
    content,
    className: `custom-success-message whitespace-pre max-lg:whitespace-pre-warp message-mobile ${options?.className || ''} `,
    icon: <IconSuccess className="max-lg:w-5 max-lg:h-5" />,
  });
};

message.error = (content: string, options?: Omit<ConfigOptions, 'content'>) => {
  antdMessage.error({
    ...options,
    content,
    className: `${options?.className || ''} custom-error-message whitespace-pre max-lg:whitespace-pre-warp message-mobile`,
    icon: <IconError className="max-lg:w-5 max-lg:h-5" />,
  });
};

message.info = (content: string, options?: Omit<ConfigOptions, 'content'>) => {
  antdMessage.info({
    ...options,
    content,
    className: `${options?.className || ''} custom-info-message whitespace-pre max-lg:whitespace-pre-warp message-mobile`,
    icon: <IconInfo className="max-lg:w-5 max-lg:h-5" />,
  });
};

message.warning = (content: string, options?: Omit<ConfigOptions, 'content'>) => {
  antdMessage.warning({
    ...options,
    content,
    className: `${options?.className || ''} custom-warning-message whitespace-pre max-lg:whitespace-pre-warp message-mobile`,
    icon: <IconWarning className="max-lg:w-5 max-lg:h-5" />,
  });
};

interface messageType {
  success: (content: string, options?: Omit<ConfigOptions, 'content'>) => void;
  error: (content: string, options?: Omit<ConfigOptions, 'content'>) => void;
  info: (content: string, options?: Omit<ConfigOptions, 'content'>) => void;
  warning: (content: string, options?: Omit<ConfigOptions, 'content'>) => void;
}

export default message as messageType;
