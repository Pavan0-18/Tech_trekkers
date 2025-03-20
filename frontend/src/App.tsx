import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing'; // New import
import StudentLogin from './components/StudentLogin';
import InstructorLogin from './components/InstructorLogin';
import StudentSignup from './components/StudentSignup';
import InstructorSignup from './components/InstructorSignup';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import VideoUpload from './components/VideoUpload';
import { useAuth } from './AuthContext';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  videoPath: string;
}

const App: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={user.role === 'student' ? '/courses' : '/instructor/upload'} /> : <Landing />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/signup" element={<StudentSignup />} />
      <Route path="/instructor/login" element={<InstructorLogin />} />
      <Route path="/instructor/signup" element={<InstructorSignup />} />
      <Route path="/courses" element={<CourseList onSelectCourse={setSelectedCourse} />} />
      <Route
        path="/course/:id"
        element={selectedCourse ? <CourseDetails course={selectedCourse} onBack={() => setSelectedCourse(null)} /> : <Navigate to="/courses" />}
      />
      <Route path="/instructor/upload" element={<VideoUpload />} />
    </Routes>
  );
};

export default App;