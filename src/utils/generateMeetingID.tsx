import React from 'react'

const generateMeetingID = () => {
    let meetingID = "";
    const chars = "123456789qwertyuiopasdfghjklmnbvcxzMNBVCXZLKJHGFDSAPOIUYTREWQ";
    const maxPos = chars.length;

    for (let i = 0; i < 8; i++) {
        meetingID += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return meetingID;
}

export default generateMeetingID
