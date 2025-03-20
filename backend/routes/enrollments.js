const express = require('express');
const Enrollment = require('../models/Enrollment');
const router = express.Router();

router.post('/', async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ message: 'Unauthorized' });

  const { courseId } = req.body;
  try {
    const existingEnrollment = await Enrollment.findOne({ studentId: req.user.id, courseId });
    if (existingEnrollment) return res.status(400).json({ message: 'Already enrolled' });

    const enrollment = new Enrollment({ studentId: req.user.id, courseId });
    await enrollment.save();
    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error enrolling', error: err.message });
  }
});

module.exports = router;