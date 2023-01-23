import { Button, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore"; 

interface SignUpFormProps {}

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const redirect = useNavigate();
  const [userInfo, setUserInfo] = useState<any>(null);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setUserInfo(userCredential);
        setDoc(doc(db, "users", userCredential.user.uid), {
          tasks: []
        });
        
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  };

  if (userInfo) {
    redirect("/todo");
  }

  return (
    <Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>First Name</FormLabel>
        <Input {...register("firstName", { required: true })} />
        <FormLabel pt="1rem">Last Name</FormLabel>
        <Input {...register("lastName", { required: true })} />
        <FormLabel pt="1rem">Email</FormLabel>
        <Input {...register("email", { required: true })} />
        <FormLabel pt="1rem">Password</FormLabel>
        <Input {...register("password", { required: true })} type="password" />
        <Button mt="1rem" type="submit">
          Create Account
        </Button>
        {errors.email && <Text>Email field is required</Text>}
        {errors.password && <Text>Password field is required</Text>}
      </form>
    </Flex>
  );
};

export default SignUpForm;
