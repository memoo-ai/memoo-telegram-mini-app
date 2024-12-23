import NotFound from '@/components/NotFound';

const NotFoundPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#090a10]">
      <div className="w-full h-full md:flex hidden flex-col">
        <div className="flex justify-center items-center flex-1">
          <NotFound />
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
