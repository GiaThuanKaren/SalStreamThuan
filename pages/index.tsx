import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Slider } from "src/components";
import { Mainlayout } from "src/Layout";
import { GetTreningWeek } from "src/services/api";
import styles from "../styles/Home.module.css";
interface Props {
  slideData: [];
}
export default function Home({ slideData }: Props) {
  const TabMovie = [
    {
      title: "Latest",
      href: "/lastest",
    },
    {
      title: "Most Viewed",
      href: "/popular",
    },
    {
      title: "Most Rating",
      href: "/rating",
    },
    {
      title: "Most Favortie",
      href: "/favor",
    },
  ];
  console.log(slideData);
  const [selelectedTabMovie, SetselectedTabMovie] = React.useState<string>(
    TabMovie[0].title
  );
  const [selelectedTabTV, SetselectedTabTV] = React.useState<string>("Latest");
  React.useEffect(() => {}, []);
  return (
    <>
      <Mainlayout>
        <div className="h-[200vh] w-full">
          <Slider />
          <div className="flex min-h-[100px]">
            <div className="basis-4/5 h-full">
              {/* Movie Tab Start */}
              <div className="flex items-center mt-5">
                <p className="text-4xl font-bold text-white">Movies</p>
                <div className="flex items-center">
                  {TabMovie?.map((item: any, index: number) => {
                    return (
                      <>
                        <div
                          onClick={() => {
                            SetselectedTabMovie(item["title"]);
                          }}
                          className={
                            `${
                              item.title == selelectedTabMovie
                                ? "border-[#EDB709] border-b-[4px]"
                                : ""
                            }` + " mx-3 hover:cursor-pointer "
                          }
                        >
                          <p
                            className={`font-medium text-lg ${
                              item.title == selelectedTabMovie
                                ? "text-white "
                                : "text-[#265D95]"
                            }   `}
                          >
                            {item?.title}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap">
                {Array.from(Array(10).keys()).map((item: any) => {
                  return (
                    <>
                      <div className="basis-1/5 min-h-[250px] bg-red-200 px-5 py-1 my-3">
                        {/*  contend Movie */}
                        <div className="h-full bg-slate-500 w-full">
                          <img
                            className="h-full object-contain"
                            src="https://image.tmdb.org/t/p/w300/kuf6dutpsT0vSVehic3EZIqkOBt.jpg"
                            alt="img"
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>

              {/* Movie Tab End */}
            </div>

            <div className="basis-1/5"></div>
          </div>
        </div>
      </Mainlayout>
    </>
  );
}

export async function getServerSideProps() {
  let slideData = await GetTreningWeek();
  return {
    props: {
      slideData: slideData,
    },
  };
}
