import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import styles from './signUp.module.scss';
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { auth } from "../../../firebaseConfig/firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
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
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one capital letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
    .required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});


function SignUp() {
  const [verificationSent, setVerificationSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleSignUp = async (values: SignUpFormValues) => {
  try {
    setLoading(true);
    const { email, password } = values;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (userCredential.user) {
      await sendEmailVerification(userCredential.user);
      setVerificationSent(true);
      setLoading(false);
    }
    navigate('/login');
  } catch (error) {
    setVerificationSent(false);
    setLoading(false);
  }
};
  
  return (
    <div className={styles.SignUp}>
      <div className={styles.container}>
        <Formik
          initialValues={{ 
            name: "", 
            email: "", 
            password: "", 
            repeatPassword: "" 
          }}
          onSubmit={handleSignUp}
          validationSchema={SignUpSchema}
        >
          <Form className={styles.form}>
            <div className={styles.row}>
            <div className={styles.UserIcon}>
              <UserOutlined className={styles.icon}/>
            </div>
            </div>
            
            <div className={styles.formGroup}>
              <div><label htmlFor="name">Full Name</label></div>
              <div><Field name="name" type="text" /></div>
              <div className={styles.error}><ErrorMessage name="name" /></div>
            </div>

            <div className={styles.formGroup}>
              <div><label htmlFor="email">Email</label></div>
              <div><Field name="email" type="email" /></div>
              <div className={styles.error}><ErrorMessage name="email" /></div>
            </div>

            <div className={styles.formGroup}>
              <div><label htmlFor="password">Create Password</label></div>
              <div><Field name="password" type="password" /></div>
              <div className={styles.error}><ErrorMessage name="password" /></div>
            </div>

            <div className={styles.formGroup}>
              <div><label htmlFor="repeatPassword">Repeat Password</label></div>
              <div><Field name="repeatPassword" type="password" /></div>
              <div className={styles.error}><ErrorMessage name="repeatPassword" /></div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.login}>Already have an account ?
                <Link to="/login" className={styles.navLink}>
                  <div className={styles.title}>Log in</div>
                </Link>
              </div>
            </div>
            {verificationSent && (
          <div className={styles.verificationMessage}>
            A verification email has been sent. Please check your inbox.
          </div>
        )}
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Sign Up'}
            </button>

          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
