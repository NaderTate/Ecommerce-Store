import { FaStar } from "react-icons/fa";
import FilterButton from "./FilterButton";
type Props = {
  onChange: (minRating: number | undefined) => void;
};

const RatingFilter = ({ onChange }: Props) => {
  const yellow = "#FFD700";
  const size = 20;
  return (
    <div className="space-y-1">
      <FilterButton className="flex gap-1" onClick={() => onChange(4)}>
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} />
        <span>& up</span>
      </FilterButton>
      <FilterButton className="flex gap-1" onClick={() => onChange(3)}>
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} />
        <FaStar size={size} />
        <span>& up</span>
      </FilterButton>
      <FilterButton className="flex gap-1" onClick={() => onChange(2)}>
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} />
        <FaStar size={size} />
        <FaStar size={size} />
        <span>& up</span>
      </FilterButton>
      <FilterButton className="flex gap-1" onClick={() => onChange(1)}>
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} />
        <FaStar size={size} />
        <FaStar size={size} />
        <FaStar size={size} />
        <span>& up</span>
      </FilterButton>
    </div>
  );
};

export default RatingFilter;
