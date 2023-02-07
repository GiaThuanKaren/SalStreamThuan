import React from "react";
import { LayoutBasic, Mainlayout } from "src/Layout";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { MovieItem, Pagination, WrapperGrid } from "src/components";
import { GetMoveOrTvByParam, GetTreningWeek } from "src/services/api";
import { MovieModel } from "src/Model";
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
function SlugMoviePage({
  data,
  slideData,
  MoviePopular,
  MovieTabData,
  currentPage,
  slug,
}: Props) {
  console.log(data);
  const [currentPageState, SetcurrentpageState] = React.useState<number>(
    parseInt(currentPage)
  );

  return (
    <>
      <LayoutBasic>
        <WrapperGrid
          MoviePopular={MoviePopular}
          slideData={slideData}
          MovieTabData={MovieTabData}
        >
          <div className="flex flex-wrap">
            {data.data?.map((item: MovieModel, index: number) => {
              return (
                <>
                  <MovieItem item={item} key={index} />
                </>
              );
            })}
          </div>

          <Pagination
            href={slug}
            totalPages={data.totalPage}
            currentPage={currentPageState}
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

export const getServerSideProps: GetServerSideProps = async function ({
  query,
}) {
  const { nameslug, param } = query;
  console.log("QUERY 1", nameslug, param);

  let numpage = param as string;
  let NameSlug = nameslug;

  let result = await GetMoveOrTvByParam({
    href: `/movie/${NameSlug}`,
    page: numpage,
  });
  let slideData = await GetTreningWeek();
  let MovieTabData = await GetMoveOrTvByParam({ href: "/movie/upcoming" });
  let MoviePopular = await GetMoveOrTvByParam({ href: "/movie/popular" });
  return {
    props: {
      result,
      data: {
        data: result.results,
        totalPage: result.total_pages as number,
      },
      slideData,
      MovieTabData,
      MoviePopular,
      currentPage: numpage,
      slug: `/movie/${NameSlug}`,
    },
  };
};
