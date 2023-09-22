import React from "react";
import Layout from "../../component/layout";
import { useEffect, useState } from "react";

const Services = ({ children }) => {
  const [services, setServices] = useState([]);


  const handleFetch = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/services");
      if (response.ok) {
        const data = await response.json();
        const dataServices = data.data.servicesWithOwners;
        setServices(dataServices);
      } else {
        console.error("API request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Layout>
      <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
        {/* write your code here */}
        <div className="2xl:flex 2xl:space-x-[48px]">
          <section className="2xl:w-70 w-full 2xl:mb-0 mb-6">
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, { services });
            })}
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Services;
