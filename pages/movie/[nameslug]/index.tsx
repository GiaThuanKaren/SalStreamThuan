import React, { useEffect } from "react";
import { LayoutBasic, Mainlayout } from "src/Layout";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { MovieItem, Pagination, WrapperGrid } from "src/components";
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
  const [properties, Setproperties] = React.useState<ResultMovieModel>();
  console.log(router.query);
  React.useEffect(() => {
    async function FetchApi() {
      try {
        let result: ResultMovieModel = await GetMoveOrTvByParam({
          href: `/movie/${nameslug}`,
          page: page,
        });
        Setproperties(result);
      } catch (e) {
        throw e;
      }
    }
    FetchApi()
  }, [page]);
  //   return <></>;
  return (
    <>
      <LayoutBasic>
        <WrapperGrid>
          <div className="flex flex-wrap">
            {properties?.results.map((item: MovieModel, index: number) => {
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
