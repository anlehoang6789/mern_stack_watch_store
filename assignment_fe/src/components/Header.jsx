import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Avatar, InputGroup, Input } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import "rsuite/dist/rsuite.min.css";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";

const Header = () => {
  const { isLoggedIn, isAdmin, logout, memberId } = useAuth();
  console.log("Is admin:", isAdmin);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   console.log("Token retrieved from cookies:", token);
  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       console.log("Decoded token:", decodedToken);
  //       setIsLoggedIn(true);
  //       setIsAdmin(decodedToken.isAdmin);
  //     } catch (error) {
  //       console.error("Failed to decode token:", error);
  //     }
  //   }
  // }, [setIsLoggedIn, setIsAdmin]);

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setIsAdmin(false);
  //   Cookies.remove("token");
  // };

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
    // You can add your search logic here
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to={"/"} className="flex gap-4">
          <img
            src="https://cdn.tgdd.vn//News/1515264//top-20-logo-dong-ho-dep-tim-hieu-y-nghia-cua-cac-logo-1-800x450.jpg"
            alt="Logo"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-bold text-lg">Hoàng An Watch Store</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4 ml-auto">
        <InputGroup inside>
          <Input
            placeholder="Search watches..."
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />
          <InputGroup.Button onClick={handleSearch}>
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>
        {isLoggedIn ? (
          <Dropdown
            placement="bottomEnd"
            renderToggle={(props, ref) => (
              <Avatar
                {...props}
                src="https://avatars.githubusercontent.com/u/1?v=4"
                circle
                size="md"
                ref={ref}
              />
            )}
          >
            {isAdmin ? (
              <>
                <Dropdown.Item>
                  <Link
                    to={"/brand"}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Brand
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to={"/watches"}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Watches
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to={"/accounts"}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item>
                  <Link to={`/profile/${memberId}`}>Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </>
            )}
          </Dropdown>
        ) : (
          <div className="flex space-x-4">
            <Button appearance="primary">
              <Link to={"/login"}>Log in</Link>
            </Button>
            <Button appearance="ghost">
              <Link to={"/register"}>Register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
