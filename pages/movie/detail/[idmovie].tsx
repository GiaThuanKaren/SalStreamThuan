import React from "react";
import { LayoutBasic, Mainlayout } from "src/Layout";

function DetailMovie() {
  
  return (
    <>
    
      <Mainlayout></Mainlayout>
    </>
  );
}

export default DetailMovie;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // can also be true or 'blocking'
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
