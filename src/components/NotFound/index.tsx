import isMobile from 'is-mobile';
import './index.scss';
const NotFound = () => {
  return (
    <div>
      {isMobile() ? (
        <div className="flex justify-center items-center flex-col gap-y-7">
          <h3 className="text-center font-404px text-white text-16-16">uh oh! PAGE NOT FOUND.</h3>
          <img className="w-8/12" src="/404.png" alt="" />
        </div>
      ) : (
        <div className="flex justify-center items-center ">
          <div className="not_found">
            <h3 className="text-center text-[24px] leading-[48px] font-404px text-white">uh oh! PAGE NOT FOUND.</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotFound;
