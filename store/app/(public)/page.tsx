import { NextPage } from "next";

import Featured from "@/components/HomePage/Featured";
import ProductsCarousel from "@/components/ProductsCarousel";
import ShoesSection from "@/components/HomePage/ShoesSection";
import Shipping from "@/components/HomePage/Returns&Shipping";
import CategorySection from "@/components/HomePage/CategorySection";

import { getProductsByCategoryID } from "@/actions/products";

const Home: NextPage = async () => {
  // IDs of the categories to fetch their products
  const menFashionID = ["64833a2edbbe74f153ec7938"];
  const womenFashionID = ["648337b7223afa484880f4fb"];
  const shoesID = ["64834d49b13297eae381f3cb", "64834d57b13297eae381f3cc"];
  const bagsID = ["64834cdcb13297eae381f3c7"];
  // fetch 15 items from each category
  const limit = 15;
  // Fetch the products

  const menFashion = await getProductsByCategoryID(menFashionID, limit);
  const womenFashion = await getProductsByCategoryID(womenFashionID, limit);
  const shoes = await getProductsByCategoryID(shoesID, limit);
  const bags = await getProductsByCategoryID(bagsID, limit);

  return (
    <main>
      <Featured />
      <ProductsCarousel data={menFashion} />
      <CategorySection
        img={
          "https://res.cloudinary.com/dqkyatgoy/image/upload/v1686354031/nader%20express/eitvc3gnwnc6rp4oopq2.webp"
        }
        CTA="Dive into Style!"
        description="Dress to Impress: Elevate Your Style Game."
        id={menFashionID[0]}
        title="Men fashion"
      />
      <ProductsCarousel data={womenFashion} />
      <CategorySection
        img={
          "https://res.cloudinary.com/dqkyatgoy/image/upload/v1686354014/nader%20express/jssuusa0sh7f4lxmwyaa.webp"
        }
        CTA="Shop the Latest Trends!"
        description="Chic Couture: Where Elegance Meets Empowerment."
        title="Women Fashion"
        id={womenFashionID[0]}
      />
      <ProductsCarousel data={shoes} />
      <ShoesSection />
      <ProductsCarousel data={bags} />
      <CategorySection
        img={
          "https://res.cloudinary.com/dqkyatgoy/image/upload/v1686353106/nader%20express/snzu3p13phvqh74dunkz.webp"
        }
        CTA="Shop Your Statement Piece!"
        description="Carry Confidence: Unleash Your Style in Every Bag."
        title="Women Bags"
        id={bagsID[0]}
      />
      <Shipping />
    </main>
  );
};
export default Home;
