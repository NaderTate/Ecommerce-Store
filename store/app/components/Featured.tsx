function Featured() {
  return (
    <div>
      <div className="sm:mt-20 sm:h-[342px] h-64 bg-contain relative flex items-center  bg-center  sm:bg-[url('https://res.cloudinary.com/dqkyatgoy/image/upload/v1686576068/Nader%20Express/pngwing.com_msvf7x.png')] bg-[url('https://res.cloudinary.com/dqkyatgoy/image/upload/v1686757604/apple-laptops-apple-device-a2b7b9e7b228e09267c81101cedf01ee-min_qq4m3m.png')] bg-no-repeat">
        <div className="w-full h-full absolute flex flex-col gap-5  justify-center items-center bg-white/50 dark:bg-[#030711]/50 backdrop-brightness-[.9]">
          <h1 className="font-bold text-2xl sm:text-4xl tracking-widest text-center rounded-md dark:backdrop-blur-0">
            Mover. Maker. <br /> Boundary breaker.
          </h1>
          <h1 className="hidden sm:block text-center sm:px-36 tracking-widest font-bold backdrop-blur-sm rounded-md dark:backdrop-blur-0">
            Supercharged by M2 Pro or M2 Max, MacBook Pro takes its power and
            efficiency further than ever. It delivers exceptional performance
            whether it’s plugged in or not, and now has even longer battery
            life. Combined with a stunning Liquid Retina XDR display and all the
            ports you need — this is a pro laptop without equal.
          </h1>
          <div className="flex gap-5">
            <button className="border-2 border-gray-700 dark:border-white hover:bg-gray-700 hover:text-white dark:hover:bg-white dark:hover:text-gray-800 rounded-md px-4 py-2 font-bold tracking-wider transition">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
