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
          <Deals title="Shop Deals in Fashion" id="648337b7223afa484880f4fb" />
          {/* @ts-ignore* */}
          <Deals title="Your mobile essentials" id="64833cfd9303ba183b1cd510" />
          {/* @ts-ignore* */}
          <Deals
            title="Easy updates for elevated spaces"
            id="648349be3d5e7e6f8b55811f"
          />
          {/* @ts-ignore* */}
          <Deals title="Bring the gym home" id="64835031082e25fade6967c6" />
          {/* @ts-ignore* */}
          <Deals title="Hear the beat" id="64833db69303ba183b1cd513" />
          {/* @ts-ignore* */}
          <Deals title="Let's light it up" id="648341ba22bf5feb0d8251d2" />
        </div>
        {topDeal && <TopDeal product={topDeal[0]} />}
      </div>
    </div>
  );
}

export default Section2;
