import { ReactNode } from "react";
type Props = {
  label: string;
  icon: ReactNode;
  value: string;
  percentage: string;
};

const Card = ({ label, icon, value, percentage }: Props) => {
  return (
    <div className="border-2 border-divider rounded-md p-5">
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between">
          <h5>{label}</h5>
          <span>{icon}</span>
        </div>
        <div className="mt-2">
          <h1 className="font-bold text-xl">{value}</h1>
          <h6 className="text-xs">{percentage}</h6>
        </div>
      </div>
    </div>
  );
};

export default Card;
