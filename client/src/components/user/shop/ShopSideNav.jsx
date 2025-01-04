import Brand from "./Brand";
import Category from "./Category";
import Color from "./Color";
import Price from "./Price";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={false} />
      <Color />
      <Brand />
      <Price />
    </div>
  );
};

export default ShopSideNav;
