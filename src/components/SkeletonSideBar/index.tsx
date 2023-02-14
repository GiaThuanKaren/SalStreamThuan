import React from "react";

function SkeletonSideBar() {
  const arr = Array.from(Array(20).keys());
  return (
    <>
      {arr.map((item: any, index: number) => {
        return (
          <>
            <div className="flex justify-between h-[128px] w-full my-6 ">
              <div className=" flex-1">
                <div className="h-full relative w-full  ">
                  {/* <img
              className="h-full "
              src={"https://image.tmdb.org/t/p/w300" + item1?.poster_path}
              alt=""
            /> */}
                  <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                      >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded  dark:bg-gray-700">
                    <svg
                      className="w-12 h-12 text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 640 512"
                    >
                      <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                  </div>

                  <div className=" absolute top-0 left-0 flex items-center justify-center font-medium bg-[#007AFF] text-white h-[34px] w-[34px] rounded-full ">
                    {/* <p>#{index + 1}</p> */}
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-white">
                {/* <p>{item1.title}</p> */}
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>

                <div className="flex justify-between items-center">
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>

                  {/* <p className="text-[#EDB709]">{item1.vote_average}/10</p> */}
                  {/* <p className="mx-2">
              {item1?.release_date
                ?.toString()
                .substring(0, item1?.release_date.indexOf("-"))}
            </p> */}
                  <p className="text-center px-2 py-1 bg-[#EDB709] text-black rounded-2xl text-xs font-medium">
                    HD
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default SkeletonSideBar;
