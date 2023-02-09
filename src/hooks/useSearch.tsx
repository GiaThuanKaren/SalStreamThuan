import React from "react";
import { SearchMulti } from "src/services/api";
import useDebounce from "./useDebounce";

const useSearch = function (search: string, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = React.useState();
  async function ExecuteAsyncTask() {
    try {
      let result = await SearchMulti(search);
      setDebouncedValue(result);
    } catch (e) {
      throw e;
    }
  }
  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim() != "") {
        ExecuteAsyncTask();
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [search, delay]);

  return debouncedValue;
};
export default useSearch;
