import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

export function useUserRole() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Fallback role for local testing when not logged in
        setRole("Student/Youth");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          setRole(data.role || null);
        } else {
          setRole(null);
        }
      } catch (err) {
        console.error("Failed to load user role", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { role, loading, error };
}

export default useUserRole;

