import React from "react";
import { Helmet } from "react-helmet";
import AuthLayout from "./layout/AuthLayout";
import LoginForm from "./auth/LoginForm";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Bubble Tea Management System | Login</title>
        <meta
          name="description"
          content="Login to the Bubble Tea Management System"
        />
      </Helmet>

      <AuthLayout
        title="Bubble Tea Management System"
        subtitle="Sign in to manage your bubble tea shop"
        backgroundImage="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&q=80"
      >
        <LoginForm />
      </AuthLayout>
    </div>
  );
};

export default Home;
