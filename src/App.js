import * as React from "react";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import InputTag from "./input";

export default function App() {
  return (
    <ChakraProvider>
      <InputTag />
    </ChakraProvider>
  );
}

