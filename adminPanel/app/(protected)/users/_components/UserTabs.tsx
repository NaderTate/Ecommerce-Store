"use client";
import { Tabs, Tab } from "@nextui-org/react";
import OrderCard from "@/app/components/OrderCard";
import UserAddressCard from "./UserAddressCard";
import Link from "next/link";
import Image from "next/image";
import ReviewCard from "../../reviews/_components/ReviewCard";
import { ProductCardProps, Order } from "@/typings";

type Props = {
  user: {
    Orders: Order[];
    Review: {
      id: string;
      Rating: number;
      Comment: string;
      createdAt: Date;
      Product: {
        mainImg: string;
        id: string;
      };
      User: {
        Name: string;
        Image: string;
        id: string;
      };
    }[];
    Address: {
      Street: string;
      Building: string;
      City: string;
      Landmark: string;
      Country: string;
      PostalCode: string;
    }[];
    WhishList: {
      Product: ProductCardProps;
    }[];
  };
};

const UserTabs = ({ user }: Props) => {
  return (
    <Tabs className="mt-10 ">
      <Tab key="Orders" title="Orders">
        {user?.Orders.map((order) => {
          return <OrderCard key={order.id} order={order} />;
        })}
      </Tab>

      <Tab key="wishList" title="WishList">
        <div className="flex flex-wrap">
          {user?.WhishList.map((product) => {
            return (
              <div className="w-36">
                <Link href={{ pathname: `/products/${product.Product.id}` }}>
                  <Image
                    width={150}
                    height={150}
                    src={product.Product.mainImg}
                    className="object-contain rounded-md "
                    alt={product.Product.Title}
                  />
                </Link>
                <p className={`line-clamp-1 text-xs`}>
                  {product.Product.Title}
                </p>
                <div className="text-xs">${product.Product.Price}</div>
              </div>
            );
          })}
        </div>
      </Tab>
      <Tab key="addresses" title="Addresses">
        {user?.Address.map((address, i) => {
          return <UserAddressCard key={i} address={address} />;
        })}
      </Tab>
      <Tab key="reviews" title="Reviews">
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
      </Tab>
    </Tabs>
  );
};

export default UserTabs;
