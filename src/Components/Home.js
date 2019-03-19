import React from "react";
import Hero from "./HomeComponents/Hero";
import Services from "./HomeComponents/Services";
import MainChart from "./HomeComponents/MainChart";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <MainChart />
    </div>
  );
}
