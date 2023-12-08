import FilterButton from "./FilterButton";
type Props = { categories: { id: string; label: string }[] };

const DiscoverMore = ({ categories }: Props) => {
  return (
    <>
      {categories.map((category) => (
        <FilterButton key={category.id} href={`/categories/${category.id}`}>
          {category.label}
        </FilterButton>
      ))}
    </>
  );
};

export default DiscoverMore;
