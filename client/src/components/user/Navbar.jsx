import { useState } from "react";
import { Input, Badge, Menu, Dropdown, Button } from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  DownOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { userPath } from "../../routes/routeConfig";
import Account from "./Account";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categoriesMenu = (items) => (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item}>
          <a href="#">{item}</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <nav className="w-full border-b z-40 fixed">
      <div className="flex flex-wrap items-center container justify-between p-4">
        <div className="flex items-center space-x-5">
          <Link to={userPath.home}>
            <h1 className="text-5xl font-signature text-main-theme">
              Ruramart
            </h1>
          </Link>
          <Input
            size="large"
            placeholder="Search for items..."
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-96 max-w-full mt-2"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-gray-500">
            <HeartOutlined />
            <Badge count={1} className="text-green-500">
              Wishlist
            </Badge>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-gray-500">
            <ShoppingCartOutlined />
            <Badge count={1} className="text-green-500">
              Cart
            </Badge>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Account />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between px-4 py-2">
        <Dropdown
          overlay={categoriesMenu([
            "Fashion",
            "Electronics",
            "Bags",
            "Footwear",
            "Groceries",
            "Beauty",
          ])}
          trigger={["click"]}
        >
          <Button className="bg-green-500 text-white flex items-center space-x-2 hover:bg-green-600">
            <MenuOutlined />
            <span>Browse All Categories</span>
            <DownOutlined />
          </Button>
        </Dropdown>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-black">
            Home
          </a>
          <Dropdown
            overlay={categoriesMenu(["Men", "Women", "Kids"])}
            trigger={["hover"]}
          >
            <a href="#" className="text-black flex items-center">
              Fashion <DownOutlined />
            </a>
          </Dropdown>
          <Dropdown
            overlay={categoriesMenu(["Mobiles", "Laptops", "Cameras"])}
            trigger={["hover"]}
          >
            <a href="#" className="text-black flex items-center">
              Electronics <DownOutlined />
            </a>
          </Dropdown>
          <a href="#" className="text-black">
            Groceries
          </a>
          <a href="#" className="text-black">
            Beauty
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <PhoneOutlined className="text-gray-500" />
          <div>
            <div className="text-green-500 font-bold">1900 - 888</div>
            <div className="text-gray-500 text-sm">24/7 Support Center</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
