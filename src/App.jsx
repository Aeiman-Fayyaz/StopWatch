import React, { useState, useEffect } from "react";
import watch from "./assets/watch.png";
import play from "./assets/play.png";
import pause from "./assets/pause.png";
import stop from "./assets/stop.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

export default function StopWatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      delay: 100,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    let intervalId;
    if (isRunning && !isPaused) {
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, isPaused]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: secs.toString().padStart(2, "0"),
    };
  };

  const time = formatTime(seconds);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Header - Responsive */}
      <header
        className="w-full max-w-7xl mb-8 sm:mb-10 lg:mb-12 xl:mb-16 text-center px-4"
        data-aos="fade-down"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Clock
        </h1>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-blue-400 to-cyan-200 bg-clip-text text-transparent">
          Developed by Aeiman Fayyaz
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-12 text-sm sm:text-base lg:text-lg text-gray-300">
          <span className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-800/30">
            World Clock
          </span>
          <span className="text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-1 px-2 py-1 bg-gray-800/30 rounded-lg">
            Stop Watch
          </span>
          <span className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-800/30">
            Timer
          </span>
        </div>
      </header>

      {/* Main Content - Responsive Layout */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-12 xl:gap-16 w-full max-w-7xl px-4">
        {/* Watch Image Section - Responsive */}
        <div
          className="relative order-2 lg:order-1 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl sm:blur-2xl lg:blur-3xl"></div>
          <div className="relative">
            <div className="animate-pulse-ring rounded-full p-4 sm:p-6 md:p-8">
              <img
                src={watch}
                alt="Stop Watch"
                className={`w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain transition-all duration-500 ${
                  isRunning && !isPaused ? "animate-rotate-clock" : ""
                }`}
              />
            </div>
            {/* Animated rings - Responsive sizes */}
            <div className="absolute inset-0 border-2 sm:border-3 md:border-4 border-blue-500/30 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 sm:inset-3 md:inset-4 border sm:border-2 border-cyan-400/30 rounded-full animate-spin-slow-reverse"></div>
          </div>

          {/* Mobile-only time display */}
          <div
            className="lg:hidden mt-6 sm:mt-8"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="text-center">
              <div className="text-xl sm:text-2xl text-gray-300 mb-3 font-medium">
                Current Time
              </div>
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {time.hours}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">H</div>
                </div>
                <div className="text-2xl sm:text-3xl text-cyan-400 font-bold">
                  :
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {time.minutes}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">M</div>
                </div>
                <div className="text-2xl sm:text-3xl text-cyan-400 font-bold">
                  :
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {time.seconds}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">S</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stopwatch Controls Section - Responsive */}
        <div
          className="flex flex-col items-center space-y-6 sm:space-y-8 lg:space-y-10 w-full max-w-md lg:max-w-lg order-1 lg:order-2"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          {/* Desktop Time Display (hidden on mobile) */}
          <div className="hidden lg:block w-full" data-aos="fade-up">
            <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-3xl p-8 lg:p-10 xl:p-12 border border-gray-700/50 shadow-2xl">
              <div className="text-center space-y-4">
                <h2 className="text-xl lg:text-2xl xl:text-3xl text-gray-300 mb-4 lg:mb-6 font-medium">
                  Stopwatch
                </h2>
                <div className="flex items-baseline justify-center space-x-3 lg:space-x-4 xl:space-x-6">
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      {time.hours}
                    </div>
                    <div className="text-xs lg:text-sm xl:text-base text-gray-400 mt-2">
                      HOURS
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl xl:text-5xl text-cyan-400 font-bold mb-2 lg:mb-3 xl:mb-4">
                    :
                  </div>
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      {time.minutes}
                    </div>
                    <div className="text-xs lg:text-sm xl:text-base text-gray-400 mt-2">
                      MINUTES
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl xl:text-5xl text-cyan-400 font-bold mb-2 lg:mb-3 xl:mb-4">
                    :
                  </div>
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      {time.seconds}
                    </div>
                    <div className="text-xs lg:text-sm xl:text-base text-gray-400 mt-2">
                      SECONDS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Control Buttons - Responsive */}
          <div
            className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 w-full"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {/* Play/Resume Button */}
            <button
              onClick={
                isRunning && !isPaused
                  ? handlePause
                  : isPaused
                  ? handleResume
                  : handleStart
              }
              className="group relative p-4 sm:p-5 lg:p-6 bg-linear-to-r from-blue-600 to-cyan-500 rounded-xl sm:rounded-2xl hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 active:scale-95 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-500 rounded-xl sm:rounded-2xl blur opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <img
                src={play}
                alt={isRunning && !isPaused ? "Pause" : "Play"}
                className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mx-auto"
                style={isRunning && !isPaused ? { filter: "invert(1)" } : {}}
              />
              <span className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-gray-300 whitespace-nowrap">
                {!isRunning ? "Start" : isPaused ? "Resume" : "Pause"}
              </span>
            </button>

            {/* Pause Button - Conditional */}
            {isRunning && !isPaused && (
              <button
                onClick={handlePause}
                className="group relative p-4 sm:p-5 lg:p-6 bg-linear-to-r from-amber-600 to-amber-500 rounded-xl sm:rounded-2xl hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 active:scale-95 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
                data-aos="fade-left"
              >
                <div className="absolute -inset-1 bg-linear-to-r from-amber-600 to-amber-500 rounded-xl sm:rounded-2xl blur opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <img
                  src={pause}
                  alt="Pause"
                  className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mx-auto"
                />
                <span className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-gray-300 whitespace-nowrap">
                  Pause
                </span>
              </button>
            )}

            {/* Stop Button */}
            <button
              onClick={handleStop}
              className="group relative p-4 sm:p-5 lg:p-6 bg-linear-to-r from-red-600 to-pink-500 rounded-xl sm:rounded-2xl hover:from-red-500 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 active:scale-95 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-pink-500 rounded-xl sm:rounded-2xl blur opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <img
                src={stop}
                alt="Stop"
                className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mx-auto"
              />
              <span className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-gray-300 whitespace-nowrap">
                Stop
              </span>
            </button>
          </div>

          {/* Status Indicator - Responsive */}
          <div
            className="flex flex-col items-center space-y-3 sm:space-y-4 mt-4 sm:mt-6"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                  isRunning && !isPaused
                    ? "bg-green-400 animate-pulse"
                    : isPaused
                    ? "bg-amber-400"
                    : "bg-red-400"
                }`}
              ></div>
              <span className="text-sm sm:text-base lg:text-lg text-gray-300 font-medium">
                {!isRunning
                  ? "Ready to Start"
                  : isPaused
                  ? "Paused"
                  : "Running..."}
              </span>
            </div>

            {/* Time elapsed indicator */}
            <div className="text-xs sm:text-sm text-gray-400 text-center px-4">
              Total elapsed time: {time.hours}:{time.minutes}:{time.seconds}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats - Responsive Grid */}
      <div
        className="mt-8 sm:mt-10 lg:mt-12 xl:mt-16 w-full max-w-4xl px-4"
        data-aos="fade-up"
        data-aos-delay="1000"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400">
                {time.hours}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-400 mt-1 sm:mt-2">
                Hours
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {(seconds / 3600).toFixed(2)} total
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400">
                {time.minutes}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-400 mt-1 sm:mt-2">
                Minutes
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {(seconds / 60).toFixed(2)} total
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400">
                {seconds}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-400 mt-1 sm:mt-2">
                Seconds
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Click count: {seconds}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Control Tips */}
        <div
          className="lg:hidden mt-6 sm:mt-8 text-center"
          data-aos="fade-up"
          data-aos-delay="1200"
        >
          <p className="text-xs sm:text-sm text-gray-400">
            💡 <span className="text-cyan-300">Tap buttons</span> to control the
            stopwatch
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Watch rotates when running
          </p>
        </div>
      </div>

      {/* Responsive Bottom Info */}
      <footer
        className="mt-8 sm:mt-10 w-full max-w-3xl text-center px-4"
        data-aos="fade-up"
        data-aos-delay="1400"
      >
        <div className="text-xs sm:text-sm text-gray-500">
          <p>Stopwatch • Built with React & Tailwind CSS</p>
          <p className="mt-1">Fully responsive design • Works on all devices</p>
        </div>
      </footer>
    </div>
  );
}
