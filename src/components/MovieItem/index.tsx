import Link from "next/link";
import React, { memo } from "react";
import { MovieModel } from "src/Model";
import Image from "../Image";
import { LazyLoadImage } from "react-lazy-load-image-component";
function MovieItem({ item }: { item: MovieModel }) {
  const [imageURL, setImageURL] = React.useState(item.poster_path)
  return (
    <>
      <div className="w-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 min-h-0 md:min-h-[250px] px-5  py-1 my-3 ">
        <Link href={`/movie/detail/${item.id}`}>
          {/*  contend Movie */}
          <div className="h-full  w-full">

            <div className="relative">
              {
                (item && item["poster_path"]) ? <LazyLoadImage
                  onError={() => {
                    setImageURL("https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg")
                  }}


                  className="h-[300px]   object-contain"
                  src={"https://image.tmdb.org/t/p/w300/" + imageURL}
                  alt="img"
                /> : (
                  <>
                    <div className="h-full w-full bg-red-400">

                    </div>
                  </>
                )
              }


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
