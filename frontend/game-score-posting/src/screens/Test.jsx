import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdOutlineDeleteOutline } from 'react-icons/md'

function Test() {
  const [value, setValue] = React.useState(dayjs('2022-04-17'));


    return (
        
<DemoItem label="readOnly">
  <DateCalendar defaultValue={dayjs('2022-04-17')} readOnly />
</DemoItem>
    )
}

export default Test