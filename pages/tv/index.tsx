import Link from "next/link";
import React from "react";
import { ListSkeleton, LoadingLayer, TVItem, WrapperGrid } from "src/components";
import { useOnLoadImages } from "src/hooks";
import { LayoutBasic, Mainlayout } from "src/Layout";
import { MovieModel, TVModel } from "src/Model";
import { GetMoveOrTvByParam, GetTreningWeek } from "src/services/api";
import { TabMovie, TabTv } from "src/utils";

function SeriesPage() {
  const [isLoading, SetisLoading] = React.useState(false);


  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const imagesLoaded = useOnLoadImages(wrapperRef);
  const [TVTabData, SetTVSTabData] = React.useState<any>({

  })
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
  React.useEffect(() => {
    async function FetchApi() {
      try {
        let TVTabData = await GetMoveOrTvByParam({ href: "/tv/airing_today" });
        SetselectedTabTV({
          ...selelectedTabTV,
          data: TVTabData?.results
        })
      } catch (error) {
        throw error
      }
    }
    FetchApi()
  }, [])
  return (
    <LayoutBasic>
      {!imagesLoaded && <LoadingLayer />}
      <WrapperGrid>
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
                      `${item.title == selelectedTabTV.title
                        ? "border-[#EDB709] border-b-[4px]"
                        : ""
                      }` + " mx-3 hover:cursor-pointer "
                    }
                  >
                    <p
                      className={`my-2 text-base whitespace-nowrap md:text-lg ${item.title == selelectedTabTV.title
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

        <div ref={wrapperRef} className="flex flex-wrap">
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
      </WrapperGrid>
    </LayoutBasic>
  );
}

export default SeriesPage;

