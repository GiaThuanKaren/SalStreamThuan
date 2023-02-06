import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="h-[300px] w-full flex justify-between text-white">
          <div className="flex ">
            <p className="font-medium">Privacy</p>
            <p className="font-medium mx-2">DCMA</p>
            <p className="font-medium">Contact</p>
          </div>
          <div className="flex">
            
          </div>
        </div>
      </div>
      <p className="text-white text-center">
        Made By{" "}
        <Link className="underline hover:cursor-pointer" href={""}>
          Nguyễn Quang Gia Thuận
        </Link>
      </p>
    </>
  );
}

export default Footer;
