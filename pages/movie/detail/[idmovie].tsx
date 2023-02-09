import { useRouter } from "next/router";
import React from "react";
import { ModelPopup, WrapperGrid } from "src/components";
import { LayoutBasic, Mainlayout } from "src/Layout";
import {
  DetailMovieModel,
  MovieModel,
  ResultMovieModel,
  VideoMovieModel,
} from "src/Model";
import { GetDetailMovie } from "src/services/api";
import { ICON, IconSolid } from "src/utils/Icon";
interface InfoDetailMovieModel {
  MovieDetail: DetailMovieModel;
  VideoMovie: VideoMovieModel;
  MovieRecommendation: ResultMovieModel;
  SimilarMovie: ResultMovieModel;
}
interface DetailMovieResult {}
function DetailMovie() {
  const router = useRouter();
  const { idmovie } = router.query;
  const [isLoading, SetisLoading] = React.useState(true);
  const [properties, Setproperties] = React.useState<InfoDetailMovieModel>();
  React.useEffect(() => {
    async function FetchApi() {
      try {
        console.log(router.query.idmovie, "DEtail Movie");

        let result = await GetDetailMovie(router.query.idmovie);
        console.log(result);
        Setproperties(result);
        SetisLoading(false);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
    FetchApi();
  }, []);
  console.log(properties);
  if (isLoading) {
    return <></>;
  }
  return (
    <>
      {/* <ModelPopup>
        <iframe
          width="1264"
          height="711"
          src="https://www.youtube.com/embed/euCqAq6BRa4?list=RDMM"
          title="DJ Snake - Let Me Love You ft. Justin Bieber"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </ModelPopup> */}
      <LayoutBasic>
        <div className="min-h-0 w-full relative rounded-xl shadow-2xl">
          <div className="min-w-[50px] px-3 py-2 flex items-center justify-center absolute bottom-0 mb-3 w-full ">
            <div className="flex items-center text-white bg-gray-300 rounded-2xl px-4 py-2 ">
              <ICON className="mx-2" icon={IconSolid.faPlay} />
              <p>Trailer</p>
            </div>
          </div>
          <div className="h-full w-full absolute top-0 left-0 right-0 bottom-0 bg-[#0000005b]"></div>
          <img
            src={
              "https://image.tmdb.org/t/p/original/" +
              properties?.MovieDetail.backdrop_path
            }
            alt=""
          />
        </div>
        <div className="flex min-h-0 mt-[30px]">
          <div className="basis-full md:basis-2/3 lg:basis-2/3 xl:basis-3/4 2xl:basis-4/5 h-full">
            <iframe
              className="w-full h-[500px]"
              src={`https://www.2embed.to/embed/tmdb/movie?id=${idmovie}`}
            ></iframe>
            <p className="text-white text-2xl">
              {properties?.MovieDetail.title}
            </p>
            <div className="my-3 flex text-white">
              <div className="flex items-center mr-8">
                <ICON className="mr-3 text-red-500" icon={IconSolid.faStar} />
                {properties?.MovieDetail.vote_count}
              </div>
              <div className="flex items-center">
                <ICON
                  className="mr-3 text-red-500"
                  icon={IconSolid.faBookBookmark}
                />
                {properties?.MovieDetail.release_date
                  ?.toString()
                  .substring(
                    0,
                    properties?.MovieDetail.release_date.indexOf("-")
                  )}
              </div>
            </div>
            <div className="mt-5">
              <p className="text-white text-2xl">Overview</p>
              <p className="text-[#9C9EA2] my-3">
                {properties?.MovieDetail.overview}
              </p>
            </div>
          </div>
          <div className="hidden md:block md:basis-1/3 lg-basis-1/3  xl:basis-1/4  2xl:basis-1/5 px-2">
            <div className="py-1 px-3 bg-[#007AFF]  rounded-3xl">
              <p className="font-medium text-white text-center">
                More Like This
              </p>
            </div>
            {properties?.SimilarMovie.results
              .slice(0, 4)
              .map((item1: MovieModel, index: number) => {
                return (
                  <>
                    {" "}
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
                              .substring(0, item1?.release_date.indexOf("-"))}
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
        </div>
      </LayoutBasic>
    </>
  );
}

export default DetailMovie;
