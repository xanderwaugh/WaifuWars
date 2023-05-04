import Image from "next/image";
import { BsArrowDown } from "react-icons/bs";

const smoothScrollId = (id: string) => {
  if (typeof window === "undefined") return;
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth" });
  window.history.pushState({}, "", `#${id}`);
};

export const Hero: React.FC = () => {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col items-center gap-12 px-12 pt-16 sm:min-h-[80vh] sm:flex-row sm:justify-center sm:gap-16 sm:pt-0">
      <div className="flex h-full w-full flex-col items-start justify-between sm:w-auto ">
        <h1 className="pt-12 text-4xl font-extrabold leading-none tracking-tight sm:pt-0 md:text-5xl lg:text-6xl">
          xanny.dev
        </h1>

        <h2 className="tracking-tigher pt-2 text-sm font-light leading-none md:text-[16px] lg:text-lg">
          A place for personal improvement.
        </h2>
        <button
          onClick={() => smoothScrollId("improvement")}
          className="hover:text-xanny-text mt-8 flex items-center justify-center gap-2 rounded-md bg-blue-600 p-2 text-xl font-bold tracking-tight text-white transition-all duration-300 ease-in-out"
        >
          <span className="text-2xl font-bold tracking-tight">Start Here</span>

          <BsArrowDown className="text-xanny text-3xl" />
        </button>
      </div>
      <div className="relative mt-20 aspect-square h-64 w-64 translate-y-0 scale-100 transition-all duration-200 ease-in hover:scale-110 sm:mt-0 sm:h-64 sm:w-64 md:h-80 md:w-80">
        <Image
          // unsplash/random image
          src="https://source.unsplash.com/random/640x640"
          alt="Bebop Art"
          fill={true}
          loading="eager"
          priority={true}
          sizes="(max-width: 640px) 100vw, 640px"
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
