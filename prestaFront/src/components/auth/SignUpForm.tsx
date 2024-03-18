// ! (3) react form hook + zod - intégration du champs
import * as api from "@utils/api";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { FaUser } from "react-icons/fa";
import { IoKey, IoKeyOutline, IoMail } from "react-icons/io5";
import { ToastMessageContext, JobListContext } from "@/App";
import FormField from "./FormField";
import { FormData, SignupSchema } from "@/models/formType/SignUpType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function SignUpForm() {
  const [, setCookie] = useCookies(["token"]);
  const [isError, setIsError] = useState(false);
  const { setToastMessage } = useContext(ToastMessageContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { jobList } = useContext(JobListContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: FormData) => {
    // event.preventDefault();

    const { response, token, message } = await api.register(data);

    if (response) {
      setCookie("token", token);
      setToastMessage(message);
      const authModal = document.getElementById(
        "auth_modal"
      ) as HTMLDialogElement;
      authModal.close();
    } else {
      setIsError(true);
      setErrorMessage(message);
      console.log(isError, errorMessage); // !
      setTimeout(() => {
        setIsError(false);
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <form
        className="form-control gap-5"
        onSubmit={handleSubmit(onSubmit)}
        method="dialog"
      >
        <FormField
          type="text"
          placeholder="Username"
          name="username"
          register={register}
          error={errors.username}
          icon={<FaUser />}
        />

        <FormField
          type="select"
          placeholder="Job"
          name="job"
          register={register}
          error={errors.job}
          options={jobList.map((job) => ({ name: job.name, value: job.id }))}
        />

        <FormField
          type="select"
          placeholder="Area"
          name="area"
          register={register}
          error={errors.area}
          options={["Nord", "Sud", "Est", "Ouest"].map((area) => ({
            name: area,
            value: area,
          }))}
        />

        <FormField
          type="email"
          placeholder="Email"
          name="email"
          register={register}
          error={errors.email}
          icon={<IoMail />}
        />

        <FormField
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password}
          icon={<IoKey />}
        />

        <FormField
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
          icon={<IoKeyOutline />}
        />

        <input type="file" name="file" className="grow" />

        <button type="submit" className="btn btn-primary w-1/2 self-end">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
