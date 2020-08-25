import { firestore } from 'firebase';

export const collectIdsAndData = <T extends { id: string }>() => (
  doc: firestore.QueryDocumentSnapshot<firestore.DocumentData>
) => ({ id: doc.id, ...doc.data() } as T);
