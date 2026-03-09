import React from 'react';
import { Link } from 'react-router-dom';
import doodleImage from '../images/404_doodle.png';

const NotFound = () => {
    return (
        <div className="h-full w-full bg-[#f8fafc] flex flex-col items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="relative">
                    <img
                        src={doodleImage}
                        alt="404 Not Found Doodle"
                        className="w-full h-auto drop-shadow-xl hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                </div>
                <div className="pt-4">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Take Me Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
