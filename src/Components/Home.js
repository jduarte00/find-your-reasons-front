import React from "react";
import Hero from "./HomeComponents/Hero";
import Services from "./HomeComponents/Services";
import MainChart from "./HomeComponents/MainChart";
import KPI from "./HomeComponents/KPI";
import Footer from "./HomeComponents/Footer";

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
