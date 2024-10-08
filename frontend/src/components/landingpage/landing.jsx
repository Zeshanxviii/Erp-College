import React from 'react';
import StudentLogin from '../login/student';
import FacultyLogin from '../login/facultylogin';
function LandingPage() {
  return (
    // 
    <HalfWindow />
  );
}


export default LandingPage;




const HalfWindow = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8">
        <div className="container mx-auto flex justify-center min-h-screen">
          <header className="mt-40">
            <div className="">
              <h1 className="text-6xl font-sans font-bold text-gray-800 drop-shadow-md">Transform your organization with automation</h1>
              <h2 className="text-2xl font-sans text-gray-600 mt-2">Optimize workflows, reduce manual effort, and drive success with intelligent automation</h2>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Explore Here</button>
            </div>
          </header>
        </div>
      </div>
      <div className="flex-1 p-8 bg-white">
      <div className="container mx-auto flex justify-center min-h-screen">
          <FacultyLogin/>
        </div>
      </div>
    </div>
  );
};

