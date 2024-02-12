import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { auth } from './../firebaseConfig/firebaseConfig';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

interface AdminRouteProps {
  element: React.ReactNode;
  location: string;
}

const AdminRoute = ({ element }: AdminRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
      setUser(user);

      if (user) {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const userDocRef = doc(usersCollection, user.uid);

        try {
          const docSnapshot = await getDoc(userDocRef);
          setIsAdmin(docSnapshot.exists() && docSnapshot.data()?.isAdmin == 1);
        } catch (error) {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user === null || isAdmin === null) {
      // Still loading, do nothing
    } else if (user === null || !isAdmin) {
      navigate('/', { replace: true });
    }
  }, [user, isAdmin, navigate]);

  return isAdmin === null ? null : isAdmin ? <>{element}</> : <Navigate to="/" />;
};

export default AdminRoute;
