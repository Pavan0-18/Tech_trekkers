import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  videoPath: string;
}

const CourseList: React.FC<{ onSelectCourse: (course: Course) => void }> = ({ onSelectCourse }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3000/courses', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching courses:', err);
        setLoading(false);
      });
  }, []);

  if (!user || user.role !== 'student') return <div>Unauthorized</div>;

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-indigo-50 to-gray-200 min-h-screen">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center tracking-tight animate-fade-in-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500">
            Explore Our Courses
          </span>
        </h1>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </div>
      {loading ? (
        <p className="text-center text-gray-600 text-lg animate-pulse">Loading courses...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl p-6 border-4 border-indigo-200 hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSelectCourse(course)}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500 rounded-bl-full opacity-20" />
              <h2 className="text-2xl font-bold text-indigo-700 mb-3 tracking-wide">{course.title}</h2>
              <p className="text-gray-700 text-sm mb-4 line-clamp-2 italic">{course.description}</p>
              <div className="text-gray-600 text-sm space-y-2">
                <p className="flex items-center">
                  <span className="font-semibold text-indigo-600 mr-2">👩‍🏫 Instructor:</span>{' '}
                  {course.instructor}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-indigo-600 mr-2">⏳ Duration:</span>
                  <span className="text-teal-600 font-medium">{course.duration}</span>
                </p>
              </div>
              <span className="absolute bottom-2 right-2 text-xs text-gray-400">Course #{course.id}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;