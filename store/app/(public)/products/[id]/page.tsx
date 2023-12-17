import { prisma } from "@/lib/prisma";

import {
  getProductData,
  getRelatedProducts,
  hasBoughtProduct,
  isFavorite,
} from "./utils";

import Image from "next/image";
import { auth } from "@clerk/nextjs";

import StarRating from "@/components/StarRating";
import ReviewForm from "./_components/ReviewForm";
import ShareButton from "./_components/ShareButton";
import Product_Gallery from "./_components/Product_Gallery";
import AddToCartButton from "./_components/AddToCartButton";
import AddToFavsButton from "./_components/AddToFavsButton";
import ProductsCarousel from "@/components/ProductsCarousel";
import ProductDescription from "./_components/ProductDescription";

import { currencySymbol } from "@/lib/global_variables";

export const revalidate = 100;

export async function generateStaticParams() {
  const products = await prisma.product.findMany();
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });
    if (!product)
      return { title: "Not found", description: "This product does not exist" };
    return {
      title: product?.Title,
      description: product?.Description,
      alternates: {
        canonical: `products/${product?.id}`,
      },
      twitter: {
        card: "summary_large_image",
        site: "@naderexpress",
        title: product?.Title,
        description: product?.Description,
        images: [product?.mainImg || ""],
      },
      openGraph: {
        title: product?.Title,
        images: [
          {
            url: product?.mainImg || "",
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Not found",
      description: "This product does not exist",
    };
  }
}

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  // get product info
  const product = await getProductData(id);
  // get related products
  const relatedProducts =
    product && (await getRelatedProducts(product?.id, product?.CategoryIDs));
  const { userId } = auth();
  //  check if user has bought the product
  const hasBought =
    product && userId && (await hasBoughtProduct(product?.id, userId));
  // check if product is in user's favorites
  const isInFavorites =
    product && userId && (await isFavorite(product?.id, userId));
  return (
    <>
      <div className="px-5 sm:px-10 mt-20">
        <Product_Gallery
          gallery={product?.Images as { id: string; img: string }[]}
        />
        <div className="flex flex-col md:ml-10 lg:pr-56 space-y-5">
          <p className="text-xl sm:text-3xl font-bold tracking-widest">
            {product?.Title}
          </p>
          <StarRating rating={product?.Rating || 4.3} />
          <div className="flex items-center gap-1">
            <span className="text-xs">{currencySymbol}</span>
            <span className="font-bold text-xl">{product?.Price}</span>
          </div>
          <div>
            {product && (
              <>
                <AddToCartButton productID={product?.id} userID={userId} />
                <div className="flex gap-5 relative">
                  <ShareButton
                    productImage={product?.mainImg}
                    productTitle={product?.Title}
                  />
                  <div className="absolute left-20 top-4">
                    <AddToFavsButton
                      productID={product?.id}
                      userID={userId}
                      isFav={isInFavorites || false}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-wrap gap-5 mt-10">
              {product?.Properties?.map(
                ({ name, value }: { name: string; value: string } | any) => {
                  if (value.length === 0) return null;
                  return (
                    <div
                      key={name}
                      className="flex flex-col gap-1 rounded-md border-2 border-divider p-2"
                    >
                      <span className="font-bold">{name}</span>
                      <span>{value}</span>
                    </div>
                  );
                }
              )}
            </div>
            {product?.Description && (
              <ProductDescription description={product.Description} />
            )}
          </div>
        </div>
      </div>
      <div className={`ml-5 ${!product?.Description && "md:mt-28"}`}>
        <h1 className="text-3xl font-bold md:mt-10">You might also like:</h1>
        <ProductsCarousel data={relatedProducts || []} />
      </div>
      <div className="p-5 sm:p-10">
        {userId && product && hasBought && (
          <div>
            <h1>Share your experience with the product:</h1>
            <ReviewForm UserId={userId} ProductId={product.id} />
          </div>
        )}
        <div className="mt-5">
          {product?.Reviews && product?.Reviews?.length > 0 && (
            <div>
              <h1>Customers opinions:</h1>
              {product?.Reviews.map(
                ({ id, Comment, Rating, User: { Name, Image: img } }) => {
                  return (
                    <div className="my-3" key={id}>
                      <div className="flex items-center gap-2">
                        <Image
                          width={50}
                          height={50}
                          src={img}
                          className="object-cover rounded-full"
                          alt=""
                        />
                        <div>
                          <StarRating
                            hideNumber
                            hideReviewsCount
                            rating={Rating}
                          />
                          <span className="font-bold">{Name}: </span>
                          <p className="whitespace-pre-wrap">{Comment}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Page;
