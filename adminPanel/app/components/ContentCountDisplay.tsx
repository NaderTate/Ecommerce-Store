type Props = {
  sk: number;
  itemsToShow: number;
  count: number;
  content: "products" | "users" | "categories" | "admins";
};

const ContentCountDisplay = ({ sk, itemsToShow, count, content }: Props) => {
  return (
    <p className="mt-5">
      Displaying {(sk - 1) * itemsToShow == 0 ? 1 : (sk - 1) * itemsToShow} -{" "}
      {(count - (sk - 1) * itemsToShow) / itemsToShow > 1
        ? sk * itemsToShow
        : count}{" "}
      of {count} {content}
    </p>
  );
};

export default ContentCountDisplay;
