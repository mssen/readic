import React, { useEffect, useState } from "react";
import { CSSReset, ThemeProvider, Box, Text } from "@chakra-ui/core";

import { firestore } from "./firebase";
import { collectIdsAndData } from "./utilitis";

interface UserDoc {
  id: string;
  username: string;
}

function App() {
  const [users, setUsers] = useState<UserDoc[]>([]);

  useEffect(() => {
    const fetchTest = async () => {
      const userSnapshot = await firestore.collection("users").get();
      setUsers(userSnapshot.docs.map(collectIdsAndData<UserDoc>()));
    };
    fetchTest();
  }, []);

  return (
    <ThemeProvider>
      <CSSReset />
      <main>
        {users.map((user) => (
          <Box
            key={user.id}
            border="1px"
            borderRadius="md"
            borderColor="gray.300"
            borderLeftWidth="4px"
            borderLeftColor="blue.400"
            m="2"
            p="2"
          >
            <Text>{user.username}</Text>
          </Box>
        ))}
      </main>
    </ThemeProvider>
  );
}

export default App;
