import React from "react";
import { MovieModel } from "src/Model";
import { JsxElement } from "typescript";
import { Footer, Header } from "../../components";
interface Props {
  children?: any;
  MoviePopular?: any;
  MovieTabData?: any;
  slideData?: any;
}
function Mainlayout({ children }: Props) {
  // return <></>;
  return (
    <>
      <Header />
      <div className="flex items-center justify-center mx-[200px]">
        <div className="min-h-[200vh] w-full mt-10">{children}</div>
      </div>
      <Footer />
    </>
  );
}

export default Mainlayout;
