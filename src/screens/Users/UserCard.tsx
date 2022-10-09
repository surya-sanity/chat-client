import { NavLink } from "react-router-dom";
import { User } from "../../models/userModel";

interface Props {
  user: User
}

const UserCard = (props: Props) => {

  const { user } = props;

  return (
    <div className="flex h-60 bg-white rounded-lg border border-gray-200 shadow-sm p-5 mr-2 mb-2 ">
      <div className="flex flex-col items-center">
        <img className="mb-2 w-24 h-24 rounded-full shadow-lg object-cover" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="User Image" />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{user?.firstName} {user?.lastName}</h5>
        <span className="text-sm text-gray-500 ">Catchphrase</span>
        <div className="flex mt-2 space-x-3">
          <NavLink to={`/chat/${user.id}`} className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-sentBgColor rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 ">Message</NavLink>
        </div>
      </div>
    </div>
  )
}

export default UserCard;