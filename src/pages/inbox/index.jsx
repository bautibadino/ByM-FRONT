import Layout from "../../component/layout";
import ChatBoxLeftBar from "../../component/massage/ChatBoxLeftBar";

import AllMessageRes from "../../component/massage/AllMessageRes";
import Conversions from "../../component/massage/Conversions";

function Inbox() {
  return (
    <Layout>
      <main className="pt-[108px]">
        {/* write your code here */}
        <section className="lg:grid grid-cols-12 relative">
          {/* Left Column  */}
          <ChatBoxLeftBar />
          <AllMessageRes />

          {/* Middle Column */}
          <Conversions />
          {/* Right Column  */}
        </section>
      </main>
    </Layout>
  );
}

export default Inbox;
