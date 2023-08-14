import React, {useState} from 'react'
import Header from '../components/Header'
import { EuiFlexGroup, EuiForm } from '@elastic/eui'
import MeetingNameField from '../components/FormComponents/MeetingNameField'

const OnOneOnMeeting = () => {
    const [meetingName, setMeetingName] = useState("")
  return (
    <div  
    style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
      >
        <Header/>
        <EuiFlexGroup justifyContent='center' alignItems='center'>
            <EuiForm>
                    <MeetingNameField 
                    label="Meeting Name"
                    placeholder="Meeting Name"
                    value={meetingName}
                    setMeetingName={setMeetingName}
                    />
            </EuiForm>
        </EuiFlexGroup>
    </div>
  )
}

export default OnOneOnMeeting