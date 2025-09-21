import React from "react";
import Banner from "./Banner";
import Features from "./Features";
import Specialist_Query from "./Specialist_Query";
import Injectors from "./Injectors";
import Testimonials from "./Testimonial";
import Faq from "./Faq";
import DirectoryCallToAction from "./DirectoryCallToAction";

const Home = () => {
  return (
    <section>
      <Banner />
      <Features />
      {/* <Specialist_Query /> */}
      <Injectors />
      <Testimonials />
      <Faq />
    </section>
  );
};

export default Home;
