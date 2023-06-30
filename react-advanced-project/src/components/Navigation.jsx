import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bg="gray.900"
      color="white"
      p={4}
      boxShadow="md"
      zIndex="9999"
    >
      <Flex align="center">
        <Box mr={4}>
          <Link to="/">Events</Link>
        </Box>
      </Flex>
    </Box>
  );
};
