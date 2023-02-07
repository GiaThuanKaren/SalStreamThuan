import Link from "next/link";
import React, { memo } from "react";
import { MovieModel } from "src/Model";
import Image from "../Image";

function MovieItem({ item }: { item: MovieModel }) {
  return (
    <>
      <div className="basis-1/5 min-h-[250px]  px-5 py-1 my-3">
        <Link href={`/movie/detail/${item.id}`}>
          {/*  contend Movie */}
          <div className="h-full  w-full">
            <div className="relative">
              <img
                className="h-full object-contain"
                src={"https://image.tmdb.org/t/p/w300/" + item["poster_path"]}
                alt="img"
              />
              <p className="px-2 py-1 text-white bg-[#007AFF] absolute bottom-0 right-0 mb-3 mr-2 text-xs rounded-xl font-medium">
                {item?.release_date
                  ?.toString()
                  .substring(0, item?.release_date.indexOf("-"))}
              </p>
            </div>
            <p className="text-xs text-white font-medium">{item["title"]}</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default MovieItem;
