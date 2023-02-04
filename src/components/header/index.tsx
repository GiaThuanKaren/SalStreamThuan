import Link from "next/link";
import React from "react";
import SearchBar from "../search";

function Header() {
  const [isTop, setisTop] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("scroll", (e) => {
      console.log(window.scrollY);
      if (Math.abs(window.scrollY) == 0) {
        setisTop(true);
      } else setisTop(false);
    });
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
            <Link href={""}>
              <p className="hover:text-blue-400 font-medium">Home</p>
            </Link>
            <Link href={""} className="hover:text-blue-400 mx-3">
              <p>Movies</p>
            </Link>
            <Link href={""} className="hover:text-blue-400 mx-3">
              <p>TV Shows</p>
            </Link>
            <Link href={""} className="hover:text-blue-400 mx-3">
              <p>Genre</p>
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
