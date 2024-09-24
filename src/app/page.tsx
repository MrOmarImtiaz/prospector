'use client'

// components/IntroScreen.tsx
import { useState} from "react";
import Interface from "./Interface"; // Adjust the path if necessary

const IntroScreen = () => {
  const [showCard, setShowCard] = useState(false);


  const handleClick = () => {
    setShowCard(true)};
 
  return (
    <div className="max-h-screen max-w-screen overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background">
        {!showCard && (
        <h1 className="absolute font-mono top-12 text-6xl md:text-6xl tracking-wide font-bold  text-center text-transparent bg-clip-text bg-foreground w-full">
          PROSPECTOR
        </h1>
        )}

        {!showCard && (
          <>
            {/* Responsive Logo */}
            <img
              src="/langbase.png"
              alt="Logo"
              className="w-[200px] md:w-[300px] h-auto mt-[150px] md:mt-[210px] transition-transform duration-300 transform hover:scale-110"
            />
            
            {/* Responsive Button */}
            <button
              onClick={handleClick}
              className="font-mono mt-[100px] md:mt-[155px] px-4 md:px-6 py-2 md:py-3 bg-black text-white text-lg md:text-xl font-bold rounded-lg shadow-lg  transition-transform duration-300 transform hover:scale-110"
            >
              GO TO APP
            </button>
          </>
        )}

          {/* Show the card when the button is clicked */}
        
          {showCard &&(
             <Interface />
           )}
         
      </div>
    </div>
  );
};

export default IntroScreen;
