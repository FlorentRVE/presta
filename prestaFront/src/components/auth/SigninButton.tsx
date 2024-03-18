
function SigninButton() {
  return (
    <div>
      {" "}
      <button
        className=""
        onClick={() =>
          (
            document.getElementById("auth_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        Sign In
      </button>
    </div>
  );
}

export default SigninButton