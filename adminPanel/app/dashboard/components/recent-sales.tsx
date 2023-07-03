import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../registry/new-york/ui/avatar";

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
    <div className="space-y-8">
      {data.map(({ Name, Email, Image, OrderTotal }) => {
        return (
          <div className="flex items-center" key={Name + Email + OrderTotal}>
            <Avatar className="h-9 w-9">
              <AvatarImage src={Image} alt="Avatar" />
              <AvatarFallback>{Name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{Name}</p>
              <p className="text-sm text-muted-foreground">{Email}</p>
            </div>
            <div className="ml-auto font-medium">+{OrderTotal}</div>
          </div>
        );
      })}
    </div>
  );
}
