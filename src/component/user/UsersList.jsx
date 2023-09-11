import UserData from "./UserData";
import user, { authors } from "../../data/user";
import { useEffect, useState } from "react";

function UsersList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((res) => res.json())
      .then((info) => setUsuarios(info.data.users));
  }, []);
  usuarios.map((user) => console.log(user));

  return (
    <div className="w-full overflow-x-scroll">
      <table className="w-full">
        <tbody>
          {/* {usuarios.map((user) => (
            <UserData key={user._id} userInfo={user} />
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
