import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addCourse } from '../services/allAPI'
import { toast } from 'react-toastify'


const Home = () => {

  const navigate= useNavigate()

    const [courseData,setCourseData]=useState({
        name:"",
        courseName:"",
        duration:"",
        fee:0,
        phone:0,
        date:""
    })

   const onAddBtn=async()=>{

     try {
      if (
      courseData.name == "" ||
      courseData.courseName == "" ||
      courseData.lduration == "" ||
      courseData.fee == 0 ||
      courseData.phone == 0 ||
      courseData.date == "" 
      
    ) {
      toast.error("Please Fill The Form");
    }else{
      
      let apiResponse=await addCourse(courseData)

      if(apiResponse.status==201){
        toast.success('Successfully added course')
        navigate(`/course`)
          
      }else{
        toast.error("Something went wrong while adding course")

      }

    }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong while adding resume')
    }

    

   }


  return (
   <>
   <Box>
      <Typography variant="h5">
        Course Management
      </Typography>

      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={courseData.name}

          onChange={(e) =>
                setCourseData({ ...courseData, name: e.target.value })
              }
      />

      <TextField
        label="Course Name"
        fullWidth
        margin="normal"
        value={courseData.courseName}

              onChange={(e) =>
                setCourseData({ ...courseData, courseName: e.target.value })
              }
      />

      <TextField
        label="Course Duration"
        fullWidth
        margin="normal"
        value={courseData.duration}

          onChange={(e) =>
                setCourseData({ ...courseData, duration: e.target.value })
              }
      />

      <TextField
        label="Course Fee"
        type="number"
        fullWidth
        margin="normal"
        value={courseData.fee}

          onChange={(e) =>
                setCourseData({ ...courseData,  fee: e.target.value })
              }
      />

      <TextField
        label="Phone Number"
        type='number'
        fullWidth
        margin="normal"
        value={courseData.phone}

          onChange={(e) =>
                setCourseData({ ...courseData, phone: e.target.value })
              }
      />

      <TextField
        label="Start Date"
        type="date"
        
        margin="normal"
        slotProps={{
          inputLabel: { shrink: true }
        }}
        value={courseData.date}

          onChange={(e) =>
                setCourseData({ ...courseData, date: e.target.value })
              }
      />
      <br />

      <Button onClick={onAddBtn} variant="contained" >
        Add Course
      </Button>
    </Box>
    </>
  )
}

export default Home