import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Avatar, Container } from '@mui/material';
import Header from './Header';

const About = () => {
  return (
    <>
    <Header />
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      {/* Developer Section */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Avatar
          src="/my_pix.jpg"
          alt="Developer Profile"
          sx={{
            width: 150,
            height: 150,
            margin: "0 auto",
            mb: 2,
            border: "3px solid #ddd",
          }}
        />
        <Typography variant="h4" gutterBottom>
          About the Developer
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          Hello, I'm <strong>Uzondu Chidiebube Godwin</strong>, a full stack software 
          engineering student at <strong>Alx Africa</strong>, the passionate mind behind
          <strong> SkillTrack</strong>. My expertise lies in building
          user-centric web applications that solve real-world challenges. With
          a love for technology and education, I strive to create impactful
          solutions that bridge the gap between learning and innovation.
        </Typography>
      </Box>

      {/* About SkillTrack Section */}
      <Box>
        <Typography variant="h4" gutterBottom>
          About SkillTrack
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
          <strong>SkillTrack</strong> was built as part of my final portfolio project
          as a full stack software engineer at <strong>Alx Africa</strong>.
          It is a lightweight learning management
          platform designed to streamline how users interact with educational
          content. Whether you're a learner or an educator, SkillTrack is built
          to make learning simple, efficient, and enjoyable.
          With a little modification, SkillTrack can be adjusted to suit any
          lightweight academic environment.
        </Typography>

        {/* Key Features */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Dynamic Course Management</Typography>
            <Typography variant="body2">
              Browse, enroll, and manage courses with a user-friendly interface.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Progress Tracking</Typography>
            <Typography variant="body2">
              Visual indicators and stats to monitor your learning journey.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Interactive Quizzes</Typography>
            <Typography variant="body2">
              Engage with quizzes to reinforce learning and track
              comprehension.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Responsive Design</Typography>
            <Typography variant="body2">
              Fully optimized for web and mobile to ensure seamless access.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Admin Controls</Typography>
            <Typography variant="body2">
              Tools for instructors to add, update, and manage course content with ease.
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1" sx={{ lineHeight: 1.8, mt: 3, mb: 3 }}>
            Thank you for visiting SkillTrack. Whether you’re here to learn, teach,
            or simply explore, we’re excited to be part of your journey.
            If you have questions, feedback, or ideas, feel free to reach out.
            Together, let’s make learning more accessible and inspiring!
        </Typography>
        <Box>
          <Link to="/contact" style={{ textDecoration: 'underline', color: '#2575fc' }}>
            contact us
          </Link>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default About;
