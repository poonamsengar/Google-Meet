import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";

const CreateMeetinButtons = ({
  createMeeting,
}: {
  createMeeting: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiButton color="danger" fill onClick={() => navigate("/")}>
            Cancel
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton  fill onClick={createMeeting}>
            Submit
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

export default CreateMeetinButtons;
