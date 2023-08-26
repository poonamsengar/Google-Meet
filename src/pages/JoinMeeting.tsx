import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, meetingsRef } from "../utils/FirebaseConfig";
import { Firestore, getDocs, query, where } from "firebase/firestore";
import moment from "moment";

const JoinMeeting = () => {
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
                    where("meeting", "==", params.id)
                );
                const fetchedMeetings = await getDocs(firestoreQuery);
               
                if (fetchedMeetings.docs.length) {
                    const meeting = fetchedMeetings.docs[0].data();
                    const isCreator = meeting.createBy === user?.uid;
                    if (meeting.meetingType === "1-on-1") {
                        if (meeting.invitedUsers[0] === user?.uid || isCreator) {
                            if (meeting.meetingDate === moment().format("L")) {
                                setIsAllowed(true);
                            } else if (
                                moment(meeting.meetingDate).isBefore(moment().format("L"))
                            ) {
                                createToast({ title: "Meeting has ended.", type: "danger" });
                                navigate(user ? "/" : "/login");
                            } else if (moment(meeting.meetingDate).isAfter()) {
                                createToast({
                                    title: `Meeting is on ${meeting.meetingDate}`,
                                    type: "warning",
                                });
                                navigate(user ? "/" : "/login");
                            }
                        } else navigate(user ? "/" : "/login");
                    }
                    else if (meeting.meetingType === "video-conference") {
                        const index = meeting.invitedUsers.findIndex(
                            (invitedUser: string) => invitedUser === user?.uid
                        );
                        if (index !== -1 || isCreator) {
                            if (meeting.meetingDate === moment().format("L")) {
                                setIsAllowed(true);
                            } else if (
                                moment(meeting.meetingDate).isBefore(moment().format("L"))
                            ) {
                                createToast({ title: "Meeting has ended.", type: "danger" });
                                navigate(user ? '/' : "/login")
                            } else if (moment(meeting.meetingDate).isAfter()) {
                                createToast({
                                     title: "Meeting has ended.",
                                      type: "danger",
                                     });
                            }
                        }
                        else {
                            createToast({
                                title: `you are not invited to the meeting.`,
                                type: "warning",
                            })
                            navigate(user ? "/" : "/login")
                        }
                    }
                    else {
                        setIsAllowed(true);
                    }
                } 
            }
        };
        getMeetingData();
    }, [userLoaded]);

    return(
        <div>
            <h1>Join Meeting</h1>
        </div>
    )

};

export default JoinMeeting;
