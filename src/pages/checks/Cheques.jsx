import React, { useEffect, useState } from "react";
import Layout from "../../component/layout";
import { NavLink } from "react-router-dom";

export const Cheques = ({children}) => {
    const [cheques, setCheques] = useState([]);
    
    const getCheckInfo = () =>{
        fetch('http://localhost:4000/api/checks')
        .then (response => response.json())
        .then (data => setCheques(data.data))
    }
    useEffect(()=>{
        getCheckInfo();
    }
    ,[])

  return (
    <Layout>
      <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
        <div className="w-full flex flex-row justify-start items-center mb-4">
            <NavLink to={'/cheques/nuevo-cheque'} className={' px-4 py-2 bg-yellow-400 mx-2 rounded-md'}><button>crear</button></NavLink>
            <NavLink to={'/cheques/consulta'} className={' px-4 py-2 bg-yellow-400 mx-2 rounded-md'}><button>buscar</button></NavLink>
        </div>
          <section className="bg-slate-200 w-full rounded-md dark:bg-darkblack-600">
          {React.Children.map(children, (child) => {
              return React.cloneElement(child, cheques );
            })}
          </section>
      </main>
    </Layout>
  );
};
