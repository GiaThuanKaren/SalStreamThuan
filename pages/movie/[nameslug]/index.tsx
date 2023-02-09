import React, { useEffect } from "react";
import { LayoutBasic, Mainlayout } from "src/Layout";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { MovieItem, Pagination, Skeleton, WrapperGrid } from "src/components";
import { GetMoveOrTvByParam, GetTreningWeek } from "src/services/api";
import { MovieModel, ResultMovieModel } from "src/Model";
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
  const { page, nameslug } = router.query;
  const [isLoading, SetisLoading] = React.useState(false);
  const [properties, Setproperties] = React.useState<ResultMovieModel>();
  console.log(router.query);
  React.useEffect(() => {
    async function FetchApi() {
      try {
        SetisLoading(true);
        let result: ResultMovieModel = await GetMoveOrTvByParam({
          href: `/movie/${nameslug}`,
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

  //   return <></>;
  return (
    <>
      <LayoutBasic>
        <WrapperGrid>
          <div className="flex flex-wrap">
            {isLoading
              ? Array.from(Array(10).keys()).map((item: any) => {
                  return (
                    <>
                      <Skeleton />
                    </>
                  );
                })
              : properties?.results.map((item: MovieModel, index: number) => {
                  return (
                    <>
                      <MovieItem item={item} key={index} />
                    </>
                  );
                })}
          </div>

          <Pagination
            href={`/movie/${nameslug}`}
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

// export const getStaticProps: GetStaticProps = async function (context) {};
