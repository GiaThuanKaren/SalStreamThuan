import Link from "next/link";
import React, { useRef } from "react";
import { GetMoveOrTvByParam, UpdateTokenMSG } from "src/services/api";
import { ICON, IconSolid } from "src/utils/Icon";
import { signOut, useSession } from "next-auth/react";
import SearchBar from "../search";
import messaging from "firebase/messaging";
import { useRouter } from "next/router";
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
  console.log(session, "USER SESSION HEADER")

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
      } catch (e) { }
    }
    // messaging.getToken(app).then((token: string) => {
    //   console.log("Toke");
    // });
    FetchApi();
  }, []);

  React.useEffect(() => {
    async function UpdateToken() {
      try {
        const sessionStorage = localStorage.getItem("session") ? localStorage.getItem("session") : ""
        console.log(sessionStorage, "SESSION STORAGE")
        const userStorage = JSON.parse(sessionStorage as any)
        const user: {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
          accountId?: string | null | undefined;
          id?: string | null | undefined;
        } = session?.user as any

        if (session) {
          await UpdateTokenMSG(user?.accountId as string, localStorage.getItem("token_sal_stream") as string, user?.id as string, "INSERT")
        } else {
          await UpdateTokenMSG(userStorage.user?.accountId as string, localStorage.getItem("token_sal_stream") as string, userStorage.user?.id as string, "REMOVE")
        }
      } catch (e) {
        throw e
      }
    }
    UpdateToken()
    if (session) {
      localStorage.setItem("session", JSON.stringify(session))
      
    } else {
      localStorage.setItem("session", JSON.stringify(""))
      
    }
    
  }, [session])


  return (
    <>
      <div className="h-16 bg-black  flex items-center justify-center xl:mx-[200px]  z-[2] fixed top-0 left-0 right-0 ">
        {isDrawerOpen && (
          <div
            // ref={DrawerEle}
            className="min-h-screen flex justify-between bg-[#1E2747]   z-[3]  absolute left-0 top-0 bottom-0 right-0 "
          >
            <div className="min-w-[100px] h-full  px-2 py-1  ">
              <div className="md:hidden block">
                <SearchBar />
              </div>
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
          className={`w-full  ${isTop ? "" : "bg-black "
            }flex items-center justify-between  transition-all px-1  sm:px-0  `}
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
            <div className="hidden md:block">
              <SearchBar />
            </div>
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
                    <ul className="hover:cursor-pointer  list-none shadow-md rounded-md  w-screen  sm:w-[250px] bg-white absolute z-[1] top-[calc(100%_+_10px)] right-0 px-2 py-1">
                      <li className="p-2 border-b-[2px] border-[#D4D4D4]">
                        <h3 className="font-medium text-sm whitespace-nowrap">
                          {session.user?.name as string}
                        </h3>
                      </li>
                      <li className="p-2">Profle</li>

                      <li
                        onClick={async () => {
                          await signOut({
                            redirect: true,
                            callbackUrl: "/",
                          });
                        }}
                        className="p-2 border-t-[2px] border-[#D4D4D4]"
                      >
                        Sign Out
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <Link href={`/signin`}>
                <p className="text-xs sm:text-base text-white  font-medium ml-3 whitespace-nowrap">
                  Sign In
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
