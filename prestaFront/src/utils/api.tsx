// ============================ API ========================

const API_PROVIDER_URL = "http://localhost:3000/providers/";
const API_USER_URL = "http://localhost:3000/users/";
const API_JOB_URL = "http://localhost:3000/jobs/";

// Récupérer les films selon recherche
export const getData = async () => {
  return await fetch(API_PROVIDER_URL).then((response) =>
    response.json()
  );
};

export const getJob = async () => {
  return await fetch(API_JOB_URL).then((response) =>
    response.json()
  );
};

export const login = async (email: string, password: string) => {
  // TODO UPDATE LOGIN WITH BACKEND
  console.log(email, password);
  return { message: "Login successfull ", token: "Token", response: true };
  // return { message: "Login failed", response: false };
}
export const register = async (formData: object) => {
  //! TODO UPDATE REGISTER WITH BACKEND
  const bodyContent = JSON.stringify(formData);

  await fetch(API_USER_URL, {
    method: "POST",
    body: bodyContent,
  }).then((response) => response.json());

  return { message: "Register successfull", response: true, token: "Token" };

}
