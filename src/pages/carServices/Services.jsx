import { Outlet, Router } from "react-router-dom";
import Layout from "../../component/layout";

const Services = ({ children }) => {

  return (
    <Layout>
    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:w-70 w-full 2xl:mb-0 mb-6">
          {
            children
          }
        </section>
      </div>
    </main>
  </Layout>
  );
};

// ServicesContainer.propTypes = {
//   pageSize: ProtoTypes.number,
// };

export default Services;
