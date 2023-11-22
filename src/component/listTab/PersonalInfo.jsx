import ProtoTypes from "prop-types";

import { useEffect, useState } from "react";
import PersonalInfoFrom from "./PersonalInfoFrom";
import { BsUiChecksGrid } from "react-icons/bs";

export const PersonalInfo = ({ name, activeTab }) => { 
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  
  const urlActual = window.location.href; // Obtener la URL actual
  const partesURL = urlActual.split("/"); // Dividir la URL por '/' para obtener partes individuales
  const id = partesURL[partesURL.length - 1];

  const findUser = async () => {
    const res = await fetch(`http://localhost:4000/api/clients/${id}`);
    const info = await res.json();
    setUser(info.data.client);
  };
  console.log(user)
  useEffect(() => {
    findUser();
  }, []);

  return (
    <div id="tab1" className={`tab-pane ${name === activeTab && "active"}`}>
      <div className="xl:grid grid-cols-12 gap-12 flex 2xl:flex-row flex-col-reverse">
        <PersonalInfoFrom user={user} />

        <div className="2xl:col-span-4 xl:col-span-5 2xl:mt-24">
          <header className="mb-8">
            <h4 className="font-bold text-lg text-bgray-800 dark:text-white mb-2">
              {user.name}
            </h4>
            <p className="mb-4 text-bgray-500">
              {/* Informacion de ${user.name} */}
              <span className="text-bgray-900 dark:text-darkblack-300">
                300x300.
              </span>{" "}
              Gifs work too.
              <span className="text-bgray-900">Max 5mb.</span>
            </p>
            <div className="text-center m-auto w-40 h-40 relative">
              <img  alt="" />
            </div>
          </header>
          <div>
            <h4 className="font-bold text-lg text-bgray-800 dark:text-white mb-2">
              Update Cover
            </h4>
            <p className="mb-4 text-bgray-500 dark:text-bgray-50">
              Cover of at least Size
              <span className="text-bgray-900">1170x920 </span>
            </p>
            <div className="relative w-full">
              <img className="w-full" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
