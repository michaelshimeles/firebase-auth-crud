import React from "react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { Flex } from "@chakra-ui/react";
interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" justify="center" align="center" w="100%">
      <Flex w="90%" justify="flex-end" align="center">
        <ColorModeSwitcher />
      </Flex>
      {children}
    </Flex>
  );
};

export default Layout;
