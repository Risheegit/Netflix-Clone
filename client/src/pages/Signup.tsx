import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import { SignupContainer as Container } from "../globalStyles";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      // if (password.length > 6) {
      //   await createUserWithEmailAndPassword(firebaseAuth, email, password);
      //   navigate("/");
      // } else {
      //   alert("Password should be more than 6 charecters");
      // }
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      navigate("/");
    } catch (err: any) {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        alert("The email is already registered");
      } else if (err.code === "auth/weak-password") {
        //Weak password
        alert("The password is very weak. Please change");
      } else if (err.code === "auth/invalid-email") {
        // Invalid email
        alert("Invalid error");
      } else if (err.code === "auth/internal-error") {
        // Maybe password or email is missing
        alert("Please enter both email and password");
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  }, []);

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          {showPassword && <button onClick={handleSignIn}>Sign Up</button>}
        </div>
      </div>
    </Container>
  );
}

export default Signup;

// interface IContainerProps {
//   showPassword: boolean;
// }

// const Container = styled.div<IContainerProps>`
//   position: relative;
//   .content {
//     position: absolute;
//     top: 0;
//     left: 0;
//     background-color: rgba(0, 0, 0, 0.5);
//     height: 100vh;
//     width: 100vw;
//     display: grid;
//     grid-template-rows: 15vh 85vh;
//     .body {
//       gap: 1rem;
//       .text {
//         gap: 1rem;
//         text-align: center;
//         font-size: {
//             sm: 200rem,
//             xs: 20rem;
//         }
//         h1 {
//           padding: {
//               md: 0 25rem,
//               sm: 0 2rem;
//             }
//           }
//         }
//       }
//       .form {
//         display: grid;
//         grid-template-columns: ${({ showPassword }) =>
//           showPassword ? "1fr 1fr" : "2fr 1fr"};
//         width: 60%;
//         input {
//           color: black;
//           border: none;
//           padding: 1.5rem;
//           font-size: 1.2rem;
//           border: 1px solid black;
//           &:focus {
//             outline: none;
//           }
//         }
//         button {
//           padding: 0.5rem 1rem;
//           background-color: #e50914;
//           border: none;
//           cursor: pointer;
//           color: white;
//           font-weight: bolder;
//           font-size: 1.05rem;
//         }
//       }
//       button {
//         padding: 0.5rem 1rem;
//         background-color: #e50914;
//         border: none;
//         cursor: pointer;
//         color: white;
//         border-radius: 0.2rem;
//         font-weight: bolder;
//         font-size: 1.05rem;
//       }
//     }
//   }
// `;
