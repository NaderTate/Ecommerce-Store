import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderCard from "@/app/components/OrderCard";
import { Product } from "@prisma/client";
import Link from "next/link";
import ReviewCard from "@/app/components/ReviewCard";
import BanButton from "@/app/components/BanButton";

async function page({ params: { id } }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      Orders: true,
      Review: {
        select: {
          id: true,
          Rating: true,
          Comment: true,
          createdAt: true,
          Product: { select: { mainImg: true, id: true } },
          User: { select: { Name: true, Image: true, id: true } },
        },
      },
      Address: true,
    },
  });
  const whishListIDs: Array<string> = [];
  user?.WhishList.map((item: any) => {
    whishListIDs.push(item.id);
  });
  const whishListItems = await prisma.product.findMany({
    where: { id: { in: whishListIDs } },
  });
  const Card = ({ product }: { product: Product }) => {
    return (
      <div className="w-36">
        <Link href={{ pathname: `/products/${product.id}` }}>
          <div className={`relative w-36 h-36`}>
            <Image
              fill
              src={product.mainImg}
              className="object-cover rounded-md "
              alt={product.Title}
            />
          </div>
        </Link>
        <p
          className={`overflow-ellipsis whitespace-nowrap overflow-hidden text-xs`}
        >
          {product.Title}
        </p>
        <div className="text-xs">${product.Price}</div>
      </div>
    );
  };
  return (
    <div className="p-10 sm:p-5">
      {user && (
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="relative  w-36 h-36">
              <Image
                fill
                src={user?.Image}
                alt={user?.Name}
                className="rounded-md object-cover"
              />
            </div>
            <h1 className="text-3xl">{user.Name}</h1>
            <h1 className="text-xl">
              Joined on {user.createdAt.toDateString()}
            </h1>
            <BanButton id={user.id} />
          </div>
          <div className="pl-24">
            <div className="border-2 border-dashed  border-white rounded-md p-10 sm:p-5 space-y-3">
              <div className="flex justify-between">
                <h1>Email</h1>
                <h1>{user.Email}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Gender</h1>
                <h1>{user.Gender}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Birthdate</h1>
                <h1>{user.BirthDate}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Mobile</h1>
                <h1>{user.Phone}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Orders</h1>
                <h1>{user.Orders.length}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Comments</h1>
                <h1>{user.Review.length}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
      <Tabs defaultValue="orders" className=" mt-10 ">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wishList">Whish list</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          {user?.Orders.map((order) => {
            return <OrderCard key={order.id} Order={order} />;
          })}
        </TabsContent>
        <TabsContent value="wishList">
          <div className="flex flex-wrap">
            {whishListItems.map((product) => {
              return <Card key={product.id} product={product} />;
            })}
          </div>
        </TabsContent>
        <TabsContent value="address">
          {user?.Address.map((address) => {
            return (
              <div
                key={address.id}
                className="border border-white p-5 rounded-md w-96 space-y-5"
              >
                <div className="flex justify-between">
                  <h1>Country:</h1>
                  <h1>{address.Country}</h1>
                </div>
                <div className="flex justify-between">
                  <h1>City:</h1>
                  <h1>{address.City}</h1>
                </div>
                <div className="flex justify-between">
                  <h1>Street:</h1>
                  <h1>{address.Street}</h1>
                </div>
                <div className="flex justify-between">
                  <h1>Building:</h1>
                  <h1>{address.Building}</h1>
                </div>
                <div className="flex justify-between">
                  <h1>Postal code:</h1>
                  <h1>{address.PostalCode}</h1>
                </div>
                <div className="flex justify-between">
                  <h1>Lanmark:</h1>
                  <h1>{address.Landmark}</h1>
                </div>
              </div>
            );
          })}
        </TabsContent>
        <TabsContent value="reviews">
          <div className="space-y-5 mt-4">
            {user?.Review.map((review) => {
              return (
                <ReviewCard
                  key={review.id}
                  Comment={review.Comment}
                  id={review.Product.id}
                  mainImg={review.Product.mainImg}
                  Rating={review.Rating}
                  Date={review.createdAt}
                  User={{
                    Name: review.User.Name,
                    Img: review.User.Image,
                    id: review.User.id,
                  }}
                />
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
