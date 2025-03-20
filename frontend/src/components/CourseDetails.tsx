import React, { useState } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import { useAuth } from '../AuthContext';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  videoPath: string;
}

const CourseDetails: React.FC<{ course: Course; onBack: () => void }> = ({ course, onBack }) => {
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const { user } = useAuth();

  const handleEnroll = () => {
    setEnrolling(true);
    const token = localStorage.getItem('token');
    axios
      .post('http://localhost:3000/enrollments', { studentId: user?.id, courseId: course.id }, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      .then(() => {
        setEnrolled(true);
        setEnrolling(false);
      })
      .catch((err) => {
        console.error('Enrollment error:', err);
        setEnrolling(false);
      });
  };

  if (!user || user.role !== 'student') return <div>Unauthorized</div>;

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-indigo-50 to-gray-200 min-h-screen">
      <button
        onClick={onBack}
        className="mb-8 px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-full hover:from-indigo-700 hover:to-indigo-900 transition-all duration-300 shadow-lg font-medium animate-fade-in"
      >
        ← Back to Courses
      </button>
      <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl p-8 border-4 border-indigo-200 max-w-4xl mx-auto relative overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500 rounded-bl-full opacity-20" />
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-4 tracking-tight">{course.title}</h2>
        <p className="text-gray-700 text-base mb-6 leading-relaxed italic">{course.description}</p>
        <div className="text-gray-600 text-sm mb-8 space-y-3">
          <p className="flex items-center">
            <span className="font-semibold text-indigo-600 mr-2">👩‍🏫 Instructor:</span>{' '}
            {course.instructor}
          </p>
          <p className="flex items-center">
            <span className="font-semibold text-indigo-600 mr-2">⏳ Duration:</span>
            <span className="text-teal-600 font-medium">{course.duration}</span>
          </p>
        </div>
        <VideoPlayer courseId={course.id} />
        <div className="mt-8 text-center">
          {enrolling ? (
            <p className="text-lg text-indigo-600 font-semibold bg-indigo-100 py-2 px-4 rounded-full inline-block shadow-md animate-pulse">
              Enrolling...
            </p>
          ) : enrolled ? (
            <p className="text-lg font-semibold text-green-600 bg-green-100 py-2 px-4 rounded-full inline-block shadow-md animate-bounce">
              🎉 Enrolled!
            </p>
          ) : (
            <button
              onClick={handleEnroll}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-full hover:from-teal-600 hover:to-teal-800 transition-all duration-300 shadow-lg font-semibold hover:scale-105"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;