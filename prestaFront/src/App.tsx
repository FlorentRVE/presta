import React, { useEffect, useState } from "react";
import * as api from "@utils/api";
import * as sort from "@utils/sort";
import * as context from "@utils/context";
import Filters from "@components/Filters";
import Footer from "@components/Footer";
import Header from "@components/Header";
import ToastMessage from "@components/auth/ToastMessage";
import DialogBox from "@components/auth/DialogBox";
import Provider from "@models/provider";
import Jobs from "@models/jobs";
import { CookiesProvider } from "react-cookie";

export const SearchInputContext = context.SearchInputContext();
export const AreaContext = context.AreaContext();
export const JobContext = context.JobContext();
export const JobListContext = context.JobListContext();
export const AuthContext = context.AuthContext();
export const ToastMessageContext = context.ToastMessageContext();

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = React.useState<Provider[]>([]);
  const [job, setJob] = useState<string>("");
  const [jobList, setJobList] = useState<Jobs[]>([]);
  const [area, setArea] = useState<string[]>([
    "North",
    "East",
    "South",
    "West",
  ]);

  useEffect(() => {
    api.getData().then((data) => {
      setData(data);
    });
  }, [searchInput]);

  useEffect(() => {
    api.getJob().then((jobs) => {
      setJobList(jobs);
    });
  }, [setJobList]);

  // Filtre par recherche et zone
  const dataFiltered = sort.dataFilterBySearchandArea(data, searchInput, area);

  // Filtre par Job
  const dataTried = sort.dataFilterByJob(dataFiltered, job);

  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <JobListContext.Provider value={{ jobList, setJobList }}>
        <JobContext.Provider value={{ job, setJob }}>
          <AreaContext.Provider value={{ area, setArea }}>
            <ToastMessageContext.Provider
              value={{ toastMessage, setToastMessage }}
            >
              <SearchInputContext.Provider
                value={{ searchInput, setSearchInput }}
              >
                <AuthContext.Provider value={{ isAuth, setIsAuth }}>
                  <div className="flex flex-col h-screen">
                    <DialogBox />
                    <Header isAuth={isAuth} />
                    <Filters />
                    <main className="flex-1 flex flex-wrap p-4 justify-center items-center gap-4 my-5">
                      {dataTried.map((item) => (
                        <a
                          href="#"
                          className="card w-96 bg-base-200 shadow-xl p-2"
                          key={item.id}
                        >
                          <figure>
                            <img
                              src={item.avatar}
                              alt="Profil"
                              className="rounded-xl m-4"
                            />
                          </figure>
                          <div className="card-body flex flex-col">
                            <h2 className="card-title">{item.name}</h2>
                            <h3 className="card-title text-primary text-xl">
                              {item.job}
                            </h3>
                            <p className="bg-secondary/50 text-white font-bold rounded-2xl w-24 p-1 self-end text-center">
                              {item.area}
                            </p>
                            <p></p>
                          </div>
                        </a>
                      ))}
                    </main>
                    <ToastMessage />

                    <Footer />
                  </div>
                </AuthContext.Provider>
              </SearchInputContext.Provider>
            </ToastMessageContext.Provider>
          </AreaContext.Provider>
        </JobContext.Provider>
      </JobListContext.Provider>
    </CookiesProvider>
  );
}

export default App;
