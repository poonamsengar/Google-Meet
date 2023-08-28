import React from "react";
import {
  EuiProvider,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiImage,
  EuiSpacer,
  EuiText,
  EuiTextColor,
  EuiButton,
} from "@elastic/eui";
import animation from "../assets/animation.gif";
import logo from "../assets/logo.png";
import { firebaseAuth, usersRef } from "../utils/FirebaseConfig"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { current } from "@reduxjs/toolkit";


const Login = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/")
  })

  const login = async () => {
    const provider = new GoogleAuthProvider();
    
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);
    if (email) {
      const firestorQuery = query(usersRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(firestorQuery);
      if (fetchedUser.docs.length === 0) {
        await addDoc(usersRef, {
          uid,
          name: displayName,
          email,
        });
      }
    }
    dispatch(setUser({uid, name: displayName, email}))
    navigate("/")
  }
  
  return (
    <EuiProvider colorMode="dark" >
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>
                <EuiImage src={animation} alt="logo" />
              </EuiFlexItem>

              <EuiFlexItem>
                <EuiImage src={logo} alt="logo" size="230px" />
                <EuiSpacer size="xs" />
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>one plateform to </EuiTextColor>
                    <EuiTextColor color="#008000	"> Connect</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />
                <EuiButton fill onClick={login}>Login with Google</EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
};

export default Login;
