"use client";
import Link from "next/link";
import Image from "next/image";
import { removeFromCart, saveToLater } from "../server_actions/cart";
import { currencySymbol } from "../global_variables";
import QuantityButtons from "./QuantityButtons";
import { Button, Skeleton } from "@nextui-org/react";
import { useState } from "react";

type Props = {
  userId: string;
  product: {
    id: string;
    mainImg: string;
    Title: string;
    Price: number;
  };
  quantity: number;
  id: string;
};

function ProductCard({ userId, product, quantity, id }: Props) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-5">
        <div className="grid grid-cols-3 items-center">
          <Link href={{ pathname: `/products/${product.id}` }}>
            <Image
              width={100}
              height={100}
              className="object-contain rounded-md"
              src={product.mainImg}
              alt={product.Title}
            />
          </Link>
          <div className="col-span-2 space-y-2">
            <p className="line-clamp-1">{product.Title}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                color="danger"
                isLoading={deleting}
                isDisabled={deleting}
                onPress={async () => {
                  setDeleting(true);
                  await removeFromCart(id);
                  setDeleting(false);
                }}
              >
                Delete
              </Button>
              <Button
                size="sm"
                isLoading={saving}
                isDisabled={saving}
                onPress={async () => {
                  setSaving(true);
                  await saveToLater(userId, product.id, id);
                  setSaving(false);
                }}
              >
                Save for later
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <span className="text-center m-auto">
            <span className="sm:hidden">price:</span>
            {currencySymbol}
            <span className="font-bold">{product.Price}</span>
          </span>
          <QuantityButtons
            quantity={quantity}
            id={id}
            setLoading={setLoading}
          />
          <span className="text-center">
            {loading ? (
              <Skeleton
                disableAnimation
                className="h-4 w-10 m-auto rounded-md"
              />
            ) : (
              <>
                <span className="sm:hidden">total:</span> {currencySymbol}
                <span className="font-bold">
                  {(product.Price * quantity).toFixed(2)}
                </span>
              </>
            )}
          </span>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
