import Link from "next/link";
import React from "react";
import { ListSkeleton, LoadingLayer, MovieItem, WrapperGrid } from "src/components";
import { LayoutBasic, Mainlayout } from "src/Layout";
import { MovieModel } from "src/Model";
import { TabMovie, TabTv } from "src/utils";
import { GetMoveOrTvByParam, GetTreningWeek } from "src/services/api";
import { GetServerSideProps } from "next";
import { useOnLoadImages } from "src/hooks";
interface Props {
  slideData: any;
  MovieTabData?: any;
  TVTabData: any;
  TvRecomment: any;
  MoviePopular: any;
}
function MoviePage({
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
  const [isLoading, SetisLoading] = React.useState(false);
  const [selelectedTabMovie, SetselectedTabMovie] = React.useState({
    ...TabMovie[0],
    data: MovieTabData["results"],
  });
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const imagesLoaded = useOnLoadImages(wrapperRef);
  const HandleListTabMovie = async function (item: any) {
    try {
      SetisLoading(true);
      let result = await GetMoveOrTvByParam({ href: item.href });
      console.log(result["results"], 123);
      // SetselectedTabMovie(item);
      SetselectedTabMovie({
        ...selelectedTabMovie,
        data: result["results"],
        ...item,
      });
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      SetisLoading(false);
    }
  };

  return (
    <>
      <LayoutBasic>
      {!imagesLoaded && <LoadingLayer />}
        <WrapperGrid>
          <div  className="flex flex-wrap items-center mt-5">
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

          <div ref={wrapperRef} className="flex flex-wrap">
            {isLoading ? (
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

          <div className="text-center hover:bg-[#007AFF] transition-all bg-[#3D4F91] rounded-3xl">
            <Link href={`${selelectedTabMovie.href}?page=1`}>
              <p className="font-medium text-lg py-3 my-3 text-white">
                View All
              </p>
            </Link>
          </div>
        </WrapperGrid>
      </LayoutBasic>
    </>
  );
}

export default MoviePage;
export const getServerSideProps: GetServerSideProps = async function ({
  query,
}) {
  const { slug } = query;
  console.log(query, "QUERY");
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
};
