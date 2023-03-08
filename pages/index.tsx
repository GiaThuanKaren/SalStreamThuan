import Head from "next/head";
import Image from "next/image";
import React from "react";

import {
  ListSkeleton,
  MovieItem,
  Slider,
  TVItem,
  WrapperGrid,
} from "src/components";
import { LayoutBasic, Mainlayout } from "src/Layout";
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
import Link from "next/link";
import { TabMovie, TabTv } from "src/utils";
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

  const [selelectedTabMovie, SetselectedTabMovie] = React.useState({
    ...TabMovie[0],
    data: MovieTabData["results"],
  });
  const [selelectedTabTV, SetselectedTabTV] = React.useState({
    ...TabTv[0],
    data: TVTabData.results,
  });
  const [isLoadingMovie, SetisLoadingMovie] = React.useState(false);
  const [isLoadingTV, SetisLoadingTV] = React.useState(false);
  const HandleListTabMovie = async function (item: any) {
    try {
      SetisLoadingMovie(true);
      let result = await GetMoveOrTvByParam({ href: item.href });
      // SetselectedTabMovie(item);
      SetselectedTabMovie({
        ...selelectedTabMovie,
        data: result["results"],
        ...item,
      });
    } catch (e) {
      throw e;
    } finally {
      SetisLoadingMovie(false);
    }
  };

  const HandleListTabTB = async function (item: any) {
    try {
      SetisLoadingTV(true);

      let result = await GetMoveOrTvByParam({ href: item.href });
      SetselectedTabTV({
        ...selelectedTabTV,
        data: result["results"],
        ...item,
      });
    } catch (e) {
      throw e;
    } finally {
      SetisLoadingTV(false);
    }
  };
  React.useEffect(() => {}, []);
  return (
    <>
      <LayoutBasic>
        <Slider slidedata={slideData["results"]} />
        <WrapperGrid>
          {/* Movie Tab Start */}
          <div className="flex flex-wrap items-center mt-5">
            <p className="text-lg whitespace-nowrap md:text-4xl mx-3 font-bold text-white">
              Movies
            </p>
            <div className="flex items-center  flex-wrap ">
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
                        }` + "  hover:cursor-pointer "
                      }
                    >
                      <p
                        className={`mr-3 ml-1 my-2 text-base whitespace-nowrap md:text-lg ${
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
            {isLoadingMovie ? (
              <ListSkeleton />
            ) : (
              selelectedTabMovie.data?.map((item: MovieModel) => {
                return (
                  <>
                    <MovieItem item={item} />
                  </>
                );
              })
            )}
          </div>

          <Link href={`${selelectedTabMovie.href}?page=1`}>
            <div className="text-center hover:bg-[#007AFF] transition-all bg-[#3D4F91] rounded-3xl">
              <p className="font-medium text-lg py-3 my-3 text-white">
                View All
              </p>
            </div>
          </Link>
          {/* Movie Tab End */}

          {/* TV Tab Start */}

          <div className="flex items-center justify-between my-10 flex-wrap">
            <p className="text-lg whitespace-nowrap md:text-4xl font-bold text-white my-3">
              TV Shows
            </p>
            <div className="flex  items-center w-full flex-wrap  ">
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
                        }` + "  hover:cursor-pointer "
                      }
                    >
                      <p
                        className={`mr-3 ml-1 my-2 text-base whitespace-nowrap md:text-lg ${
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
            {/* <div className="hidden md:block min-w-[100px] text-center hover:bg-[#007AFF] transition-all bg-[#3D4F91] rounded-xl">
            <Link
              href={`${selelectedTabTV.href}?page=1`}
              className="block text-white"
            >
              <p className=" font-medium text-xs py-1 px-3 my-3 text-white">
                View All
              </p>
            </Link>
          </div> */}
          </div>

          <div className="flex flex-wrap">
            {isLoadingTV ? (
              <ListSkeleton />
            ) : (
              selelectedTabTV.data?.map((item: TVModel, index: number) => {
                return (
                  <>
                    <TVItem item={item} />
                  </>
                );
              })
            )}
          </div>
          <div className=" min-w-[100px] text-center hover:bg-[#007AFF] transition-all bg-[#3D4F91] rounded-xl">
            <Link
              href={`${selelectedTabTV.href}?page=1`}
              className="block text-white"
            >
              <p className=" font-medium text-xs py-3  px-3 my-3 text-white">
                View All
              </p>
            </Link>
          </div>
          {/* TV Tab End */}
        </WrapperGrid>
      </LayoutBasic>
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
