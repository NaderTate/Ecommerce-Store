"use client";
import { Tabs, Tab } from "@nextui-org/react";
import OrderCard from "@/app/components/OrderCard";
import UserAddressCard from "./UserAddressCard";
import ReviewCard from "../../reviews/_components/ReviewCard";
import { ProductCardProps, Order } from "@/typings";
import ProductCard from "@/app/components/OrderCard/ProductCard";

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
        {user.Orders.length == 0
          ? "This user has no order yet..."
          : user?.Orders.map((order) => {
              return <OrderCard key={order.id} order={order} />;
            })}
      </Tab>

      <Tab key="wishList" title="WishList">
        <div className="flex flex-wrap gap-5">
          {user.WhishList.length == 0
            ? "This user doesn't have any items in the wishlist"
            : user?.WhishList.map((product) => {
                return (
                  <div className="w-36" key={product.Product.id}>
                    <ProductCard product={product.Product} />
                  </div>
                );
              })}
        </div>
      </Tab>
      <Tab key="addresses" title="Addresses">
        {user.Address.length == 0
          ? "This user hasn't added any addresses yet..."
          : user?.Address.map((address, i) => {
              return <UserAddressCard key={i} address={address} />;
            })}
      </Tab>
      <Tab key="reviews" title="Reviews">
        <div className="flex flex-wrap gap-5 mt-4">
          {user.Review.length == 0
            ? "This user hans't made any revies yet..."
            : user?.Review.map((review) => {
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
