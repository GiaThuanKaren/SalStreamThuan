import { useRouter } from "next/router";
import React from "react";
import { LayoutBasic } from "src/Layout";
import { DetailSeaon, Episode } from "src/Model/tv";
import { GetDetailSeason } from "src/services/api";
interface infoDetailSeason {}
function DetailSeason() {
  const router = useRouter();
  const { id, season } = router.query;
  const [dataEpisode, SetdataEpisode] = React.useState<Episode[]>();
  const [episode, Setepisode] = React.useState<number>(1);

  const [isLoading, SetisLoading] = React.useState(false);
  const [isOpenTrailer, SetisOpenTrailer] = React.useState(false);
  React.useEffect(() => {
    async function FetchApi() {
      try {
        SetisLoading(true);
        console.log(id,season,"Detail Season")
        let result: DetailSeaon = await (
          await GetDetailSeason(router.query.id, router.query.season)
        ).detailSeason;
        console.log(result);

        SetdataEpisode(result.episodes);
      } catch (e) {
        throw e
      } finally {
        SetisLoading(false);
      }
    }
    if (router.query.episode ) {
      FetchApi();
    }
  }, [router.query.episode]);
  return (
    <>
      <LayoutBasic>
        <div className="flex mt=[30px]">
          {/* md:basis-2/3 lg:basis-2/3 xl:basis-3/4 2xl:basis-4/5 */}
          <div className="basis-full  h-full">
            {isLoading ? (
              <div
                role="status"
                className="flex items-center justify-center h-56 w-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
              >
                <svg
                  className="w-12 h-12 text-gray-200 dark:text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 384 512"
                >
                  <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <iframe
                allowFullScreen
                className="w-full h-[500px]"
                src={`https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`}
              ></iframe>
            )}
            <div className="flex flex-wrap my-5">
              {dataEpisode?.map((item: Episode, index: number) => {
                return (
                  <>
                    <div
                      onClick={() => {
                        Setepisode(item["episode_number"]);
                      }}
                      className={
                        "hover:cursor-pointer    h-12 w-full  font-medium basis-1/2 md:basis-1/3 lg:basis-1/4 px-3 py-1"
                      }
                    >
                      <div
                        className={
                          `${
                            item["episode_number"] == episode
                              ? "bg-[#007AFF] text-white font-medium"
                              : "bg-white text-black"
                          }` + " w-full h-full flex items-center justify-center"
                        }
                      >
                        <p>Episode {item["episode_number"]}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          {/* <div className="hidden md:block md:basis-1/3 lg-basis-1/3  xl:basis-1/4  2xl:basis-1/5 px-2"></div> */}
        </div>
      </LayoutBasic>
    </>
  );
}

export default DetailSeason;
