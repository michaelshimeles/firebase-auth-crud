import React from "react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { Flex } from "@chakra-ui/react";
interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" justify="center" align="center" w="100%">
      <ColorModeSwitcher />
      {children}
    </Flex>
  );
};

export default Layout;
