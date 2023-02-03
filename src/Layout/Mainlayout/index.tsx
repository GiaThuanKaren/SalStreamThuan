import React from "react";
import { JsxElement } from "typescript";
import { Header } from "../../components";
interface Props {
  children?: any;
}
function Mainlayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Mainlayout;
