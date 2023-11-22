import React from "react";
import Layout from "../../component/layout";
import { NavLink } from "react-router-dom";

export const Products = () => {
  return (
    <Layout>
      <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
       <div className="flex flex-col items-center justify-center ">
          <h1 className="font-bold text-4xl">Productos</h1>
          <div className="flex flex-col items-center justify-center">
            <NavLink to="/" />
          </div>
       </div>
      </main>
    </Layout>
  );
};
