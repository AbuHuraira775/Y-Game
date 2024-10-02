import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import React from 'react'
import { CiEdit } from 'react-icons/ci'
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material'

function Test() {
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const [page, setPage] = React.useState(1);

  const handleChange = (e, p) => {
    setPage(p);
  }

  return (
    <>
    <div className="allPosts">

    <div className="cpost">
        <div className="postCard">
          <div className="postContent">
            <div className="cpks c center"><p>PKS</p></div>
            <div className="creport c"><p>Reports 123</p></div>
            <div className="cdate  c"><p>12-09-2024</p></div>
          </div>
        </div>
        <div className="clink b"><p>www.google.com</p></div>
      </div>

      
      <div className="cpost">
        <div className="postCard">
          <div className="postContent">
            <div className="cpks c center"><p>PKS</p></div>
            <div className="creport c"><p>Reports 123</p></div>
            <div className="cdate  c"><p>12-09-2024</p></div>
          </div>
        </div>
        <div className="clink b"><p>www.google.com</p></div>
      </div>


      
      <div className="cpost">
        <div className="postCard">
          <div className="postContent">
            <div className="cpks c center"><p>PKS</p></div>
            <div className="creport c"><p>Reports 123</p></div>
            <div className="cdate  c"><p>12-09-2024</p></div>
          </div>
        </div>
        <div className="clink b"><p>www.google.com</p></div>
      </div>


      
      <div className="cpost">
        <div className="postCard">
          <div className="postContent">
            <div className="cpks c center"><p>PKS</p></div>
            <div className="creport c"><p>Reports 123</p></div>
            <div className="cdate  c"><p>12-09-2024</p></div>
          </div>
        </div>
        <div className="clink b"><p>www.google.com</p></div>
      </div>



      
      <div className="cpost">
        <div className="postCard">
          <div className="postContent">
            <div className="cpks c center"><p>PKS</p></div>
            <div className="creport c"><p>Reports 123</p></div>
            <div className="cdate  c"><p>12-09-2024</p></div>
          </div>
        </div>
        <div className="clink b"><p>www.google.com</p></div>
      </div>



      
      <div className="cpost">
        <div className="postCard">
          <div className="postContent">
            <div className="cpks c center"><p>PKS</p></div>
            <div className="creport c"><p>Reports 123</p></div>
            <div className="cdate  c"><p>12-09-2024</p></div>
          </div>
        </div>
        <div className="clink b"><p>www.google.com</p></div>
      </div>




      
      <div className="cpost">
        <div className="postCard">
          <div className="postContent">
            <div className="cpks c center"><p>PKS</p></div>
            <div className="creport c"><p>Reports 123</p></div>
            <div className="cdate  c"><p>12-09-2024</p></div>
          </div>
        </div>
        <div className="clink b"><p>www.google.com</p></div>
      </div>
    </div>
    </>
  )
}

export default Test