"use client";

import { LoginCredentials, useAuth } from "@/hooks/auth";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth({middleware:"guest"});
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (form: FormData) => {
    
    const data = {
      email : form.get("email"),
      password : form.get("password")
    } as LoginCredentials;
    
    login(setErrors, data);
  };

  return (
    <form action={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
      />
      {errors && <p>{errors[0]}</p>}
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Login;
