import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { userPath } from "../../routes/routeConfig";
import { Link, useNavigate } from "react-router-dom";
import LoginCard from "../../components/common/LoginCard";
import { forgotPassword } from "../../services/userService";
import { hideLoading, showLoading } from "../../redux/alertSlice";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await forgotPassword(values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(userPath.resetOTP, { state: { email: response.data.email } });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <LoginCard>
      <h2 className="font-bold text-3xl text-dark-purple">Forgot Password</h2>
      <p className="text-sm mt-3 text-dark-purple">
        Enter email to reset your password
      </p>
      <Form className="flex flex-col mt-4" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
              type: "email",
            },
          ]}
        >
          <label className="relative cursor-pointer">
            <Input
              placeholder="Email"
              className="p-2 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-opacity-80 absolute left-2 top-0 px-1 transition text-gray-400 duration-200 input-text">
              Email
            </span>
          </label>
        </Form.Item>
        <Button
          size="large"
          className="text-white font-semibold hover:scale-105 duration-300"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form>
      <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className="border-gray-400" />
        <p className="text-center text-sm">OR</p>
        <hr className="border-gray-400" />
      </div>
      <div className="mt-3 text-sm flex justify-center items-center text-dark-purple py-4">
        <p>Don&apos;t have an account?</p>
        <Link
          to={userPath.register}
          className="pl-1 text-blue-900 font-semibold hover:text-blue-500 hover:underline"
        >
          Register
        </Link>
      </div>
    </LoginCard>
  );
}

export default ForgotPassword;
