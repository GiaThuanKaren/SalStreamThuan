import Head from "next/head";
import Image from "next/image";
import React from "react";

import { MovieItem, Slider, TVItem } from "src/components";
import { Mainlayout } from "src/Layout";
import { MovieModel, TVModel } from "src/Model";
import { GetMoveOrTvByParam, GetTreningWeek } from "src/services/api";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import { ICON } from "src/utils/Icon";
import styles from "../styles/Home.module.css";
interface Props {
  slideData: any;
  MovieTabData?: any;
  TVTabData: any;
  TvRecomment: any;
  MoviePopular: any;
}
export default function Home({
  slideData,
  MovieTabData,
  TVTabData,
  TvRecomment,
  MoviePopular,
}: Props) {
  const TabMovie = [
    {
      title: "Latest",
      href: "/movie/upcoming",
    },
    {
      title: "Most Viewed",
      href: "/movie/popular",
    },
    {
      title: "Most Rating",
      href: "/movie/top_rated",
    },
    {
      title: "Most Favortie",
      href: "/movie/now_playing",
    },
  ];
  const TabTv = [
    {
      title: "Latest",
      href: "/tv/airing_today",
    },
    {
      title: "Most Viewed",
      href: "/tv/popular",
    },
    {
      title: "Most Rating",
      href: "/tv/top_rated",
    },
    {
      title: "Most Favortie",
      href: "/tv/on_the_air",
    },
  ];
  const SideBarTab = [
    {
      title: "Latest Movie",
      data: MoviePopular?.results.slice(0, 4),
    },
    {
      title: "Recomendation",
      data: MovieTabData["results"].slice(0, 4),
    },
    {
      title: "More Movies",
      data: slideData["results"].slice(0, 4),
    },
  ];
  console.log(slideData, MovieTabData, TVTabData, TvRecomment);
  const [selelectedTabMovie, SetselectedTabMovie] = React.useState({
    ...TabMovie[0],
    data: MovieTabData["results"],
  });
  const [selelectedTabTV, SetselectedTabTV] = React.useState({
    ...TabTv[0],
    data: TVTabData.results,
  });
  const HandleListTabMovie = async function (item: any) {
    try {
      let result = await GetMoveOrTvByParam({ href: item.href });
      console.log(result["results"], 123);
      // SetselectedTabMovie(item);
      SetselectedTabMovie({
        ...selelectedTabMovie,
        data: result["results"],
        title: item.title,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const HandleListTabTB = async function (item: any) {
    try {
      let result = await GetMoveOrTvByParam({ href: item.href });
      console.log(result["results"], 123, "TV");
      SetselectedTabTV({
        ...selelectedTabTV,
        data: result["results"],
        title: item.title,
      });
    } catch (e) {
      throw e;
    }
  };
  React.useEffect(() => {}, []);
  return (
    <>
      <Mainlayout>
        <div className="min-h-[200vh] w-full">
          <Slider slidedata={slideData["results"]} />
          <div className="flex min-h-[100px] mt-7">
            <div className="basis-4/5 h-full">
              {/* Movie Tab Start */}
              <div className="flex items-center mt-5">
                <p className="text-4xl font-bold text-white">Movies</p>
                <div className="flex items-center">
                  {TabMovie?.map((item: any, index: number) => {
                    return (
                      <>
                        <div
                          onClick={() => {
                            HandleListTabMovie(item);
                          }}
                          className={
                            `${
                              item.title == selelectedTabMovie.title
                                ? "border-[#EDB709] border-b-[4px]"
                                : ""
                            }` + " mx-3 hover:cursor-pointer "
                          }
                        >
                          <p
                            className={` text-lg ${
                              item.title == selelectedTabMovie.title
                                ? "text-white font-medium "
                                : "text-[#265D95] font-light"
                            }   `}
                          >
                            {item?.title}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap">
                {selelectedTabMovie.data?.map((item: MovieModel) => {
                  return (
                    <>
                      <MovieItem item={item} />
                    </>
                  );
                })}
              </div>

              <div className="text-center hover:bg-[#007AFF] transition-all bg-[#3D4F91] rounded-3xl">
                <p className="font-medium text-lg py-3 my-3 text-white">
                  View All
                </p>
              </div>

              {/* Movie Tab End */}

              {/* TV Tab Start */}

              <div className="flex items-center justify-between my-10">
                <p className="text-4xl font-bold text-white">TV Shows</p>
                <div className="flex  items-center">
                  {TabTv?.map((item: any, index: number) => {
                    return (
                      <>
                        <div
                          onClick={() => {
                            HandleListTabTB(item);
                          }}
                          className={
                            `${
                              item.title == selelectedTabTV.title
                                ? "border-[#EDB709] border-b-[4px]"
                                : ""
                            }` + " mx-3 hover:cursor-pointer "
                          }
                        >
                          <p
                            className={` text-lg ${
                              item.title == selelectedTabTV.title
                                ? "text-white font-medium "
                                : "text-[#265D95] font-light"
                            }   `}
                          >
                            {item?.title}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="min-w-[100px] text-center hover:bg-[#007AFF] transition-all bg-[#3D4F91] rounded-xl">
                  <p className=" font-medium text-xs py-1 px-3 my-3 text-white">
                    View All
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap">
                {selelectedTabTV.data?.map((item: TVModel, index: number) => {
                  return (
                    <>
                      <TVItem item={item} />
                    </>
                  );
                })}
              </div>

              {/* TV Tab End */}
            </div>

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
        </div>
      </Mainlayout>
    </>
  );
}

export async function getServerSideProps() {
  let slideData = await GetTreningWeek();
  let MovieTabData = await GetMoveOrTvByParam({ href: "/movie/upcoming" });
  let MoviePopular = await GetMoveOrTvByParam({ href: "/movie/popular" });
  let TVTabData = await GetMoveOrTvByParam({ href: "/tv/airing_today" });
  let TvRecomment = await GetMoveOrTvByParam({ href: "/tv/on_the_air" });
  return {
    props: {
      slideData: slideData,
      MovieTabData,
      TVTabData,
      TvRecomment: TvRecomment,
      MoviePopular,
    },
  };
}
