import React, { useState } from "react";
import Header from "../components/Header";
import {
  EuiFlexGroup,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
} from "@elastic/eui";
import MeetingNameField from "../components/FormComponents/MeetingNameField";
import MeetingUsersField from "../components/FormComponents/MeetingUsersField";
import useFetchUsers from "../hooks/useFetchUsers";
import useAuth from "../hooks/useAuth";
import MeetingDataField from "../components/FormComponents/MeetingDataField";
import moment from "moment";
import CreateMeetinButtons from "../components/FormComponents/CreateMeetinButtons";
import { addDoc } from "firebase/firestore";
import { meetingsRef } from "../utils/FirebaseConfig";
import generateMeetingID from "../utils/generateMeetingID";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import { FieldErrorType, UserType } from "../utils/Types";
import MeetingMaximumUserField from "../components/FormComponents/MeetingMaximumUserField";

const VideoConference = () => {
  useAuth();
  const [users] = useFetchUsers();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
  const [meetingName, setMeetingName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [size, setsize] = useState(1);
  const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });
  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };
  const validateForm = () => {
    let errors = false;
    const clonedShowErrors = { ...showErrors };
    if (!meetingName.length) {
      showErrors.meetingName.show = true;
      showErrors.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrors.meetingName.show = false;
      showErrors.meetingName.message = [];
    }
    if (!selectedUsers.length) {
      clonedShowErrors.meetingUser.show = true;
      clonedShowErrors.meetingUser.message = ["Please select User Name"];
    } else {
      clonedShowErrors.meetingUser.show = false;
      clonedShowErrors.meetingUser.message = [];
    }
    setShowErrors(clonedShowErrors);
    return errors;
  };
  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingsRef, {
        createBy: uid,
        meetingId,
        meetingName,
        meetingType: anyoneCanJoin ? "anyone-can-join" : "video-Conference",
        invitedUsers: anyoneCanJoin
          ? []
          : selectedUsers.map((user: UserType) => user.uid),
        meetingDate: startDate.format("L"),
        maxUser: anyoneCanJoin ? 100 : size,
        status: true,
      });
      createToast({
        title: anyoneCanJoin
          ? "Anyone can join meeting created successfull"
          : "video coneference created successfull",
        type: "success",
      });
      navigate("/");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <EuiFormRow display="columnCompressedSwitch" label="Anyone can join">
            <EuiSwitch
              showLabel={false}
              label="Anyone can join"
              checked={anyoneCanJoin}
              onChange={(e) => setAnyoneCanJoin(e.target.checked)}
              compressed
            />
          </EuiFormRow>
          <MeetingNameField
            label="Meeting Name"
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          {anyoneCanJoin ? (
            <MeetingMaximumUserField value={size} setValue={setsize} />
          ) : (
            <MeetingUsersField
              label="invite User"
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={false}
              isClearable={false}
              placeholder="Select a user"
              isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
            />
          )}
          <MeetingDataField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetinButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
};

export default VideoConference;
