import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { ICON, IconSolid } from "src/utils/Icon";
import { MovieModel } from "src/Model";
interface Props {
  slidedata?: [];
}


function Slider({ slidedata = [] }: Props) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper h-[450px]"
      >
        {slidedata?.map((item: MovieModel, index) => {
          return (
            <>
              <SwiperSlide key={index}>
                <div className="h-full w-full relative bg-slate-200 flex justify-center items-center">
                  {/* bg-slider */}
                  <div
                    className=" relative  h-full w-full"
                    style={
                      {
                        // backgroundImage: `url(${"https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg"})`,
                      }
                    }
                  >
                    <div className="bg-slider h-full w-full absolute "></div>
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        item.backdrop_path
                      }
                      alt=""
                    />
                  </div>
                  <div className=" absolute w-[80%] ">
                    <div className="flex items-center">
                      <p className="font-bold text-3xl text-white mr-3 ">
                        {item["title"]}
                      </p>
                      <p className="text-center px-2 py-1 bg-[#EDB709] text-black rounded-2xl text-xs font-medium">
                        {item["media_type"]}
                      </p>
                    </div>
                    <div className="flex items-center mt-3">
                      <p className="text-[#EDB709]">
                        {item["vote_average"]}/10
                      </p>
                      <p className="mx-3 text-[#6D7E96]">
                        {item?.release_date}
                      </p>
                      <p className="text-center px-2 py-1 bg-[#EDB709] text-black rounded-2xl text-xs font-medium">
                        HD
                      </p>
                    </div>

                    <div className="mt-5">
                      <p className="text-white text-xl h-40  overflow-y-auto text-overflow-ellipsis">
                        {item["overview"]}
                      </p>
                      <Link href={""} className="mt-3 block">
                        <div className="flex items-center bg-[#007AFF] w-max px-3 py-1 rounded-2xl">
                          <ICON icon={IconSolid.faPlay} />
                          <p className="text-white ml-3">Watch Movie</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </>
          );
        })}

        {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
}

export default Slider;
