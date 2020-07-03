import { firestore } from "firebase";

// TODO: look into options to type this better
export const collectIdsAndData = (
  doc: firestore.QueryDocumentSnapshot<firestore.DocumentData>
) => ({ id: doc.id, ...doc.data() } as any);
