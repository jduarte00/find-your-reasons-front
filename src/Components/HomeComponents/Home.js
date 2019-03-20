import React from "react";
import Hero from "./Hero";
import Services from "./Services";
import MainChart from "./MainChart";
import KPI from "./KPI";
import Footer from "./Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <MainChart />
      <KPI />
      <Footer />
    </div>
  );
}
