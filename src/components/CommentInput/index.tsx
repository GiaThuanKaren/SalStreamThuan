import React from "react";
import { ICON, IconRegular, IconSolid } from "src/utils/Icon";

function CommentInput() {
  return (
    <>
      <div className="relative my-10">
        <div className="flex items-center text-white rounded-2xl border-[1px] px-2 py-1">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // push(`/search/${textSearchState}`);
              }
            }}
            onChange={(e) => {
              //   setTextSearchState(e.target.value);
            }}
            type="text"
            className="flex-1 outline-none border-none mr-1 bg-transparent"
          />
          <ICON icon={IconSolid.faPaperPlane} />
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

export default CommentInput;
