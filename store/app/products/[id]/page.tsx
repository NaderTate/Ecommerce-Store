import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import StarRating from "@/app/components/StarRating";
import Product_Gallery from "@/app/components/Product_Gallery";
import Slider from "@/app/components/Slider";
import BuyOptions from "@/app/components/BuyOptions";
import LoginToBuy from "@/app/components/LoginToBuy";
import ReviewForm from "@/app/components/ReviewForm";
// export const revalidate = 60;
// export async function generateStaticParams() {
//   const products = await prisma.product.findMany();
//   return products.map((product) => ({ id: product.id }));
// }
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });
  return {
    title: product?.Title,
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
}
const Page = async ({ params: { id } }: { params: { id: string } }) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000000));
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      Reviews: {
        select: {
          id: true,
          Comment: true,
          Rating: true,
          User: { select: { Name: true, Image: true } },
        },
      },
    },
  });
  const relatedProducts = await prisma.product.findMany({
    where: { CategoryIDs: { hasSome: product?.CategoryIDs } },
  });
  const { userId } = auth();
  let favs;
  if (userId) {
    favs = await prisma.user.findFirst({
      where: {
        AND: [{ UserId: userId }, { WhishList: { has: { id: product?.id } } }],
      },
      select: { WhishList: true },
    });
  }
  return (
    <div>
      <div className="p-5 sm:p-10">
        <div className="md:sticky md:float-left md:top-2 md:w-[40vw] md:mr-10">
          <Product_Gallery gallery={product?.Images} />
        </div>
        <div className="flex flex-col md:ml-10">
          <div className="lg:pr-56 space-y-5">
            <p className="text-xl sm:text-3xl font-bold tracking-widest">
              {product?.Title}
            </p>
            <div className="flex gap-2">
              <StarRating rating={product?.Rating || 4.3} />
              <span>{product?.Reviews.length} Reviews</span>
            </div>
            $<span className="font-bold text-xl">{product?.Price}</span>
            <div>
              {product &&
                (userId ? (
                  <BuyOptions
                    favorites={favs?.WhishList}
                    userId={userId}
                    id={product?.id}
                    mainImg={product.mainImg}
                    title={product.Title}
                  />
                ) : (
                  <LoginToBuy
                    mainImg={product?.mainImg}
                    title={product?.Title}
                  />
                ))}
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
              <div className="sm:mt-10 sm:min-h-[300px] whitespace-pre-wrap">
                {product?.Description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:ml-5">
        <Slider title="You might also like" data={relatedProducts} />
      </div>
      <div className="p-5 sm:p-10">
        <h1>Review the product:</h1>
        {userId && product && (
          <ReviewForm UserId={userId} ProductId={product.id} />
        )}
        <div className="space-y-5 mt-5">
          <h1>Customers opinions:</h1>
          {product?.Reviews.map(
            ({ id, Comment, Rating, User: { Name, Image } }) => {
              return (
                <div key={id}>
                  <div className="flex items-center  gap-2">
                    <img src={Image} className="w-12 rounded-full" alt="" />
                    <div>
                      <StarRating hideNumber rating={Rating} />
                      <span className="font-bold">{Name}: </span>
                      <p className="whitespace-pre-wrap">{Comment}</p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
export default Page;
