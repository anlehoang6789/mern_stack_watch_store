// src/pages/HomePage.jsx

import Banner from "../components/Banner";
import Features from "../components/Feature";
import Products from "../components/Product";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Features />
      <div className="container mx-auto mt-8">
        <Products />
      </div>
    </div>
  );
};

export default HomePage;
