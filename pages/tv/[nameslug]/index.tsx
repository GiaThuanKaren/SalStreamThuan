import React from "react";
import { LayoutBasic, Mainlayout } from "src/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { MovieItem, Pagination, Skeleton, TVItem, WrapperGrid } from "src/components";
import { GetMoveOrTvByParam, GetTreningWeek } from "src/services/api";
import { MovieModel, ResultTVModel, TVModel } from "src/Model";
import { useRouter } from "next/router";
interface Props {
  slideData: any;
  MovieTabData?: any;
  TVTabData: any;
  TvRecomment: any;
  MoviePopular: any;
  data: any;
  currentPage: any;
  slug: string;
}
function SlugMoviePage() {
  const router = useRouter();
  const [isLoading, SetisLoading] = React.useState(false);

  const { page, nameslug } = router.query;
  const [properties, Setproperties] = React.useState<ResultTVModel>();
  console.log(router);
  React.useEffect(() => {
    async function FetchApi() {
      try {
        SetisLoading(true);

        let result: ResultTVModel = await GetMoveOrTvByParam({
          href: `/tv/${nameslug}`,
          page: page ? (page as string) : "1",
        });
        Setproperties(result);
      } catch (e) {
        throw e;
      } finally {
        SetisLoading(false);
      }
    }
    FetchApi();
  }, [page]);
  return (
    <>
      <LayoutBasic>
        <WrapperGrid>
          <div className="flex flex-wrap">
            {isLoading
              ? Array.from(Array(20).keys()).map((item: any) => {
                  return (
                    <>
                      <Skeleton />
                    </>
                  );
                })
              : properties?.results.map((item: TVModel, index: number) => {
              return (
                <>
                  <TVItem item={item} key={index} />
                </>
              );
            })}
          </div>

          <Pagination
            href={`/tv/${nameslug}`}
            totalPages={properties?.total_pages}
            currentPage={page ? parseInt(page as string) : 1}
          />
        </WrapperGrid>
      </LayoutBasic>
    </>
  );
}

export default SlugMoviePage;

// export const getStaticPaths: GetStaticPaths = async function () {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// };

// export const getStaticProps: GetStaticProps = async function (context) {
//   console.log(context.params?.param, "123");
//   let numpage = context.params?.param as string;
//   let NameSlug = context.params?.nameslug;

//   let result = await GetMoveOrTvByParam({
//     href: `/tv/${NameSlug}`,
//     page: numpage,
//   });
//   let slideData = await GetTreningWeek();
//   let MovieTabData = await GetMoveOrTvByParam({ href: "/movie/upcoming" });
//   let MoviePopular = await GetMoveOrTvByParam({ href: "/movie/popular" });

//   return {
//     props: {
//       data: {
//         data: result.results,
//         totalPage: result.total_pages as number,
//       },
//       slideData,
//       MovieTabData,
//       MoviePopular,
//       currentPage: numpage,
//       slug: `/tv/${NameSlug}`,
//     },
//   };
// };
