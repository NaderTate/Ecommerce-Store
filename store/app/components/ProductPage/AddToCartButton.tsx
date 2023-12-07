"use client";
import { addToCart } from "@/app/server_actions/cart";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

type Props = {
  userID: string | null;
  productID: string;
};

const AddToCartButton = ({ userID, productID }: Props) => {
  const [loading, setLoading] = useState(false);
  const notify = (message: string) => toast(message);

  return (
    <div>
      <ToastContainer autoClose={1500} />
      {userID ? (
        <div className="flex items-center gap-5">
          <Button
            isLoading={loading}
            isDisabled={loading}
            size="lg"
            color="primary"
            onPress={async () => {
              setLoading(true);
              const res = await addToCart(productID, userID);
              if (res.success) {
                notify("Item added to cart");
              } else {
                notify("Something went wrong");
              }
              setLoading(false);
            }}
          >
            Add to cart
          </Button>
          <Button
            size="lg"
            color="default"
            as={Link}
            href={`/checkout?productId=${productID}`}
          >
            Buy Now
          </Button>
        </div>
      ) : (
        <SignInButton>
          <Button color="primary" size="lg">
            Add to cart
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default AddToCartButton;
