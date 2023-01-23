import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Progress,
} from "@chakra-ui/react";
import React from "react";
import Layout from "../../components/Layout/Layout";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
// eslint-disable-next-line
import { onAuthStateChanged } from "firebase/auth";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (user) {
    navigate("/todo");
    return (
      <Layout>
        <Progress isIndeterminate size="xs" />
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex justify="center" align="center">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignUpForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Layout>
  );
};

export default Home;
