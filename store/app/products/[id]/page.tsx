import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import StarRating from "@/app/components/ProductPage/StarRating";
import Product_Gallery from "@/app/components/ProductPage/Product_Gallery";
import ProductsCarousel from "@/app/components/ProductsCarousel";
import ReviewForm from "@/app/components/ReviewForm";
import Image from "next/image";
import AddToCartButton from "@/app/components/ProductPage/AddToCartButton";
import ShareButton from "@/app/components/ProductPage/ShareButton";
import AddToFavsButton from "@/app/components/ProductPage/AddToFavsButton";
import {
  getProductData,
  getRelatedProducts,
  hasBoughtProduct,
  isFavorite,
} from "./utils";
import ProductDescription from "@/app/components/ProductPage/ProductDescription";
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
    <div>
      <div className="p-5 sm:p-10 mt-10">
        <Product_Gallery gallery={product?.Images} />
        <div className="flex flex-col md:ml-10 lg:pr-56 space-y-5">
          <p className="text-xl sm:text-3xl font-bold tracking-widest">
            {product?.Title}
          </p>
          <StarRating rating={product?.Rating || 4.3} />
          <div className="flex items-center gap-1">
            <span>$</span>
            <span className="font-bold text-xl">{product?.Price}</span>
          </div>
          <div>
            {product && (
              <div>
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
              </div>
            )}

            <div className="flex flex-wrap gap-5 mt-10">
              {product?.Properties &&
                Object.keys(product?.Properties).map(function (key) {
                  //  @ts-ignore
                  if (!product?.Properties[key] < 1) {
                    return (
                      <div key={key}>
                        {/* @ts-ignore */}
                        {key}: {product?.Properties[key]}
                      </div>
                    );
                  }
                })}
            </div>
            <ProductDescription description={product?.Description || ""} />
          </div>
        </div>
      </div>
      <div className="md:ml-5">
        <h1 className="text-3xl font-bold">You might also like:</h1>
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
    </div>
  );
};
export default Page;
