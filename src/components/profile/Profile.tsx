import { auth } from './../../firebaseConfig/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', (error as Error).message);
    }
  };

  return (
    <div>
      <div>profile</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
