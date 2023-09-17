import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";
import { Sucess } from "../../component/alerts/Sucess";

const  OptionsTransactions = ({
  userId,
  client,
  sucess,
  handleActive,
  optionsActive,
  handleModify,
  success,
  transaction,
  handleDeleteTransaction,
}) => {

  return (
    <div
      className={
        optionsActive
          ? "fixed inset-0 flex items-center justify-center z-50"
          : "hidden"
      }
    >
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="absolute bg-darkblack-600 p-4 rounded-lg shadow-lg">
          <div className="m-3 flex justify-end ">
            <button
              onClick={handleActive}
              className="bg-red-500 px-2 rounded-md hover:bg-red-600 text-white"
            >
              x
            </button>
          </div>
          <h2 className="text-lg text-center font-semibold mb-4 text-slate-100">
            {`¿Que desea hacer con la transaccion de ${client}?`}
          </h2>

          <div className="flex flex-row justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
                onClick={ e => handleModify(transaction._id)}
              >
                Modificar
              </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4"
              onClick={handleDeleteTransaction(transaction._id)}
            >
              Eliminar
            </button>
          </div>
          {sucess && <Sucess mensaje="Transaccion eliminada con éxito" />}
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
