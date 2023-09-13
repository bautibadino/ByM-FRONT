import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";

const OptionsTransactions = ({
  userId,
  nombre,
  sucess,
  active,
  handleModify,
  handleDelete,
  handleDisable,
}) => {

  console.log(userId)
  return (
    <div
      className={
        active
          ? "fixed inset-0 flex items-center justify-center z-50"
          : "hidden"
      }
    >
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="absolute bg-darkblack-600 p-4 rounded-lg shadow-lg">
          <div className="m-3 flex justify-end ">
            <button
              onClick={handleDisable}
              className="bg-red-500 px-2 rounded-md hover:bg-red-600 text-white"
            >
              x
            </button>
          </div>
          <h2 className="text-lg text-center font-semibold mb-4 text-slate-100">
            {`¿Que desea hacer con ${nombre}?`}
          </h2>

          <div className="flex flex-row justify-center">
            <NavLink to={`/clientes/${userId}`}>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
                onClick={handleModify}
              >
                Modificar
              </button>
            </NavLink>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
          {/* {sucess && <Sucess mensaje="Cliente eliminado con éxito" />} */}
        </div>
      </div>
    </div>
  );
};

OptionsTransactions.propTypes = {
  active: PropTypes.bool,
  handlePopup: PropTypes.func,
  handleModify: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default OptionsTransactions;
