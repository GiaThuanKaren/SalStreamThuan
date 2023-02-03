import React from "react";
import { ICON, IconRegular, IconSolid } from "src/utils/Icon";

function SearchBar() {
  return (
    <>
      <div className="flex items-center text-white rounded-2xl border-[1px] px-2 py-1">
        <input
          type="text"
          className="flex-1 outline-none mr-1 bg-transparent"
        />
        <ICON icon={IconSolid.faMagnifyingGlass} />
      </div>
    </>
  );
}

export default SearchBar;
