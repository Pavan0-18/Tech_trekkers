const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Course Creation Endpoint
app.post('/courses', async (req, res) => {
  const { title, description, instructorId, videoPath } = req.body;

  if (!title || !instructorId || !videoPath) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const course = await prisma.course.create({
      data: { title, description, instructorId, videoPath },
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course', details: error.message });
  }
});

// Get All Courses Endpoint
app.get('/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses', details: error.message });
  }
});

// Enrollment Endpoint
app.post('/enrollments', async (req, res) => {
  const { studentId, courseId } = req.body;
  if (!studentId || !courseId) {
    return res.status(400).json({ error: 'Missing studentId or courseId' });
  }

  try {
    const enrollment = await prisma.enrollment.create({
      data: { studentId, courseId },
    });
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to enroll student', details: error.message });
  }
});

// Start the Server
app.listen(3000, () => console.log('Server running on port 3000'));
