import { useAppSelector } from "../store/hooks"
import { getAllUsers } from "../store/reducers/userReducer"

export const useGetUserByIdHook = (userId: string) => {
  const allUsers = useAppSelector(getAllUsers)

  const user = allUsers.find((user) => user.id === userId)

  return { user }
}

