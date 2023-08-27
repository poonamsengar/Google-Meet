import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import { firebaseAuth, meetingsRef } from "../utils/FirebaseConfig";
import generateMeetingID from "../utils/generateMeetingID";
import MyMeetings from "./MyMeetings";
import { element } from "prop-types";

export default function JoinMeeting() {
  const params = useParams();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const [isAllowed, setIsAllowed] = useState(false);
  const [user, setUser] = useState<any>(undefined);
  const [userLoaded, setUserLoaded] = useState(false);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
    setUserLoaded(true);
  });
  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && userLoaded) {
        const firestoreQuery = query(
          meetingsRef,
          where("meetingId", "==", params.id)
        );
        const fetchedMeetings = await getDocs(firestoreQuery);
        if(fetchedMeetings.docs.length){
          const meeting = fetchedMeetings.docs[0].data();
          const isCraetor = meeting.createBy === user?.uid;
          if(meeting.meetingType === "1-on-1"){
            if(meeting.invitedUsers[0] === user?.uid || isCraetor){
              if(meeting.meetingDate === moment().format("L")){
                setIsAllowed(true);
              }else if(
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ){
                createToast({ title: "Meeting has Ended", type:"danger"});
                navigate(user ? "/" : "/login")
              }else if(moment(meeting.meetingDate).isAfter()) {
                createToast({ 
                  title: `Meeting is on ${meeting.meetingDate}`, 
                  type:"warning"
                })
                navigate(user ? "/" : "/login")
              }
            }else navigate(user ? "/" : "/login")
          } 
         else if(meeting.meetingType === "video-conference"){
          const index = meeting.invitedUsers.findIndex(
            (invitedUser : string) => invitedUser === user?.uid
          )
            if(index !== -1 || isCraetor){
              if(meeting.meetingDate === moment().format("L")){
                setIsAllowed(true);
              }else if(
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ){
                createToast({ title: "Meeting has Ended", type:"danger"});
                navigate(user ? "/" : "/login")
              }else if(moment(meeting.meetingDate).isAfter()) {
                createToast({ 
                  title: `Meeting is on ${meeting.meetingDate}`, 
                  type:"warning"
                })
              }
            }else{
              createToast({ 
                title: "You are not allowed to join this meeting.", 
                type:"danger"
              })
              navigate(user ? "/" : "/login")
            }
          } 
          else {
            setIsAllowed(true)
          }
        }else navigate("/")
      }
    };
    getMeetingData();
  }, [userLoaded]);
 
    const appID  = 483857233;
    const serverSecret = "96fda70226efeaf0c2dfd3ef84b4bcbc" ;

    const MyMeetings = async(element:any)=>{
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        params.id as string,
        user.uid ? user.uid : generateMeetingID(),
        user.displayName ? user.displayName : generateMeetingID()
      )
      console.log(kitToken);
    }
  return 
  <div>
    <div className=""></div>
  </div>
  
}
