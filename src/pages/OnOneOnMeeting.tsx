import React, { useState } from 'react'
import Header from '../components/Header'
import { EuiFlexGroup, EuiForm, EuiSpacer } from '@elastic/eui'
import MeetingNameField from '../components/FormComponents/MeetingNameFIeld'
import MeetingUsersField from '../components/FormComponents/MeetingUserField'
import useFetchUsers from '../hooks/useFetchUsers'
import useAuth from '../hooks/useAuth'
import MeetingDataField from '../components/FormComponents/MeetingDateField'
import moment from "moment";
import CreateMeetingButtons from '../components/FormComponents/CreateMeetingButtons'
import { addDoc } from 'firebase/firestore'
import { meetingsRef } from '../utils/FirebaseConfig'
import generateMeetingID from '../utils/generateMeetingID'
import { useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router-dom'
import useToast from '../hooks/useToast'
import { FieldErrorType, UserType } from '../utils/Types'


const OnOneOnMeeting = () => {
  useAuth();
  const [users] = useFetchUsers();
  const navigate = useNavigate()
  const [createToast] = useToast();
  const uid = useAppSelector((zoom)=> zoom.auth.userInfo?.uid)
  const [meetingName, setMeetingName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
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
  const createMeeting = async() => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingsRef ,{
        createBy:uid,
        meetingId,
        meetingName,
        meetingType:"1-on-1",
        invitedUsers:[selectedUsers[0].uid],
        meetingDate:startDate.format("L"),
        maxUser:1,
        status:true,
      })
      createToast({
        title:"One on One Meeting Created successfull",
        type: "success",
      })
      navigate("/")
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
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  )
}

export default OnOneOnMeeting