import { useState } from "react";
import Layout from "../../component/layout";
import SettingsSidebar from "../../component/settings/SettingsSidebar";
import TermsAndCondition from "../../component/settings/TermsAndCondition";
import Security from "../../component/settings/Security";
import Faq from "../../component/settings/Faq";
import Payment from "../../component/settings/Payment";
import ProgramAndResources from "../../component/settings/ProgramAndResources";
import Notification from "../../component/settings/Notification";
import PersonalInfo from "../../component/settings/PersonalInfo";

function Settings() {
  const [activeTab, setActiveTab] = useState("personalInfo");
  return (
    <Layout>
      <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px]">
        {/* write your code here */}
        <div className="grid grid-cols-1 xl:grid-cols-12 bg-white dark:bg-darkblack-600 rounded-xl">
          {/* Sidebar  */}
          <SettingsSidebar
            activeTab={activeTab}
            handleActiveTab={setActiveTab}
          />
          {/* Tab Content  */}
          <div className="py-8 px-10 col-span-9 tab-content">
            {/* Personal Information */}
            <PersonalInfo name="personalInfo" activeTab={activeTab} />
            {/* Notification  */}
            <Notification name="notification" activeTab={activeTab} />
            {/* Program & Resources  */}
            <ProgramAndResources
              name="programAndResources"
              activeTab={activeTab}
            />
            {/* Payments  */}
            <Payment name="payment" activeTab={activeTab} />
            {/* Faq  */}
            <Faq name="faq" activeTab={activeTab} />
            {/* Security Password  */}
            <Security name="security" activeTab={activeTab} />
            {/* Terms & Condition  */}
            <TermsAndCondition
              name="termsAndConditions"
              activeTab={activeTab}
            />
          </div>
        </div>
        {/* write your code here */}
      </main>
    </Layout>
  );
}

export default Settings;
