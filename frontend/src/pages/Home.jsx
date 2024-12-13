import React from "react";

import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Categories from "../components/Categories";
import SlidingLogos from "../components/SlidingLogos";

const Home = () => {
  return (
    <div>
      <Hero />
      <SlidingLogos />
      <Categories />
      <HowItWorks />
    </div>
  );
};

export default Home;
