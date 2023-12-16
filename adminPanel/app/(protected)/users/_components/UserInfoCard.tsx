type Props = {
  user: {
    Email: string;
    Gender: string;
    BirthDate: string;
    Phone: string;
    OrdersCount: number;
    CommentsCount: number;
  };
};

const UserInfoCard = ({ user }: Props) => {
  return (
    <div className="border-2 border-dashed  border-divider rounded-md p-10 sm:p-5 space-y-3">
      <div className="flex justify-between">
        <h1>Email</h1>
        <h1>{user.Email}</h1>
      </div>
      <div className="flex justify-between">
        <h1>Gender</h1>
        <h1>{user.Gender}</h1>
      </div>
      <div className="flex justify-between">
        <h1>Birthdate</h1>
        <h1>{user.BirthDate}</h1>
      </div>
      <div className="flex justify-between">
        <h1>Mobile</h1>
        <h1>{user.Phone}</h1>
      </div>
      <div className="flex justify-between">
        <h1>Orders</h1>
        <h1>{user.OrdersCount}</h1>
      </div>
      <div className="flex justify-between">
        <h1>Comments</h1>
        <h1>{user.CommentsCount}</h1>
      </div>
    </div>
  );
};

export default UserInfoCard;
