import React, { useState, useEffect } from "react";
import { Sucess } from "../alerts/Sucess";

const  PersonalInfoFrom = ({ user }) => {
  const [formData, setFormData] = useState({})
  const { name, cuit, email, phone, location, address } = user;
  const [sucess, setSucess] = useState(false);
  const [formChange, setFormChange] = useState(false);
  useEffect(() => {
    setFormData(user)
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormChange(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formChange &&
    fetch(`http://localhost:4000/api/clients/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSucess(true);

        setTimeout(() => {
          setSucess(false)
          setFormChange(false)
        }, 2000);
      }
      )
  }

  return (
    <div className="2xl:col-span-8 xl:col-span-7">
      <h2 className="dark:text-white text-3xl mb-2">PERFIL DE USUARIO</h2>
      <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-yellow-400 dark:border-darkblack-400 border-b border-bgray-200">
        {name}
      </h3>
      <div className="mt-8">
        <form onSubmit={handleSubmit}>
          {/* Renderizar campos del formulario usando el estado formData */}
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Nombre
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="cuit"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                CUIT
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="cuit"
                value={formData.cuit}
                onChange={handleInputChange}

              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Correo
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="email"
                value={formData.email}
                onChange={handleInputChange}

              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Telefono
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}

              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="location"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Ciudad
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="location"
                value={formData.location}
                onChange={handleInputChange}

              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="address"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Dirección
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="address"
                value={formData.address}
                onChange={handleInputChange}

              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
            >
              Save Profile
            </button>
          </div>
            {
            sucess && <Sucess mensaje={"Perfil actualizado correctamente"} />
            }
        </form>
      </div>
    </div>
  );
}

export default PersonalInfoFrom;
