import { env } from "~/env";

export const TWIndicator: React.FC = () => {
  if (env.NODE_ENV !== "development") return null;

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex size-9 items-center justify-center rounded-full bg-gray-300 p-4 font-mono text-base text-black outline outline-1 outline-black">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        sm
      </div>
      <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
      <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
};

export default TWIndicator;
