import React from "react";
import { LayoutBasic, Mainlayout } from "src/Layout";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { GetListByIdGenre } from "src/services/api";
import { MovieItem, Pagination, WrapperGrid } from "src/components";
import { useRouter } from "next/router";
import { MovieModel, ResultMovieModel } from "src/Model";
interface Props {
  data?: any;
}

function DetailGenrePage() {
  const router = useRouter();
  const { namegenre, idgenre, page } = router.query;
  console.log(namegenre, idgenre, page, parseInt(page as string), "[QUERY]");
  console.log(router.query);
  const [properties, Setproperties] = React.useState<ResultMovieModel>();
  React.useEffect(() => {
    async function FetchApi() {
      try {
        let results: ResultMovieModel = await GetListByIdGenre(
          idgenre as string,
          page ? page as string : "1"
        );
        Setproperties(results);
      } catch (e) {
        throw e;
      }
    }
    FetchApi();
  }, [page]);
  return (
    <>
      <LayoutBasic>
        <WrapperGrid>
          <h1 className="text-white capitalize">
            Most View {namegenre} {page}
          </h1>
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
            href={`/genre/${namegenre}/${idgenre}`}
            totalPages={properties?.total_pages}
            currentPage={page!=undefined ? parseInt(page as string) : 1}
          />
        </WrapperGrid>
      </LayoutBasic>
    </>
  );
}

export default DetailGenrePage;
