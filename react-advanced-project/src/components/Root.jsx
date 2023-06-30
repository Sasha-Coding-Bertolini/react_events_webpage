import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Root = () => {
  return (
    <Box mt="60px">
      <Navigation />
      <Box mt="20px">
        <Outlet />
      </Box>
      <ToastContainer position="bottom-right" />
    </Box>
  );
};
