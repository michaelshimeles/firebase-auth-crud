import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Input,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import {
  signOut
} from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { auth, db } from "../../Firebase";
interface TodoProps {}
type Inputs = {
  todo: string;
};

const Todo: React.FC<TodoProps> = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [todoList, setTodoList] = useState<any>([]);

  const usersRef = collection(db, "users");

  // create's document
  useEffect(() => {
    if (!user) {
      return;
    }
    const getTodo = async () => {
      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);
      const docInfo = docSnap.data();
      setTodoList(docInfo?.tasks);
    };

    getTodo();
  }, [user]);

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
    reset,
  } = useForm<Inputs>();

  if (!user) {
    navigate("/");
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  // Add to document
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newData = {
      task: data.todo,
      done: false,
    };

    // create and add to database
    setDoc(doc(usersRef, user.uid), {
      tasks: [...todoList, newData],
    })
      .then((resp) => {
        setTodoList([...todoList, newData]);
      })
      .catch((error) => {
        console.log(error);
      });

    // clears form field
    reset();
  };

  const handleDelete = async (i: number) => {
    const newTodo = [...todoList];
    newTodo.splice(i, 1);
    await setDoc(doc(usersRef, user.uid), {
      tasks: [...newTodo],
    });
    setTodoList([...newTodo]);
  };

  const handleSelected = async (i: number) => {
    const newTodo = todoList;
    newTodo[i].done = !newTodo[i].done;
    setTodoList([...newTodo]);
    await setDoc(doc(usersRef, user.uid), {
      tasks: [...newTodo],
    });
  };

  return (
    <VStack justify="center" align="center" gap="5rem">
      <Button
      mt="2rem"
        onClick={() => {
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              console.log("Successful Log");
            })
            .catch((error) => {
              // An error happened.
              console.log(error);
            });
        }}
      >Sign Out</Button>
      <VStack mt="10rem" px="1rem">
        <Card>
          <CardHeader>
            <Heading textAlign="center" size="md">
              To-do list
            </Heading>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <HStack>
                <Input {...register("todo", { required: true })} />
                <Button type="submit">Add</Button>
              </HStack>
            </form>
          </CardBody>
        </Card>

        {todoList ? (
          todoList.map((todo: any, index: number) => {
            return (
              <>
                {todo.done === false && (
                  <Flex
                    key={index}
                    bgColor="blue.900"
                    px="1rem"
                    py="0.5rem"
                    rounded="0.5rem"
                    w="321px"
                    justify="space-between"
                    align="center"
                  >
                    <Checkbox
                      isChecked={false}
                      onChange={() => handleSelected(index)}
                    >
                      <Text>{todo.task}</Text>
                    </Checkbox>
                    <Button onClick={() => handleDelete(index)}>Delete</Button>
                  </Flex>
                )}
              </>
            );
          })
        ) : (
          <Spinner />
        )}
      </VStack>

      <VStack w="321px">
        <Heading fontSize="2xl" pt="10rem">
          Completed
        </Heading>
        {todoList ? (
          todoList.map((todo: any, index: number) => {
            return (
              <>
                {todo.done === true && (
                  <Flex
                    key={index}
                    bgColor="blue.900"
                    px="1rem"
                    py="0.5rem"
                    rounded="0.5rem"
                    w="321px"
                    justify="space-between"
                    align="center"
                  >
                    <Checkbox
                      isChecked={true}
                      onChange={() => handleSelected(index)}
                    >
                      <Text as="del">{todo.task}</Text>
                    </Checkbox>
                    <Button onClick={() => handleDelete(index)}>Delete</Button>
                  </Flex>
                )}
              </>
            );
          })
        ) : (
          <Spinner />
        )}
      </VStack>
    </VStack>
  );
};

export default Todo;
