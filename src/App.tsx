import React from "react";
import { CSSReset, ThemeProvider, Box, Text } from "@chakra-ui/core";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <main>
        <Box
          border="1px"
          borderRadius="md"
          borderColor="gray.300"
          borderLeftWidth="4px"
          borderLeftColor="blue.400"
          m="2"
          p="2"
        >
          <Text>Hello</Text>
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default App;
