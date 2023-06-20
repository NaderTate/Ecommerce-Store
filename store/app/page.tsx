import { getProductByCategory } from "@/lib/products";
import Slider from "./components/Slider";
import Featured from "./components/Featured";
import Section2 from "./components/Section2";
import HomeCategories from "./components/HomeCategories";
import { getCategories } from "@/lib/categories";
export default async function Home() {
  const menFashion = (await getProductByCategory("Men's Fashion", 15)).products;
  const womenFashion = (await getProductByCategory("Women's Fashion", 15))
    .products;
  const Electronics = (await getProductByCategory("Electronics", 15)).products;
  const Drones = (await getProductByCategory("Drones", 15)).products;
  const fitness = (await getProductByCategory("Fitness Equipments", 15))
    .products;
  const { categories } = await getCategories(1, 4);
  // await new Promise((resolve) => setTimeout(resolve, 1000000));

  return (
    <div>
      <Featured />
      {/* @ts-ignore* */}
      <Section2 />
      <Slider title="Popular in men's fashion" data={menFashion} />
      <Slider title="Popular in women's fashion" data={womenFashion} />
      <HomeCategories categories={categories} />
      <Slider title="Deals under $25" data={menFashion} />
      <Slider title="Deals on electronics and gadgets" data={Electronics} />
      <HomeCategories categories={categories} />
      <Slider title="For drones lovers" data={Drones} />
      <Slider title="Let's pump them muscles" data={fitness} />
    </div>
  );
}
