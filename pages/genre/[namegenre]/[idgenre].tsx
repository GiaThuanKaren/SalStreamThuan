import React from "react";
import { Mainlayout } from "src/Layout";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { GetListByIdGenre } from "src/services/api";
interface Props {
  data?: any;
}
function DetailGenrePage({ data }: Props) {
  return (
    <>
      <Mainlayout></Mainlayout>
    </>
  );
}

export default DetailGenrePage;

export const getStaticPaths: GetStaticPaths = async function () {
  return {
    paths: [],
    fallback: "blocking", // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async function (context) {
  console.log(context.params, "Param");
  let ListData = await GetListByIdGenre(context?.params?.idgenre);

  return {
    props: {
      data: ListData,
    },
  };
};
