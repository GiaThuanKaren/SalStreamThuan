import Link from "next/link";
import React from "react";
import { MovieItem, WrapperGrid } from "src/components";
import { LayoutBasic, Mainlayout } from "src/Layout";
import { MovieModel } from "src/Model";
import { TabMovie, TabTv } from "src/utils";
import { GetMoveOrTvByParam, GetTreningWeek } from "src/services/api";
import { GetServerSideProps } from "next";
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
  const [selelectedTabMovie, SetselectedTabMovie] = React.useState({
    ...TabMovie[0],
    data: MovieTabData["results"],
  });
  const HandleListTabMovie = async function (item: any) {
    try {
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
    }
  };
  return (
    <>
      <LayoutBasic>
        <WrapperGrid
        
        >
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
