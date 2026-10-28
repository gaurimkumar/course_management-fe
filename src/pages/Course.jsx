
import React, { useEffect, useMemo, useState } from "react";
import {
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Modal,
} from "@mui/material";

import {
  deleteCourse,
  getCourse,
  updateCourse,
} from "../services/allAPI";

import { toast } from "react-toastify";

const Course = () => {
  const [courseDatas, setCourseDatas] = useState([]);
   const [duplicateDatas, setDuplicateDatas] = useState([]);
  const [searchVal, setSearchVal] = useState("");
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [courseData, setCourseData] = useState({
    name: "",
    courseName: "",
    duration: "",
    fee: "",
    phone: "",
    date: "",
  });

  const [editCourse, setEditCourse] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxWidth: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    maxHeight: "90vh",
    overflowY: "auto",
  };

  useEffect(() => {
    getCourseDatas();
  }, []);

  const getCourseDatas = async () => {
    try {
      const apiResponse = await getCourse();
      setCourseDatas(apiResponse.data);
      setDuplicateDatas(apiResponse.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to get courses");
    }
  };

  // Open modal and load selected course
  

  

  // Update selected course in JSON Server
  const onUpdateClick = async () => {
   try {
      let apiResponse=await updateCourse(editCourse,courseData)
      if(apiResponse.status==200){
        toast.success("Updated successfully")
        handleClose()
        getCourseDatas()
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Updation Failed')
    }
  };

  const onDeleteClick = async (id) => {
    try {
      const apiResponse = await deleteCourse(id);

      if (apiResponse.status === 200) {
        toast.success("Successfully deleted");
        getCourseDatas();
      } else {
        toast.error("Failed to delete course");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete course");
    }
  };


    const onSearchClick = useMemo(() => {

    let filteredData = duplicateDatas.filter((eachData) =>
      eachData.courseName.toLowerCase().includes(searchVal.toLowerCase()),
    );

    setCourseDatas(filteredData);
  }, [searchVal]);

  return (
    <Box>
      <TextField
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder="Search Courses"
        variant="outlined"
        size="small"
      />

      {courseDatas?.map((eachData,index) => (
        <Paper key={index} sx={{ my: 2 }}>
          <CardContent>
            <Typography variant="h5">
              Course Details
            </Typography>

            <Typography>Name: {eachData.name}</Typography>
            <Typography>
              Course Name: {eachData.courseName}
            </Typography>
            <Typography>
              Course Duration: {eachData.duration}
            </Typography>
            <Typography>
              Course Fee: {eachData.fee}
            </Typography>
            <Typography>
              Phone Number: {eachData.phone}
            </Typography>
            <Typography>
              Start Date: {eachData.date}
            </Typography>

            <Button
              variant="contained"
              onClick={() => {
                setCourseData(eachData);
                setEditCourse(eachData.id);
                handleOpen()}}
            >
              Edit
            </Button>

            <Button
              onClick={() => onDeleteClick(eachData.id)}
              variant="contained"
              color="error"
              sx={{ ml: 1 }}
            >
              Delete
            </Button>
          </CardContent>
        </Paper>
      ))}

      <Modal open={open} onClose={handleClose}>
        <Box component="form" sx={style}>
          <Typography variant="h5">
            Edit Course
          </Typography>

          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
             value={courseData?.name} onChange={(e)=>setCourseData({...courseData,name:e.target.value})}
          />

          <TextField
            label="Course Name"
            name="courseName"
            fullWidth
            margin="normal"
            value={courseData?.courseName} onChange={(e)=>setCourseData({...courseData,courseName:e.target.value})}
          />

          <TextField
            label="Course Duration"
            name="duration"
            fullWidth
            margin="normal"
            value={courseData?.duration} onChange={(e)=>setCourseData({...courseData,duration:e.target.value})}
          />

          <TextField
            label="Course Fee"
            name="fee"
            type="number"
            fullWidth
            margin="normal"
        value={courseData?.fee} onChange={(e)=>setCourseData({...courseData,fee:e.target.value})}
          />

          <TextField
            label="Phone Number"
            name="phone"
            type="number"
            fullWidth
            margin="normal"
           value={courseData?.phone} onChange={(e)=>setCourseData({...courseData,phone:e.target.value})}
          />

          <TextField
            label="Start Date"
            name="date"
            type="date"
            fullWidth
            margin="normal"
            value={courseDatas.date} onChange={(e)=>setCourseData({...courseData,date:e.target.value})}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />

          <Button
            variant="contained"
            onClick={onUpdateClick}
            sx={{ mt: 2 }}
          >
            Update Course
          </Button>

          <Button onClick={handleClose} sx={{ mt: 2, ml: 1 }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Course;
