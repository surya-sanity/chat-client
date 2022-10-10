import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CTA from "../../components/CTA";
import ErrorText from "../../components/ErrorText";
import Field from "../../components/Field";
import Skeleton from "../../components/skeleton";
import { toastError, toastSuccess } from "../../components/Toast";
import { User } from "../../models/userModel";
import { useUpdateCurrentUserMutation } from "../../services/userService";
import { useAppSelector } from "../../store/hooks";
import { getCurrentUser } from "../../store/reducers/userReducer";
import { profileValidationSchema } from "../../utils/validation";
import { UserAvatar } from "../Users/UserCard";
import { MdModeEditOutline } from 'react-icons/md'
import { useSignOutHook } from "../../hooks/signOutHook";

const ProfileScreen = () => {

  const currentUser = useAppSelector(getCurrentUser);
  const navigate = useNavigate()
  const { signOut } = useSignOutHook()

  const { register, handleSubmit, setValue, reset, formState: { errors, isDirty } } = useForm<User>({
    mode: 'onChange', resolver: yupResolver(profileValidationSchema), defaultValues: currentUser
  })

  const [updateProfile, { isLoading: updating }] = useUpdateCurrentUserMutation()

  useEffect(() => {
    if (currentUser) {
      setValue("avatar", currentUser.avatar)
      setValue("firstName", currentUser.firstName)
      setValue("lastName", currentUser.lastName)
    }
  }, [currentUser])

  if (!currentUser) {
    return <Skeleton />
  }

  const onSubmit = (values: any) => {
    updateProfile({ id: values.id, avatar: values.avatar, firstName: values.firstName, lastName: values.lastName }).unwrap().then(() => {
      toastSuccess("Profile updated !")
    }).catch((err) => {
      if (err && err.data) {
        toastError(err.data.message)
      }
      toastError("Something went wrong !")
    })
  }

  return (
    <div className="bg-white flex flex-col flex-1 rounded-[25px]">
      <div className="text-dark text-3xl mx-auto font font-semibold p-5">
        Profile
      </div>
      <div className="flex flex-col overflow-y-auto mx-5">

        <div className="mx-auto cursor-pointer relative"
          onClick={() => { navigate('/avatars') }}
        >
          <UserAvatar userId={currentUser.id} />
          <div className="absolute bg-sentBgColor bottom-2 right-2 rounded-full p-1">
            <MdModeEditOutline size={20} color={"white"} />
          </div>
        </div>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              First Name
            </label>
            <Field
              {...register("firstName")}
              type="text"
              name="firstName"
            />
            <ErrorText err={errors.firstName?.message} />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              Last Name
            </label>
            <Field
              {...register("lastName")}
              type="text"
              name="lastName"
            />
            <ErrorText err={errors.lastName?.message} />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <Field
              {...register("email")}
              type="text"
              name="email"
              disabled={true}
            />
            <ErrorText err={errors.email?.message} />
          </div>
          <div className="mt-6 max-w-xs mx-auto flex flex-col gap-y-5">
            <CTA
              disabled={(!isDirty)}
              isLoading={updating}
              type={"submit"}>{"Save"}</CTA>
            <CTA
              onClick={signOut}
              isLoading={false}
              className="bg-red-500 hover:bg-red-600 focus:outline-none focus:bg-red-500">Log Out</CTA>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ProfileScreen;
