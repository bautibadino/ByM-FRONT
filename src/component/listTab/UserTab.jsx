import ProtoTypes from "prop-types";
import CustomerInfo from "./CustomerInfo";
import { BsArrowDownUp } from "react-icons/bs";
import { useEffect, useState } from "react";

function  UserTab({ pageSize, searchFilter, success, handleUsersQuantity, currentPage}) {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersToDisplay, setUsersToDisplay] = useState([]);

  const url = "http://localhost:4000/api/clients";

  const fetchData = async (url) => {
    setLoading(true);
    const res = await fetch(url);
    const dataArray = await res.json();
    const sortedClients = dataArray.data.clients.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setAllUsers(sortedClients);
    handleUsersQuantity(sortedClients.length);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  useEffect(() => {
    // Filter users based on the searchFilter input
    if (!searchFilter) {
      setFilteredUsers(allUsers); // When searchFilter is empty, show all clients
    } else {
      const filtered = allUsers.filter((user) =>
        user.name.toLowerCase().includes(searchFilter.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchFilter, allUsers]);

  // recargamos la bd luego de crear un cliente
  useEffect(() => {
    if (success) {
      fetchData(url);
    }
  }, [success]);

  // PAGINACION // 

  useEffect(() => {
    if(currentPage === 1) {
      setUsersToDisplay(filteredUsers.slice(0, pageSize));
      return;
    }else{
      // Calcula el rango de índices para mostrar los usuarios en función de la página actual
      const startIndex = (currentPage) * pageSize;
      const endIndex = startIndex + pageSize;
  
      console.log(startIndex, endIndex)
      setUsersToDisplay(filteredUsers.slice(startIndex, endIndex));
      console.log(usersToDisplay)
      // setFilteredUsers(usersToDisplay)
      // console.log(filteredUsers)

    }
  }, [currentPage, pageSize, filteredUsers]);

  const handleDeleted = (id) => {
    const newUsers = allUsers.filter((user) => user._id !== id);
    setAllUsers(newUsers);
  }

  return (
    <div className="table-content w-full overflow-x-auto">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <table className="w-full">
          {/* Render table rows using filteredUsers instead of users */}
          <tbody>
          <tr className="ml-4 border-b border-bgray-300 dark:border-darkblack-400">
            <td className="inline-block w-[250px] px-6 py-5 lg:w-auto xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="ml-8 text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Nombre cliente
                </span>
              </div>
            </td>
            <td className="px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-center font-medium text-bgray-600 dark:text-bgray-50">
                  Email
                </span>
 
              </div>
            </td>
            <td className="px-6 py-5 xl:px-0">
              <div className="flex items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Localidad
                </span>

              </div>
            </td>
            <td className="w-[165px] px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Cuit
                </span>
              </div>
            </td>
            <td className="px-6 py-5 xl:px-0"></td>
          </tr>
            {usersToDisplay?.map((user, index) =>
              pageSize ? (
                index + 1 <= pageSize && (
                  <CustomerInfo
                    key={user._id}
                    id={user._id}
                    img={user.img}
                    name={user.name}
                    email={user.email}
                    location={user.location}
                    cuit={user.cuit}
                    fetchData={fetchData}
                    handleDeleted={handleDeleted}
                  />
                )
              ) : index < 3 && (
                <CustomerInfo
                  key={user._id}
                  id={user._id}
                  img={user.img}
                  name={user.name}
                  email={user.email}
                  location={user.location}
                  cuit={user.cuit}
                  fetchData={fetchData}
                  handleDeleted={handleDeleted}
                />
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

UserTab.propTypes = {
  pageSize: ProtoTypes.number,
  searchFilter: ProtoTypes.string,
};

export default UserTab;
