import React from "react";
import Banner from "./Banner";
import Features from "./Features";
import Injectors from "./Injectors";
import Testimonials from "./Testimonial";
import Faq from "./Faq";

const Home = () => {
  return (
    <section>
      <Banner />
      <Features />
      <Injectors />
      <Testimonials />
      <Faq />
    </section>
  );
};

export default Home;
