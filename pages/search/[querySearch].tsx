import { useRouter } from "next/router";
import React from "react";
import { MovieItem, Pagination, TVItem, WrapperGrid } from "src/components";
import { LayoutBasic } from "src/Layout";
import { SearchItemModel } from "src/Model";
import { SearchMulti } from "src/services/api";

interface SearchResultModel {
  results: SearchItemModel[];
  page: number;
  total_pages: number;
  total_results: number;
}

function PageSearch() {
  const router = useRouter();
  const { querySearch, page } = router.query;
  const [properties, Setproperties] = React.useState<SearchResultModel>();
  console.log(querySearch, page, "QUERY SEARCH");
  console.log(router);

  React.useEffect(() => {
    async function FetchApi() {
      try {
        let result = await SearchMulti(
          router.query.querySearch,
          parseInt(router.query.page  as string)
        );
        Setproperties(result);
        console.log("[RESULT SEARCH]", result);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
    FetchApi();
  }, [router.query.page]);
  return (
    <>
      <LayoutBasic>
        <WrapperGrid>
          <div className="flex flex-wrap">
            {properties?.results.map((item: SearchItemModel, index: number) => {
              if (item.media_type == "movie") {
                return <MovieItem item={item} key={index} />;
              } else {
                return (
                  <>
                    <TVItem item={item} key={index} />
                  </>
                );
              }
            })}
          </div>
          <Pagination
            href={`/search/${router.query.querySearch}`}
            totalPages={properties?.total_pages}
            currentPage={
              router.query.page ? parseInt(router.query.page as string) : 1
            }
          />
        </WrapperGrid>
      </LayoutBasic>
    </>
  );
}

export default PageSearch;
