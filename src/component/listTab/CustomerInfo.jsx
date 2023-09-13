import ProtoTypes from "prop-types";
import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import OptionsMenu from "./OptionsMenu";
function CustomerInfo({ id, img, name, email, location, cuit, fetchData, handleDeleted}) {
  const [optionsActive, setOptionsActive] = useState(false);
  const [sucess , setSucess] = useState(false);
  const handleModify = (e) => {

  };

  const handleDelete = async (e) => {
    console.log(id)
    await fetch(`http://localhost:4000/api/clients/${id}`, {
      method: "DELETE",
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Cliente eliminado con éxito", data);
        handleDeleted(id);
        setSucess(true);

        })
      .catch((error) => {
        console.error("Error al eliminar el cliente", error);
      }
    );
    setTimeout(() => {
      handleDisable();
    }, 1400);
  };
  const handleDisable = (e) => {
    setOptionsActive(false);
  };

  
  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
      <td className="px-6 py-5 xl:px-0">
        <div className="flex w-full items-center space-x-2.5 text-center">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img
              src={img}
              alt="avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {name}
          </p>
        </div>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {email}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {location}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {cuit}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <div className="flex justify-center">
          <button
            aria-label="Options"
            type="button"
            onClick={() => setOptionsActive(true)}
          >
            <SlOptionsVertical />
          </button>
          <OptionsMenu
            nombre={name}
            handleDisable={handleDisable}
            active={optionsActive}
            handleModify={handleModify}
            handleDelete={handleDelete}
            sucess={sucess}
            userId={id}
          />
        </div>
      </td>
    </tr>
  );
}

CustomerInfo.propTypes = {
  img: ProtoTypes.string,
  name: ProtoTypes.string,
  email: ProtoTypes.string,
  location: ProtoTypes.string,
  spent: ProtoTypes.string,
};

export default CustomerInfo;
