import Skeleton from "../../components/skeleton";
import { useGetAllUsersQuery } from "../../services/userService";
import UserCard from "./UserCard";

const UsersScreen = () => {
  const { data: users, isLoading: loading } = useGetAllUsersQuery();

  return (
    <div className="bg-white flex flex-col flex-1 rounded-[25px]">
      <div className="text-dark text-3xl mx-auto font font-semibold p-5">
        Users
      </div>
      <div className="flex flex-row flex-wrap overflow-y-auto  justify-center items-center">
        {(!loading && users && users.length > 0) ? users.map((user, index) => {
          return <UserCard user={user} key={index} />;
        })
          : <Skeleton />
        }
      </div>
    </div>
  );
};

export default UsersScreen;
