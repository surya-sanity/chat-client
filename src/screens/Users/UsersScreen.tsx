import { useGetAllUsersQuery } from "../../services/userService";
import UserCard from "./UserCard";

const UsersScreen = () => {

  const { data: users, isLoading: loading } = useGetAllUsersQuery()

  if (loading) {
    return null
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center scrollbar-thin scrollbar-thumb-sentBgColor scrollbar-track-transparent overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      {
        users?.map((user, index) => (
          <UserCard key={index} user={user} />
        ))
      }
    </div>
  )
}

export default UsersScreen;