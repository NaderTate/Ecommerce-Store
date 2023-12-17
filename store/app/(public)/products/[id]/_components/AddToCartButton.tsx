"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { SignInButton } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";

import { addToCart } from "@/actions/cart";

type Props = {
  userID: string | null;
  productID: string;
};

const AddToCartButton = ({ userID, productID }: Props) => {
  const [loading, setLoading] = useState(false);
  const notify = (message: string) => toast(message);

  return (
    <>
      <ToastContainer autoClose={1500} />
      {userID ? (
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
      ) : (
        <SignInButton>
          <Button color="primary" size="lg">
            Add to cart
          </Button>
        </SignInButton>
      )}
    </>
  );
};

export default AddToCartButton;
