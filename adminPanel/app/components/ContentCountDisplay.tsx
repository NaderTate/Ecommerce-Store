type Props = {
  pageNumber: number;
  itemsToShow: number;
  count: number;
  content:
    | "products"
    | "users"
    | "categories"
    | "admins"
    | "reviews"
    | "orders";
};

const ContentCountDisplay = ({
  pageNumber,
  itemsToShow,
  count,
  content,
}: Props) => {
  return (
    <p className="my-5">
      Displaying{" "}
      {(pageNumber - 1) * itemsToShow == 0 ? 1 : (pageNumber - 1) * itemsToShow}{" "}
      -{" "}
      {(count - (pageNumber - 1) * itemsToShow) / itemsToShow > 1
        ? pageNumber * itemsToShow
        : count}{" "}
      of {count} {content}
    </p>
  );
};

export default ContentCountDisplay;
