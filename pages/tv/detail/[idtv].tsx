import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ModelPopup } from "src/components";
import { LayoutBasic, Mainlayout } from "src/Layout";
import { ResultTVModel, Season, TVModel } from "src/Model";
import { DetailTVResult, VIdeoTVModel } from "src/Model/tv";
import { GetDetailTV } from "src/services/api";
import { ICON, IconSolid } from "src/utils/Icon";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
interface InfoDetailTvModel {
  TVDetail: DetailTVResult;
  VideoTV: VIdeoTVModel;
  TvRecommendation: ResultTVModel;
  SimilarTV: ResultTVModel;
}

function DetailTV() {
  const router = useRouter();
  const { idtv } = router.query;
  const [isLoading, SetisLoading] = React.useState(false);
  const [isOpenTrailer, SetisOpenTrailer] = React.useState(false);
  const [properties, Setproperties] = React.useState<InfoDetailTvModel>();
  React.useEffect(() => {
    async function FetchApi() {
      try {
        SetisLoading(true);
        let result = await GetDetailTV(router.query.idtv);
        console.log(result);
        Setproperties(result);
      } catch (e) {
        throw e;
      } finally {
        SetisLoading(false);
      }
    }
    FetchApi();
  }, [idtv]);
  console.log(properties);

  return (
    <>
      <LayoutBasic>
        {/* {isOpenTrailer && properties?.VideoTV.results.length != 0 && (
          <ModelPopup
            handle={() => {
              SetisOpenTrailer(false);
            }}
          >
            <div
              onClick={(e) => {
                // e.stopPropagation();
              }}
              className="w-[80%] max-w-[80%] h-[50%] max-h-[70%]  bg-black"
            >
              <iframe
                className="w-full h-full"
                height="711"
                src={`https://www.youtube.com/embed/${properties?.VideoTV.results[0].key}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen={true}
              ></iframe>
            </div>
          </ModelPopup>
        )} */}
        <div className="min-h-0 w-full relative rounded-xl shadow-2xl">
          {isLoading ? (
            <div className="animate-pulse w-full h-full">
              <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded  dark:bg-gray-700">
                <svg
                  className="w-full h-12 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
            </div>
          ) : (
            <>
              <div className="h-full w-full absolute top-0 left-0 right-0 bottom-0 bg-[#0000005b]"></div>

              <img
                className="w-full"
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  properties?.TVDetail.backdrop_path
                }
                alt=""
              />
            </>
          )}
        </div>
        <div className="flex min-h-0 mt-[30px]">
          <div className="basis-full md:basis-2/3 lg:basis-2/3 xl:basis-3/4 2xl:basis-4/5 h-full">
            {/* {
            
            } */}

            <p className="text-white text-2xl mt-5">
              {properties?.TVDetail.name}
            </p>
            <div className="my-3 flex text-white">
              <div className="flex items-center mr-8">
                <ICON className="mr-3 text-red-500" icon={IconSolid.faStar} />
                {properties?.TVDetail.vote_count}
              </div>
              <div className="flex items-center">
                <ICON
                  className="mr-3 text-red-500"
                  icon={IconSolid.faBookBookmark}
                />
                {properties?.TVDetail.first_air_date
                  ?.toString()
                  .substring(
                    0,
                    properties?.TVDetail.first_air_date.indexOf("-")
                  )}
              </div>
            </div>
            <div className="mt-5">
              <p className="text-white text-2xl">Overview</p>
              <p className="text-[#9C9EA2] my-3">
                {properties?.TVDetail.overview}
              </p>
            </div>

            <h3 className="text-white font-medium text-2xl">All Season</h3>
            <div className="flex flex-wrap">
              {properties?.TVDetail.seasons.map(
                (item: Season, index: number) => {
                  return (
                    <>
                      <div className="basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 min-h-[250px]  px-5 py-1 my-3">
                        <Link
                          href={`/tv/detail/season/${item.season_number}/${idtv}`}
                        >
                          {/*  contend Movie */}
                          <div className="h-full  w-full">
                            <div className="relative">
                              <LazyLoadImage
                                effect="blur"
                                className="h-full object-contain"
                                src={
                                  "https://image.tmdb.org/t/p/w300/" +
                                  item["poster_path"]
                                }
                                alt="img"
                              />

                              <p className="px-2 py-1 text-white bg-[#007AFF] absolute bottom-0 right-0 mb-3 mr-2 text-xs rounded-xl font-medium">
                                {item?.air_date
                                  ?.toString()
                                  .substring(0, item?.air_date.indexOf("-"))}
                              </p>
                            </div>
                            <p className="text-xs text-white font-medium">
                              {item["name"]}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </>
                  );
                }
              )}
            </div>
          </div>

          <div className="hidden md:block md:basis-1/3 lg-basis-1/3  xl:basis-1/4  2xl:basis-1/5 px-2">
            <div className="py-1 px-3 bg-[#007AFF]  rounded-3xl">
              <p className="font-medium text-white text-center">
                More Like This
              </p>
            </div>
            {properties?.SimilarTV.results
              .slice(0, 4)
              .map((item1: TVModel, index: number) => {
                return (
                  <>
                    <Link href={`/movie/detail/${item1.id}`}>
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
                          <p>{item1.name}</p>
                          <div className="flex justify-between items-center">
                            <p className="text-[#EDB709]">
                              {item1.vote_average}/10
                            </p>
                            <p className="mx-2">
                              {item1?.first_air_date
                                ?.toString()
                                .substring(
                                  0,
                                  item1?.first_air_date.indexOf("-")
                                )}
                            </p>
                            <p className="text-center px-2 py-1 bg-[#EDB709] text-black rounded-2xl text-xs font-medium">
                              HD
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
          </div>
        </div>
      </LayoutBasic>
    </>
  );
}

export default DetailTV;
