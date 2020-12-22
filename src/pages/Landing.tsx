import { Redirect } from "react-router-dom";
import { LandingLayout } from "../components/layouts/LandingLayout";
import { Hero } from "../components/sections/Hero";

export const Landing = () => {
  return localStorage.getItem("accessToken") ? (
    <Redirect to="/home" />
  ) : (
    <LandingLayout>
      <Hero />
    </LandingLayout>
  );
};
