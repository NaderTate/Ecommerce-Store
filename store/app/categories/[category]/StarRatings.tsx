import { FaStar } from "react-icons/fa";
type Props = {};

const StarRatings = (props: Props) => {
  const yellow = "#FFD700";
  const size = 20;
  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} />
        <span>& up</span>
      </div>
      <div className="flex gap-1">
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} />
        <FaStar size={size} />
        <span>& up</span>
      </div>
      <div className="flex gap-1">
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} />
        <FaStar size={size} />
        <FaStar size={size} />
        <span>& up</span>
      </div>
      <div className="flex gap-1">
        <FaStar size={size} fill={yellow} />
        <FaStar size={size} />
        <FaStar size={size} />
        <FaStar size={size} />
        <FaStar size={size} />
        <span>&up</span>
      </div>
    </div>
  );
};

export default StarRatings;
