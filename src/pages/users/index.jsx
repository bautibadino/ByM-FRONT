import Layout from "../../component/layout";
import UserFilter from "../../component/forms/UserFilter";
import UsersList from "../../component/user/UsersList";
import RightSidebar from "../../component/user/RightSidebar";

function Users() {
  return (
    <Layout
      bg="dark:bg-darkblack-700"
      overlay={
        <div
          style={{ zIndex: 25 }}
          className="aside-overlay block sm:hidden w-full h-full fixed left-0 top-0 bg-black bg-opacity-30"
        ></div>
      }
    >
      <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px] ">
        {/* write your code here */}
        <div className="flex 2xl:flex-row 2xl:space-x-11 flex-col space-y-20">
          <div className="2xl:flex-1 w-full">
            <UserFilter />
            <UsersList />
          </div>
          <RightSidebar />
        </div>
      </main>
    </Layout>
  );
}

export default Users;
