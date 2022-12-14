import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CTA from "../../components/CTA";
import ErrorText from "../../components/ErrorText";
import Field from "../../components/Field";
import { toastError } from "../../components/Toast";
import { SignUpModel } from "../../models/signupModel";
import { useSignUpMutation } from "../../services/signupService";
import { signUpValidationSchema } from "../../utils/validation.js";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpMutation, { isLoading: isSigningUp }] = useSignUpMutation();
  const [signUpError, setSignUpError] = useState("")

  const { register, reset, handleSubmit, formState: { errors }, watch } = useForm<SignUpModel>({ mode: 'onChange', resolver: yupResolver(signUpValidationSchema) })

  useEffect(() => {
    if (watch('email')) {
      setSignUpError("")
    }
  }, [watch('email')])


  const handleSignUp = (values: SignUpModel) => {
    signUpMutation(values)
      .unwrap()
      .then((user) => {
        navigate("/avatars");
        reset()
      }).catch((err) => {
        if (err && err.data) {
          setSignUpError(err.data.message)
        }
        else {
          toastError("Something went wrong !")
        }
      });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden px-4">

      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center ">SignUp</h1>
        <form className="mt-6" onSubmit={handleSubmit(handleSignUp)}>
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
              type="email"
              name="email"
            />
            <ErrorText err={errors.email?.message} />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <Field
              {...register("password")}
              type="password"
              name="password"
            />
            <ErrorText err={errors.password?.message || signUpError} />
          </div>
          <div className="mt-6">
            <CTA type={"submit"} isLoading={isSigningUp}>Sign Up</CTA>
          </div>
        </form>

        <div
          className="mt-8 text-xs font-light text-center text-gray-700"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Already have an account?
          <div className="font-medium text-sentBgColor hover:underline mt-2">
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
