import { getProductByCategoryId } from "@/lib/products";
import Slider from "./components/Slider";
import Featured from "./components/Featured";
import Section2 from "./components/Section2";
import HomeCategories from "./components/HomeCategories";
import { getCategories } from "@/lib/categories";
export default async function Home() {
  const menFashion = (
    await getProductByCategoryId("64833a2edbbe74f153ec7938", 15)
  ).products;
  const womenFashion = (
    await getProductByCategoryId("648337b7223afa484880f4fb", 15)
  ).products;
  const Electronics = (
    await getProductByCategoryId("64834120235cccf7aa5d6cc6", 15)
  ).products;
  const Drones = (await getProductByCategoryId("6483417822bf5feb0d8251d0", 15))
    .products;
  const fitness = (await getProductByCategoryId("64835031082e25fade6967c6", 15))
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
