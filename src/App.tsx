import React, { useEffect, useState } from "react";
import { CSSReset, ThemeProvider, Box, Text } from "@chakra-ui/core";

import { firestore } from "./firebase";
import { collectIdsAndData } from "./utilitis";
import FicList from "./FicList";

interface UserDoc {
  id: string;
  username: string;
}

interface FeedDoc {
  id: string;
  lastRead: firebase.firestore.Timestamp;
  url: string;
  name: string;
}

function App() {
  const [user, setUser] = useState<UserDoc>();
  const [feeds, setFeeds] = useState<FeedDoc[]>([]);

  const [feedRef, setFeedRef] = useState<
    firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  >();

  useEffect(() => {
    const fetchTest = async () => {
      const userRef = firestore.collection("users").doc("VZp12eWFrMFxp5wFzWAd");

      const userDoc = await userRef.get();
      if (userDoc.exists) {
        setUser(userDoc.data() as UserDoc);
      }

      const ref = userRef.collection("feeds");
      setFeedRef(ref);
      const feedSnapshot = await ref.get();
      setFeeds(feedSnapshot.docs.map(collectIdsAndData<FeedDoc>()));
    };
    fetchTest();
  }, []);

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
          <Text>{user?.username ?? "No user found"}</Text>
        </Box>
        {feeds.map((feed) => (
          <React.Fragment key={feed.id}>
            <Text>
              {feed.name} was last read at {feed.lastRead.toDate().toString()}
            </Text>
            <FicList feedId={feed.id} feedRef={feedRef!} />
          </React.Fragment>
        ))}
      </main>
    </ThemeProvider>
  );
}

export default App;
