import { LoginForm } from "../components/sections/LoginForm";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { Redirect } from "react-router";

export const Login = () => {
  if (localStorage.getItem("accessToken")) {
    return <Redirect to="/home" />;
  } else {
    return (
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    );
  }
};
