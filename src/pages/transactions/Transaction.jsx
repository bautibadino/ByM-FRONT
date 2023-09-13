
import Layout from "../../component/layout";
import TeamChat from "../../component/teamChat";
import Wallet from "../../component/wallet";
import ListTab from "./ListTab";

const Transaction = () => {
  // ESTE APARTADO ES PARA REGISTRAR MOVIMIENTOS DIARIOS DE CAJA, SIN MUCHO DETALLE
  return (
    <Layout>
      <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
        {/* write your code here */}
        <div className="2xl:flex 2xl:space-x-[48px]">
          <section className="2xl:w-70 w-full 2xl:mb-0 mb-6">
            <ListTab pageSize={50} />
          </section>
          <section className="2xl:flex-1 w-full">
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default Transaction;
