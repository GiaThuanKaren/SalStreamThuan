import Link from "next/link";
import React from "react";
import { ListSkeleton, TVItem, WrapperGrid } from "src/components";
import { LayoutBasic, Mainlayout } from "src/Layout";
import { MovieModel, TVModel } from "src/Model";
import { GetMoveOrTvByParam, GetTreningWeek } from "src/services/api";
import { TabMovie, TabTv } from "src/utils";
interface Props {
  slideData: any;
  MovieTabData?: any;
  TVTabData: any;
  TvRecomment: any;
  MoviePopular: any;
}
function SeriesPage({
  slideData,
  MovieTabData,
  TVTabData,
  TvRecomment,
  MoviePopular,
}: Props) {
  const [isLoading, SetisLoading] = React.useState(false);

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

  const [selelectedTabTV, SetselectedTabTV] = React.useState({
    ...TabTv[0],
    data: TVTabData.results,
  });
  const HandleListTabTB = async function (item: any) {
    try {
      SetisLoading(true);

      let result = await GetMoveOrTvByParam({ href: item.href });
      console.log(result["results"], 123, "TV");
      SetselectedTabTV({
        ...selelectedTabTV,
        data: result["results"],
        ...item,
      });
    } catch (e) {
      throw e;
    } finally {
      SetisLoading(false);
    }
  };
  return (
    <LayoutBasic>
      <WrapperGrid>
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
            <Link
              href={`${selelectedTabTV.href}?page=1`}
              className="block text-white"
            >
              <p className=" font-medium text-xs py-1 px-3 my-3 text-white">
                View All
              </p>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap">
          {isLoading ? (
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
      </WrapperGrid>
    </LayoutBasic>
  );
}

export default SeriesPage;

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
