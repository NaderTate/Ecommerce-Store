import React from "react";
import Deals from "./Deals";
import { getProductById } from "@/lib/products";
import TopDeal from "./TopDeal";
async function Section2() {
  const topDeal = (await getProductById(["6485cdddfb14ea190a344f95"])).product;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 justify-center   items-stretch">
        <div className="grid mx-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 col-span-3">
          {/* @ts-ignore* */}
          <Deals title="Shop Deals in Fashion" category="Women's Fashion" />
          {/* @ts-ignore* */}
          <Deals title="Your mobile essentials" category="Mobile Accessories" />
          {/* @ts-ignore* */}
          <Deals
            title="Easy updates for elevated spaces"
            category="Home Appliances"
          />
          {/* @ts-ignore* */}
          <Deals title="Bring the gym home" category="Fitness Equipments" />
          {/* @ts-ignore* */}
          <Deals title="Hear the beat" category="Headphones" />
          {/* @ts-ignore* */}
          <Deals title="Let's light it up" category="Light Bulbs" />
        </div>
        {topDeal && <TopDeal product={topDeal[0]} />}
      </div>
    </div>
  );
}

export default Section2;
