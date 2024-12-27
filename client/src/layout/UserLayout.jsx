import PropTypes from "prop-types";
import { useEffect } from "react";
import Footer from "../components/user/Footer";
import { getUser } from "../services/userService";
import Navbar from "../components/user/Navbar";

const UserLayout = ({ children, showFooter = true }) => {
  const logged = localStorage.getItem("userToken") !== null;

  useEffect(() => {
    if (logged) {
      const fetchUserData = async () => {
        try {
          const userResponse = await getUser();
          const encodedUserData = btoa(
            JSON.stringify(userResponse.data.userData)
          );
          localStorage.setItem("userData", encodedUserData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [logged]);

  return (
    <div className="min-h-screen">
      <header className="box-border flex justify-center">
        <Navbar />
      </header>
      <main className="container mx-auto mt-20 px-2 mb-5 min-h-[85vh]">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showFooter: PropTypes.bool,
};

export default UserLayout;
