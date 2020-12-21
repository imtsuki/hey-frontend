import { LandingLayout } from "../components/layouts/LandingLayout";
import { SignupForm } from "../components/sections/SignupForm";
import { Redirect } from "react-router";

export const Signup = () => {
  if (localStorage.getItem("accessToken")) {
    return <Redirect to="/home" />;
  } else {
    return (
      <LandingLayout>
        <SignupForm />
      </LandingLayout>
    );
  }
};
