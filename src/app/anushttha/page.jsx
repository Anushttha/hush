// anushttha/page.js

import React from 'react';
import { BsChatSquareDots } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";

const AnushtthaPage = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-black rounded-lg shadow-lg overflow-hidden">
            <button className="absolute top-2 left-2 p-2 bg-black rounded-full z-10">
    {/* Replace with an actual back icon if needed */}
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
</button>

                <div className="relative">
                    <img className="w-full h-80 object-cover" src="/images/screenshot.png" alt="Camelia Carerr" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent">
                        
                        <div className="flex justify-center mt-2 space-x-2">
                        <img className="w-16 h-16 object-cover rounded-full border-2 border-gray-500" src="/images/screenshot.png" alt="Camelia Carerr" />
                        <img className="w-16 h-16 object-cover rounded-full border-2 border-gray-500" src="/images/screenshot.png" alt="Camelia Carerr" />
                        <img className="w-16 h-16 object-cover rounded-full border-2 border-gray-500" src="/images/screenshot.png" alt="Camelia Carerr" />
                        <img className="w-16 h-16 object-cover rounded-full border-2 border-gray-500" src="/images/screenshot.png" alt="Camelia Carerr" />
                    </div>
                    <div className="flex justify-between items-center">
    {/* Language section */}
    <h2 className="text-left text-xl font-semibold">Camelia Carerr</h2>
    
    {/* Online status */}
    <div className="flex items-center space-x-1" style={{ marginTop: '10px' }}>
        <span className="bg-green-500 w-2.5 h-2.5 rounded-full"></span>
        <span className="text-sm">Online</span>
    </div>
</div>

                    </div>
                </div>
                <div className="p-4 bg-black">
                <div className="flex space-x-2">
        <div className="flex space-x-2">
        <span className="bg-gray-700 px-2 py-1 rounded-full text-sm" style={{ backgroundColor: '#1B1B1D' }}>British</span>

            <span className="bg-gray-700 px-2 py-1 rounded-full text-sm" style={{ backgroundColor: '#1B1B1D' }}>English</span>
            <span className="bg-gray-700 px-2 py-1 rounded-full text-sm" style={{ backgroundColor: '#1B1B1D' }}>Korean</span>
        </div>
    </div>
                    <div className="text-left">
                    <h2 className="text-lg font-bold mb-2">About</h2>
                    <p className="text-sm text-gray-600">I am 18 years old, I am very naughty, I do scary things. For example, I date older men, I am a sportsman and I love money.</p>

                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Activity</h3>
                        <div className="mt-2 flex justify-around">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-full" style={{ backgroundColor: '#1B1B1D' }}>
    <BsChatSquareDots className="h-6 w-6 text-white" />
   
</button>
                          
<button className="flex items-center space-x-2 px-20 py-2 bg-gray-700 rounded-full" style={{ backgroundColor: '#1B1B1D' }}>
    <IoIosShareAlt className="h-6 w-6 text-white" />
    <span className="text-white">Share</span>
</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnushtthaPage;
