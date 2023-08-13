import React from "react";
import { useAppSelectore } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import Dashboard1 from "../assets/dashboard1.png";
import Dashboard2 from "../assets/dashboard2.png";
import Dashboard3 from "../assets/dashboard3.png";
import Header from "../components/Header";

const Dashboard = () => {
  useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{ display: "flex", height: "100vh", flexDirection: "column" }}
      >
        <Header/>
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          style={{ margin: "5vh 10vw" }}
        >
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage size="5rem" alt="icon" src={Dashboard1} />}
              title={"Create Meeting"}
              description="Create a new meeting and invite people"
              onClick={() => navigate("/CreateMeeting")}
              paddingSize="xl"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage size="100%" alt="icon" src={Dashboard2} />}
              title={"My Meeting"}
              description="View your create your meeting"
              onClick={() => navigate("/CreateMeeting")}
              paddingSize="xl"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage size="5rem" alt="icon" src={Dashboard3} />}
              title={"Meeting"}
              description="View here the meeing that your Invited"
              onClick={() => navigate("/CreateMeeting")}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
};

export default Dashboard;
