import React from "react";
import { LayoutBasic, Mainlayout } from "src/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
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
}
function SlugMoviePage({ data, slideData, MoviePopular, MovieTabData }: Props) {
  console.log(data);
  const [currentPage, Setcurrentpage] = React.useState(1);
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

          {/* <Pagination totalPages={data.total_pages} currentPage={currentPage} /> */}
        </WrapperGrid>
      </LayoutBasic>
    </>
  );
}

export default SlugMoviePage;


export const getStaticPaths: GetStaticPaths = async function () {
  return {
    paths: [],
    fallback: "blocking",
  };
};


export const getStaticProps: GetStaticProps = async function (context) {
  console.log(context.params?.param, "123");
  let numpage = context.params?.param as string;
  let NameSlug = context.params?.nameslug;

  let result = await GetMoveOrTvByParam({
    href: `/movie/${NameSlug}`,
    page: numpage,
  });
  let slideData = await GetTreningWeek();
  let MovieTabData = await GetMoveOrTvByParam({ href: "/movie/upcoming" });
  let MoviePopular = await GetMoveOrTvByParam({ href: "/movie/popular" });

  return {
    props: {
      data: {
        data: result.results,
        totalPage: result.total_pages,
      },
      slideData,
      MovieTabData,
      MoviePopular,
      currentPage: numpage,
    },
  };
};
