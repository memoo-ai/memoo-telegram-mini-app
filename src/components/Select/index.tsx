import { useEffect, useState } from 'react';
import './index.scss';

interface SelectProps {
  className?: string;
  textClassName?: string;
  defaultValue?: string;
  options: any;
  onChange: (key: string) => void;
}
const Select = ({
  className,
  defaultValue,
  textClassName = 'font-404px text-10-10',
  options,
  onChange,
}: SelectProps) => {
  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    setActiveKey(defaultValue ?? '');
  }, [defaultValue, options]);

  return (
    <div
      className={`${className} bg-[#5E0198] rounded-[30px] border border-solid border-[#C273F2] w-full flex items-center justify-between h-8 p-0.5`}
    >
      {options?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className={`${textClassName} flex-1 text-center  h-full rounded-[30px] flex items-center justify-center ${activeKey === item.key ? ' rounded-[30px] active-tab text-purple border border-solid border-[#61FAC0]' : 'bg-[#5E0198] text-green'} `}
            onClick={() => {
              setActiveKey(item.key);
              onChange(item.key);
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

export default Select;
