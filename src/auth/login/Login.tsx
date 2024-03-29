import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from './login.module.scss';
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { auth } from "../../firebaseConfig/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import ForgotPasswordModal from "../forgot-password/ForgetPassword";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { setUser } from "../../redux-fetching/userSlice";
import { database } from "../../firebaseConfig/firebaseConfig";
import { useDispatch } from "react-redux";

interface LogInFormValues {
  email: string;
  password: string;
}

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;


const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
    .test('valid-email-format', 'Invalid email.', (value) => {
      if (!emailRegex.test(value)) {
        return false;
      }
      return true;
    }),
  password: Yup.string()
    .required('Required'),
});


function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const handleLogIn = async (values: LogInFormValues) => {
    try {
      setLoading(true);
      const { email, password } = values;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user && !user.emailVerified) {
        setLoginError('Please verify your email before logging in. Check your inbox.');
        setLoading(false);
        return;
      }

      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const userDoc = await getDoc(doc(usersCollection, user.uid));

      if(userDoc.exists() && userDoc.data().isAdmin){
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (error) {
      setLoginError('Invalid email or password');
      setLoading(false);
    }
  };

const handleForgotPasswordClick = () => {
  setForgotPasswordVisible(true);
};

const handleForgotPasswordClose = () => {
  setForgotPasswordVisible(false);
};

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const db = collection(database, 'users');
      const userDocRef = doc(db, user.uid);

      try {
        const docSnapshot = await getDoc(userDocRef);
        const isAdmin = docSnapshot.exists() && docSnapshot.data()?.isAdmin == 1;

        dispatch(setUser({ isAdmin, isSignedIn: true }));
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(setUser({ isAdmin: false, isSignedIn: false }));
    }
    
  });

  return () => unsubscribe();
}, [dispatch]);

  return (
    <>
    <div className={styles.SignUp}>
      <div className={styles.container}>
        <Formik
          initialValues={{ 
            email: "", 
            password: "", 
        }}
          onSubmit={handleLogIn}
          validationSchema={SignUpSchema}
        >
          <Form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.UserIcon}>
                <UserOutlined className={styles.icon}/>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div><label htmlFor="email">Email</label></div>
              <div><Field name="email" type="email" /></div>
              <div className={styles.error}><ErrorMessage name="email" /></div>
            </div>

            <div className={styles.formGroup}>
              <div><label htmlFor="password">Password</label></div>
              <div><Field name="password" type="password" /></div>
              <div className={styles.error}><ErrorMessage name="password" /></div>
            </div>

            {loginError && <div className={styles.error}>{loginError}</div>}

            <div className={styles.formGroup}>
              <div className={styles.login}>Do not have an account ?
                <Link to="/signup" className={styles.navLink}>
                  <div className={styles.title}>Sign Up</div>
                </Link>
              </div>
            </div>
            <div className={styles.forgotPassword} onClick={handleForgotPasswordClick}>
          Forgot Password ?
        </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Log In'}
            </button>
          </Form>
        </Formik>
      </div>
      <ForgotPasswordModal open={forgotPasswordVisible} onClose={handleForgotPasswordClose} />
    </div>
    </>
    
  );
}

export default Login;
