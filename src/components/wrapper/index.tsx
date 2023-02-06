import React from "react";
import { MovieModel } from "src/Model";
interface Props {
  children?: any;
  MoviePopular?: any;
  MovieTabData?: any;
  slideData?: any;
}
function WrapperGrid({
  children,
  MovieTabData,
  slideData,
  MoviePopular,
}: Props) {
  const SideBarTab = [
    {
      title: "Latest Movie",
      data: MoviePopular?.results.slice(0, 4),
    },
    {
      title: "Recomendation",
      data: MovieTabData?.results.slice(0, 4),
    },
    {
      title: "More Movies",
      data: slideData?.results.slice(0, 4),
    },
  ];

  return (
    <>
      <div className="flex min-h-[100px] items-start">
        <div className="basis-4/5 h-full">{children}</div>
        <div className="basis-1/5 px-2">
          {SideBarTab?.map((item: any, index: number) => {
            return (
              <>
                <div className="py-1 px-3 bg-[#007AFF]  rounded-3xl my-3">
                  <p className="font-medium text-white text-center">
                    {item["title"]}
                  </p>
                </div>
                <div>
                  {item.data?.map((item1: MovieModel, index: number) => {
                    return (
                      <>
                        <div className="flex justify-between h-[128px] w-full my-6 ">
                          <div className=" flex-1">
                            <div className="h-full relative w-full  ">
                              <img
                                className="h-full "
                                src={
                                  "https://image.tmdb.org/t/p/w300" +
                                  item1?.poster_path
                                }
                                alt=""
                              />
                              <div className=" absolute top-0 left-0 flex items-center justify-center font-medium bg-[#007AFF] text-white h-[34px] w-[34px] rounded-full ">
                                <p>#{index + 1}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 text-white">
                            <p>{item1.title}</p>
                            <div className="flex justify-between items-center">
                              <p className="text-[#EDB709]">
                                {item1.vote_average}/10
                              </p>
                              <p className="mx-2">
                                {item1?.release_date
                                  ?.toString()
                                  .substring(
                                    0,
                                    item1?.release_date.indexOf("-")
                                  )}
                              </p>
                              <p className="text-center px-2 py-1 bg-[#EDB709] text-black rounded-2xl text-xs font-medium">
                                HD
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default WrapperGrid;
