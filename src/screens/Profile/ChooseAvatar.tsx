import { useState } from "react";
import { AvatarsList } from "../../Assets/avatars";
import { useAppSelector } from "../../store/hooks";
import { getCurrentUser } from "../../store/reducers/userReducer";
import { randomIntFromInterval } from "../../utils/utilFunctions";
import { TiTick } from "react-icons/ti";
import CTA from "../../components/CTA";
import { useUpdateCurrentUserMutation } from "../../services/userService";
import { toastError, toastSuccess } from "../../components/Toast";
import { useNavigate } from "react-router-dom";

const ChooseAvatar = () => {
  const currentUser = useAppSelector(getCurrentUser)
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatar ?? randomIntFromInterval(1, AvatarsList.length).toString());
  const navigate = useNavigate();

  const [updateProfile] = useUpdateCurrentUserMutation()

  const updateAvatar = () => {
    updateProfile({ id: currentUser.id, avatar: selectedAvatar, firstName: currentUser.firstName, lastName: currentUser.lastName }).unwrap().then(() => {
      toastSuccess("Avatar updated !")
      navigate("/users")
    }).catch((err) => {
      if (err && err.data) {
        toastError(err.data.message)
      }
      toastError("Something went wrong !")
    })
  }

  return (
    <div className="bg-white flex flex-col flex-1 rounded-[25px]">
      <div className="text-dark text-3xl mx-auto my-4 mt-6 font font-semibold">
        Choose your Avatar!
      </div>
      <div className="flex flex-row flex-wrap overflow-y-auto py-3 justify-center items-center">
        {AvatarsList.map((item, index) => {
          return (
            <div
              key={index.toString()}
              onClick={() => { setSelectedAvatar(item.id) }}
              className={`m-4 flex justify-center items-center relative hover:scale-150 transition-all hover:bg-secondary rounded-full cursor-pointer ${item.id === selectedAvatar ? "scale-150 bg-secondary" : ""}`}
            >
              <item.svg className="h-20 w-20" />
              {
                item.id === selectedAvatar && <div className="absolute rounded-full bg-green-500 shadow-sm bottom-2 right-2 ">
                  <TiTick size={18} color={'white'} />
                </div>
              }
            </div>
          );
        })}
      </div>
      <div className="max-w-xs mx-auto my-5">
        <CTA onClick={updateAvatar} >{currentUser.avatar ? "Save" : "Proceed"}</CTA>
      </div>
    </div>
  );
};

export default ChooseAvatar;


