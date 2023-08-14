import { EuiComboBox, EuiFormRow } from '@elastic/eui';
import React from 'react'

const MeetingUsersField = ({
    label,
    options,
    onChange,
    selectedOptions,
    isClearable,
    placeholder,
}:{
    label:string;
    options:any;
    onChange:any;
    selectedOptions: any;
    isClearable:boolean;
    placeholder:string;
}) => {
  return (
   <EuiFormRow label={label}>
        <EuiComboBox/>
   </EuiFormRow>
  )
}

export default MeetingUsersField