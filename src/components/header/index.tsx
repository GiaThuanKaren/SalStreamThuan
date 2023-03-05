import Link from "next/link";
import React, { useRef } from "react";
import { GetMoveOrTvByParam } from "src/services/api";
import { ICON, IconSolid } from "src/utils/Icon";
import { signOut, useSession } from "next-auth/react";
import SearchBar from "../search";
import messaging from "firebase/messaging";
import { useRouter } from "next/router";
import app from "src/utils/lib/firebase";
interface Genre {
  name: string;
  id: number;
}
function Header() {
  const { data: session, status } = useSession();
  const { push, asPath } = useRouter();
  const [isTop, setisTop] = React.useState(false);
  const [isDrawerOpen, SetisDrawerOpen] = React.useState(false);
  const [genre, Setgenre] = React.useState([]);
  const [isOpenNav, SetOpenNav] = React.useState(false);
  const [isOpengenre, SetIsOpengenre] = React.useState(false);
  const DrawerEle = useRef(null);
  React.useEffect(() => {
    window.addEventListener("scroll", (e) => {
      // console.log(window.scrollY);
      if (Math.abs(window.scrollY) == 0) {
        setisTop(true);
      } else setisTop(false);
    });
    async function FetchApi() {
      try {
        let result = await GetMoveOrTvByParam({ href: "/genre/movie/list" });
        console.log(result.genres);
        Setgenre(result.genres);
      } catch (e) {}
    }
    // messaging.getToken(app).then((token: string) => {
    //   console.log("Toke");
    // });
    FetchApi();
  }, []);

  return (
    <>
      <div className="h-fit  flex items-center justify-center xl:mx-[200px]  z-[2] fixed top-0 left-0 right-0 ">
        {isDrawerOpen && (
          <div
            // ref={DrawerEle}
            className="min-h-screen flex justify-between bg-[#1E2747]   z-[3]  absolute left-0 top-0 bottom-0 right-0 "
          >
            <div className="min-w-[100px] h-full  px-2 py-1  ">
              <Link href={"/"}>
                <p className="hover:text-blue-400 text-white my-2 font-medium">
                  Home
                </p>
              </Link>
              <Link
                href={"/movie"}
                className="hover:text-blue-400 text-white my-2 mx-3"
              >
                <p>Movies</p>
              </Link>
              <Link
                href={"/tv"}
                className="hover:text-blue-400 text-white my-2 mx-3"
              >
                <p>TV Shows</p>
              </Link>
              <div
                onMouseEnter={() => {
                  console.log("Enter Mouse");
                  SetIsOpengenre(true);
                }}
                onMouseLeave={() => {
                  console.log("Out");
                  SetIsOpengenre(false);
                }}
                
                className="hover:text-blue-400 text-white  mx-3"
              >
                <div className="relative ">
                  <p className="text-white">Genre</p>
                  <div className="shadow-lg text-white  bg-[#1E2747] flex justify-between p-2">
                    <ul>
                      {genre.slice(0, 10).map((item: Genre, index: number) => {
                        return (
                          <Link
                            key={item.id}
                            href={`/genre/${item.name
                              .toLowerCase()
                              .replace(/\s/g, "")}/${item.id}?page=1`}
                          >
                            <li className="px-3 py-2 text-white  transition-all hover:text-[#075AB9] hover:bg-[rgb(21,27,50)]">
                              <p className="whitespace-normal text-xs">
                                {item.name}
                              </p>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                    <ul>
                      {genre.slice(11).map((item: Genre, index: number) => {
                        return (
                          <Link
                            key={item.id}
                            href={`/genre/${item.name
                              .toLowerCase()
                              .replace(/\s/g, "")}/${item.id}?page=1  `}
                          >
                            <li className="px-3 py-2 transition-all text-white hover:text-[#075AB9] hover:bg-[rgb(21,27,50)]">
                              <p className="whitespace-normal text-xs">
                                {item.name}
                              </p>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                SetisDrawerOpen(false);
              }}
              className="flex-1 h-full bg-[#00000086]"
            ></div>
          </div>
        )}
        <div
          className={`w-full  ${
            isTop ? "" : "bg-black "
          }flex items-center justify-between  transition-all px-5  sm:px-0  `}
        >
          <div
            onClick={() => {
              SetisDrawerOpen(true);
            }}
            className="block md:hidden text-white text-lg"
          >
            <ICON icon={IconSolid.faBars} />
          </div>
          <div className="hidden md:flex items-center ">
            <Link href={"/"}>
              <p className="hover:text-blue-400 font-medium">Home</p>
            </Link>
            <Link href={"/movie"} className="hover:text-blue-400 mx-3">
              <p>Movies</p>
            </Link>
            <Link href={"/tv"} className="hover:text-blue-400 mx-3">
              <p>TV Shows</p>
            </Link>
            <div
              onMouseEnter={() => {
                console.log("Enter Mouse");
                SetIsOpengenre(true);
              }}
              onMouseLeave={() => {
                console.log("Out");
                SetIsOpengenre(false);
              }}
              
              className="hover:text-blue-400 mx-3"
            >
              <div className="relative">
                <p className="text-white">Genre</p>
                {isOpengenre && (
                  <div className="shadow-lg text-white absolute top-full bg-[#1E2747] flex justify-between p-2">
                    <ul>
                      {genre.slice(0, 10).map((item: Genre, index: number) => {
                        return (
                          <Link
                            key={item.id}
                            href={`/genre/${item.name
                              .toLowerCase()
                              .replace(/\s/g, "")}/${item.id}?page=1`}
                          >
                            <li className="px-3 py-2  transition-all hover:text-[#075AB9] hover:bg-[rgb(21,27,50)]">
                              <p className="whitespace-normal text-xs">
                                {item.name}
                              </p>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                    <ul>
                      {genre.slice(11).map((item: Genre, index: number) => {
                        return (
                          <Link
                            key={item.id}
                            href={`/genre/${item.name
                              .toLowerCase()
                              .replace(/\s/g, "")}/${item.id}?page=1  `}
                          >
                            <li className="px-3 py-2 transition-all hover:text-[#075AB9] hover:bg-[rgb(21,27,50)]">
                              <p className="whitespace-normal text-xs">
                                {item.name}
                              </p>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <SearchBar />
            {status === "authenticated" ? (
              <>
                <div
                  onClick={() => {
                    SetOpenNav(!isOpenNav);
                  }}
                  className="relative ml-3"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={session?.user?.image as string}
                    alt="Rounded avatar"
                  ></img>
                  {isOpenNav && (
                    <ul className="absolute top-[calc(100%_+_10px)] bg-white min-h-[30px] right-0 ">
                      <li
                        onClick={async () => {
                          await signOut({
                            redirect: true,
                            callbackUrl: "/",
                          });
                        }}
                        className="h-5 px-3  block"
                      >
                        <p className="font-medium text-xs whitespace-nowrap">
                          Sign Out
                        </p>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <Link href={`/signin`}>
                <p className="text-white  font-medium ml-3">Sign In</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
