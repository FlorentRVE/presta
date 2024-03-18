import { FaFile, FaKey } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { IoMdAlert } from "react-icons/io";
import * as api from "@utils/api";
import { useContext, useState } from "react";
import { ToastMessageContext, JobListContext } from "@/App";
import { useCookies } from "react-cookie";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { SignupSchema } from "@/models/SignupSchema";


function SignUpForm() {
  const [, setCookie] = useCookies(["token"]);
  const [isError, setIsError] = useState(false);
  const { setToastMessage } = useContext(ToastMessageContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { jobList } = useContext(JobListContext);
  const areaList = ["North", "East", "South", "West"];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    const username = event.currentTarget.username.value;
    const area = event.currentTarget.area.value;
    const job = event.currentTarget.job.value;

    const formData = SignupSchema.safeParse({
      email,
      username,
      area,
      job,
      password,
      confirmPassword: password,
    });

    console.log(formData.success, formData);

    const { response, token, message } = await api.register(formData);

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

  const alert = false;
  return (
    <>
      <form
        className="form-control gap-5"
        onSubmit={handleSubmit}
        method="dialog"
      >
        <label className="input input-bordered flex items-center gap-2">
          <MdDriveFileRenameOutline />
          <input
            type="text"
            name="username"
            className="grow"
            placeholder="username"
            required
          />
        </label>

        <label className="">
          <select className="select select-bordered w-full" name="job">
            <option disabled selected>
              Job
            </option>
            <option>All</option>
            {jobList.map((job) => (
              <option key={job.id} value={job.id}>
                {job.name}
              </option>
            ))}
          </select>
        </label>

        <label className="">
          <select className="select select-bordered w-full" name="area">
            <option disabled selected>
              Area
            </option>
            <option>All</option>
            {areaList.map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </select>
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <IoMail />
          <input
            type="email"
            name="email"
            className="grow"
            placeholder="Email"
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <FaKey />
          <input
            type="password"
            name="password"
            className="grow"
            placeholder="Password"
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <FaKey />
          <input
            type="password"
            name="passwordConfirmation"
            className="grow"
            placeholder="Password confirmation"
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <FaFile />
          <input
            type="file"
            name="file"
            className="grow"
            // required
          />
        </label>

        {alert ? (
          <div role="alert" className="alert alert-error">
            <IoMdAlert />
            <span>Error! Task failed successfully.</span>
          </div>
        ) : null}

        <button type="submit" className="btn btn-primary w-1/2 self-end">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
