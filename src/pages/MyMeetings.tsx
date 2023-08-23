import React, { useEffect, useState } from "react";
import { MeetingType } from "../utils/Types";
import { useAppSelector } from "../app/hooks";
import { getDocs, query, where } from "firebase/firestore";
import { meetingsRef } from "../utils/FirebaseConfig";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from "@elastic/eui";
import moment from "moment";
import { Link } from "react-router-dom";

const MyMeetings = () => {
  useAuth();
  const [meeting, setMeetings] = useState<any>([]);
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
  useEffect(() => {
    console.log("in effect", userInfo);
    if (userInfo) { 
      const getmyMeetigs = async () => {
        const firetoreQuery = query(
          meetingsRef,
          where("createdBy", "==", userInfo?.uid)
        );
        const fetchedMeetings = await getDocs(firetoreQuery);

        if (fetchedMeetings.docs.length) {
          const myMeetings: Array<MeetingType> = [];
          fetchedMeetings.forEach((meeting) => {
            myMeetings.push({
              docId: meeting.id,
              ...(meeting.data() as MeetingType),
            });
          });
          setMeetings(myMeetings);
        }
      };
      console.log({ meeting });
      getmyMeetigs();
    }
  }, [userInfo]);

  const columns = [
    {
      field: "meetingName",
      name: "Meeting name",
    },
    {
      field: "meetingType",
      name: "Meeting Type",
    },
    {
      field: "meetingDate",
      name: "Meeting Date",
    },
    {
      field: "",
      name: "Status",
      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return (
              <EuiBadge color="success">
                <Link
                  style={{ color: "black" }}
                  to={`/join/${meeting.meetinId}`}
                >
                  join now
                </Link>
              </EuiBadge>
            );
          } else if(
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ){
            return <EuiBadge color="default">Ended</EuiBadge>;
          }else{
            return <EuiBadge color="default">Upcoming</EuiBadge>;
          }
        }else return <EuiBadge color="danger">Cancelled</EuiBadge>;
      },
    },
    {
      field: "",
      name: "Edit",
      render:(meeting:MeetingType)=>{
        return <EuiButtonIcon aria-label="meeting-edit" iconType="indexEdit" />
      }
    },
    {
      field: "meetingId",
      name: "Copy Link",
      render: (meetingId: string) => {
        return (
          <EuiCopy
            textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
          >
            {(copy: any) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                aria-label="Meeting-copy"
              />
            )}
          </EuiCopy>
        );
      },
    },
  ];
  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header />
      <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meeting} columns={columns} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

export default MyMeetings;
