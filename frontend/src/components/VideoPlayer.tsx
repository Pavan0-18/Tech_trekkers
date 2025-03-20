import React from 'react';

const VideoPlayer: React.FC<{ courseId: number }> = ({ courseId }) => {
  return (
    <div className="mt-6 p-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl shadow-lg border-2 border-indigo-300 animate-fade-in-up">
      <h3 className="text-lg font-semibold text-indigo-600 mb-4 text-center">Course Video</h3>
      <video
        controls
        className="w-full max-w-3xl mx-auto rounded-lg border-2 border-indigo-400 shadow-md"
      >
        <source src={`http://localhost:3000/video/${courseId}`} type="video/mp4" />
        <p className="text-gray-600 text-center py-4 italic">
          Video not available yet. Check back when the backend is ready!
        </p>
      </video>
    </div>
  );
};

export default VideoPlayer;