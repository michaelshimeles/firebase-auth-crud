import { Button, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";

interface LoginFormProps {}

type Inputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC<LoginFormProps> = () => {
  const redirect = useNavigate();
  // eslint-disable-next-line
  const [signInInfo, setSignInInfo] = useState<any>(null);
  const [loginError, setLoginError] = useState<any>(null);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // eslint-disable-next-line
        const user = userCredential.user;
        setSignInInfo(userCredential);
        redirect("/todo");
      })
      .catch((error) => {
        const errorCode = error.code;
        // eslint-disable-next-line
        const errorMessage = error.message;
        setLoginError(errorCode);
      });
  };


  return (
    <Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel pt="1rem">Email</FormLabel>
        <Input {...register("email", { required: true })} />
        <FormLabel pt="1rem">Password</FormLabel>
        <Input {...register("password", { required: true })} type="password" />
        <Button mt="1rem" type="submit">
          Login
        </Button>
        {errors.email && <Text>Email field is required</Text>}
        {errors.password && <Text>Password field is required</Text>}
        {loginError === "auth/user-not-found" && (
          <Text>User doesn't exist</Text>
        )}
        {loginError === "auth/wrong-password" && (
          <Text>Password is incorrect</Text>
        )}
        {loginError?.includes("too-many-requests") && (
          <Text>Your account has been temporarily locked, try again later</Text>
        )}
      </form>
    </Flex>
  );
};

export default LoginForm;
