import Link from "next/link";
import React from "react";
import { GetMoveOrTvByParam } from "src/services/api";
import SearchBar from "../search";
interface Genre {
  name: string;
  id: number;
}
function Header() {
  const [isTop, setisTop] = React.useState(false);
  const [genre, Setgenre] = React.useState([]);
  const [isOpengenre, SetIsOpengenre] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("scroll", (e) => {
      console.log(window.scrollY);
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
    FetchApi();
  }, []);
  return (
    <>
      <div className="flex items-center justify-center mx-[200px] z-[2] fixed top-0 left-0 right-0">
        <div
          className={`w-full min-h-[50px] ${
            isTop ? "" : "bg-black "
          }flex items-center justify-between transition-all  `}
        >
          <div className="flex items-center ">
            <Link href={"/"}>
              <p className="hover:text-blue-400 font-medium">Home</p>
            </Link>
            <Link href={"/movie"} className="hover:text-blue-400 mx-3">
              <p>Movies</p>
            </Link>
            <Link href={"/tv"} className="hover:text-blue-400 mx-3">
              <p>TV Shows</p>
            </Link>
            <Link
              onMouseEnter={() => {
                console.log("Enter Mouse");
                SetIsOpengenre(true);
              }}
              onMouseLeave={() => {
                console.log("Out");
                SetIsOpengenre(false);
              }}
              href={""}
              className="hover:text-blue-400 mx-3"
            >
              <div className="relative">
                <p>Genre</p>
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
            </Link>
            <Link href={""} className="flex hover:text-blue-400 mx-3">
              <p>Language</p>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <SearchBar />
            <p className="text-white mx-2 font-medium">Sign In</p>
            <p className="text-white rounded-lg h-full w-max px-2 py-1 bg-[#007AFF] font-medium text-center">
              Register
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
