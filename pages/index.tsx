import Head from "next/head";
import Image from "next/image";
import { Mainlayout } from "src/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Mainlayout>
        <div className="h-screen"></div>
      </Mainlayout>
    </>
  );
}
