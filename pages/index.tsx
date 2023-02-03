import Head from "next/head";
import Image from "next/image";
import { Slider } from "src/components";
import { Mainlayout } from "src/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Mainlayout>
        <div className="h-[200vh] w-full bg-red-400">
          <Slider />
        </div>
      </Mainlayout>
    </>
  );
}
