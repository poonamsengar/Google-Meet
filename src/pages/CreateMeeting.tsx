import React from 'react'
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import { useNavigate } from 'react-router-dom';
import meeting1 from "../assets/meeting1.png"
import meeting2 from "../assets/meeting2.png"

const CreateMeeting = () => {
    useAuth();
    const navigate = useNavigate();
    return (
        <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}
        >
            <Header />
            <EuiFlexGroup justifyContent="center"
                alignItems="center"
                style={{ margin: "5vh 10vw" }}>

                <EuiFlexItem>
                    <EuiCard icon={<EuiImage size="100%" alt="icon" src={meeting1} />}
                        title={"Create One on One Meeting"}
                        description="Create a new meeting and your friend people"
                        onClick={() => navigate("/create1on1")}
                        paddingSize="xl" />
                </EuiFlexItem>

                <EuiFlexItem>
                    <EuiCard icon={<EuiImage size="100%" alt="icon" src={meeting1} />}
                        title={"Video Confrenss Meeting"}
                        description="Invited your Group Member"
                        onClick={() => navigate("/videoConfiguration")}
                        paddingSize="xl" />
                </EuiFlexItem>

            </EuiFlexGroup>
        </div>
    )
}

export default CreateMeeting
