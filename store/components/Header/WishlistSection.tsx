import ProductCard from "../ProductCard";
import Link from "next/link";

type Props = {
  Whishlist: {
    wishlistItems: {
      Product: {
        id: string;
        Title: string;
        Price: number;
        mainImg: string;
        secondImage: string;
      };
    }[];
    totalCount: number;
  } | null;
};

const WishlistSection = ({ Whishlist }: Props) => {
  return (
    <div className="p-5 dark:text-white">
      <div className="flex flex-wrap  gap-5 items-center">
        {Whishlist && Whishlist?.wishlistItems.length > 0
          ? Whishlist?.wishlistItems.map(({ Product }) => {
              return (
                <div key={Product?.id} className="w-36">
                  <ProductCard product={Product} />
                </div>
              );
            })
          : "Your whish list is empty :("}
        {Whishlist && Whishlist?.totalCount > 7 && (
          <div className="">
            <Link
              className="font-bold tracking-wider"
              href={{ pathname: "/whishlist" }}
            >
              +{Whishlist?.totalCount - 7} more items
            </Link>
          </div>
        )}
      </div>
      <Link
        className="font-bold tracking-wider"
        href={{ pathname: "/whishlist" }}
      >
        Manage your whish list
      </Link>
    </div>
  );
};

export default WishlistSection;
