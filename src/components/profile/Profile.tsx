import { auth } from './../../firebaseConfig/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function Profile() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out:', (error as Error).message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser: User | null) => {
      if (!authUser) {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, []); 

  return (
    <>
      <div>profile</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Profile;
