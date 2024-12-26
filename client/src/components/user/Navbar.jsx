import { useState } from "react";
import { Input, Badge, Menu, Dropdown, Button } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  DownOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

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
    <div className="w-full border-b bg-white">
      {/* Top Section */}
      <div className="flex flex-wrap items-center justify-between p-4">
        {/* Logo and Search */}
        <div className="flex items-center space-x-4">
          <img
            src="https://placehold.co/150x50"
            alt="Shopstic Logo"
            className="h-10"
          />
          <Input
            size="large"
            placeholder="Search for items..."
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-96 max-w-full"
          />
        </div>

        {/* Right Options */}
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
            <UserOutlined />
            <span>Account</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-gray-100">
        {/* Categories */}
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

        {/* Navigation Links */}
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

        {/* Support */}
        <div className="flex items-center space-x-2">
          <PhoneOutlined className="text-gray-500" />
          <div>
            <div className="text-green-500 font-bold">1900 - 888</div>
            <div className="text-gray-500 text-sm">24/7 Support Center</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
