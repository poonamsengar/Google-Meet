import React, { useState } from 'react'
import Header from '../components/Header'
import { EuiFlexGroup, EuiForm, EuiSpacer } from '@elastic/eui'
import MeetingNameField from '../components/FormComponents/MeetingNameField'
import MeetingUsersField from '../components/FormComponents/MeetingUsersField'
import useFetchUsers from '../hooks/useFetchUsers'
import useAuth from '../hooks/useAuth'
import MeetingDataField from '../components/FormComponents/MeetingDataField'
import moment from "moment";
import CreateMeetinButtons from '../components/FormComponents/CreateMeetinButtons'
import { FieldErrorType } from '../utils/Types'
import { addDoc } from 'firebase/firestore'

const OnOneOnMeeting = () => {
  useAuth();
  const [users] = useFetchUsers();
  const [meetingName, setMeetingName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [startDate, setStartDate] = useState(moment());
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
  })
  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions)
  }
  const validateForm = () => {
    let errors = false;
    const clonedShowErrors = { ...showErrors }
    if (!meetingName.length) {
      showErrors.meetingName.show = true;
      showErrors.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrors.meetingName.show = false;
      showErrors.meetingName.message = []
    }
    if(!selectedUsers.length){
      clonedShowErrors.meetingUser.show =true;
      clonedShowErrors.meetingUser.message = ["Please select User Name"]
    }else{
      clonedShowErrors.meetingUser.show =false;
      clonedShowErrors.meetingUser.message = []
   }
    setShowErrors(clonedShowErrors);
    return errors;
  };
  const createMeeting = () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingRef,{
        createBy:uid,
        meetingId,
        meetingName,
        meetingType:"1-on-1",
        invitedUsers:[selectedUsers[0]],
        meetingDate:startDate.format("L"),
      })
    }
  }
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent='center' alignItems='center'>
        <EuiForm>
          <MeetingNameField
            label="Meeting Name"
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          <MeetingUsersField
            label="invite User"
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a user"
            isInvalid = {showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
          />
          <MeetingDataField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetinButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  )
}

export default OnOneOnMeeting