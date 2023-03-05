import router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDebounce, useSearch } from "src/hooks";
import { SearchItemModel } from "src/Model";
import { SearchMulti } from "src/services/api";
import { ICON, IconRegular, IconSolid } from "src/utils/Icon";

function SearchBar() {
  const { push } = useRouter();

  const [textSearchState, setTextSearchState] = React.useState("");
  const [searchResult, setSearchResutl] = React.useState<SearchItemModel[]>([]);
  const [navOpenSearchSug, setnavOpenSearchSug] =
    React.useState<boolean>(false);
  React.useEffect(() => {
    const timeRef = setTimeout(async () => {
      if (textSearchState.trim() != "") {
        let result = await SearchMulti(textSearchState);
        console.log("[RESUTL SEARCH]", result);
        setSearchResutl(result?.results);
      }
    }, 300);
    return () => {
      clearTimeout(timeRef);
    };
  }, [textSearchState]);
  return (
    <>
      <div className="relative  ">
        <div className="flex items-center text-white rounded-2xl border-[1px] px-2 py-1">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                push(`/search/${textSearchState}`);
              }
            }}
            onChange={(e) => {
              setTextSearchState(e.target.value);
            }}
            type="text"
            className="flex-1 outline-none border-none mr-1 bg-transparent"
          />
          <ICON icon={IconSolid.faMagnifyingGlass} />
        </div>
        {/* <div className="absolute top-full bg-white  max-h-[300px] overflow-y-auto w-full">
          {searchResult.map((item: SearchItemModel, index: number) => {
            return <>
            <div className="w-full min-h-[50px] my-3 bg-red-300"></div>
            </>;
          })}
        </div> */}
      </div>
    </>
  );
}

export default SearchBar;
