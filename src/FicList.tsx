import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/core';

import { collectIdsAndData } from './utilitis';

interface Props {
  feedRef: firebase.firestore.CollectionReference<
    firebase.firestore.DocumentData
  >;
  feedId: string;
}

interface FicAuthor {
  link: string;
  name: string;
}

interface FicChapters {
  current: number;
  total: number | null;
}

interface FicDoc {
  id: string;
  author: FicAuthor;
  categories: Record<string, string>[];
  chapters: FicChapters;
  characters: Record<string, string>[];
  language: string;
  published: firebase.firestore.Timestamp;
  reating: string;
  relationships: Record<string, string>[];
  summary: string;
  tags: Record<string, string>[];
  title: string;
  updated: firebase.firestore.Timestamp;
  url: string;
  warnings: Record<string, string>[];
  words: number;
}

const FicList = ({ feedRef, feedId }: Props) => {
  const [fics, setFics] = useState<FicDoc[]>([]);

  useEffect(() => {
    const fetchFics = async () => {
      const ficsSnapshot = await feedRef.doc(feedId).collection('fics').get();
      setFics(ficsSnapshot.docs.map(collectIdsAndData<FicDoc>()));
    };
    fetchFics();
  });

  return (
    <React.Fragment>
      {fics.map((fic) => (
        <Box
          border="1px"
          borderRadius="md"
          borderColor="gray.300"
          borderLeftWidth="4px"
          borderLeftColor="blue.400"
          m="2"
          p="2"
          key={fic.id}
        >
          {fic.title}
        </Box>
      ))}
    </React.Fragment>
  );
};

export default FicList;
