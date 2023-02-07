import Link from "next/link";
import React, { memo } from "react";
import { TVModel } from "src/Model";
import Image from "../Image";
function TVItem({ item }: { item: TVModel }) {
  return (
    <>
      <div className="basis-1/5 min-h-[250px]  px-5 py-1 my-3">
        {/*  contend Movie */}
        <Link href={`/tv/detail/${item.id}`}>
          <div className="h-full  w-full">
            <div className="relative">
              <img
                className="h-full object-contain"
                src={"https://image.tmdb.org/t/p/w300/" + item["poster_path"]}
                alt="img"
              />

              <p className="px-2 py-1 text-white bg-[#007AFF] absolute bottom-0 right-0 mb-3 mr-2 text-xs rounded-xl font-medium">
                {item?.first_air_date
                  ?.toString()
                  .substring(0, item?.first_air_date.indexOf("-"))}
              </p>
            </div>
            <p className="text-xs text-white font-medium">{item["name"]}</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default memo(TVItem);
