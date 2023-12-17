import { Avatar } from "@nextui-org/react";
export function RecentSales({
  data,
}: {
  data: Array<{
    Name: string;
    Email: string;
    Image: string;
    OrderTotal: number;
  }>;
}) {
  return (
    <div className="p-5 rounded-md border-2 border-divider h-full">
      <h2 className="font-bold">Recent Sales</h2>
      <h4>You made 265 sales this week!</h4>
      <div className="space-y-5 my-auto mt-5">
        {data.map(({ Name, Email, Image, OrderTotal }) => {
          return (
            <div
              className="flex gap-5 items-center"
              key={Name + Email + OrderTotal}
            >
              <Avatar
                name={Name}
                src={Image}
                showFallback
                // get the first letter of the first and second name
                fallback={Name.split(" ")[0][0] + Name.split(" ")[1][0]}
              />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{Name}</p>
                <p className="text-sm text-default-500">{Email}</p>
              </div>
              <div className="ml-auto font-medium">+{OrderTotal}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
