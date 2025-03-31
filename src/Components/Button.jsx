import React from 'react';

const Button = ({children,onClick}) => {
  return (
    <button className="group relative rounded-full px-4 py-2   text-white   text-sm border border-cyan-300/50 hover:border-cyan-500 transition-all duration-300 ease-in-out hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:shadow-[0_0_15px_rgba(34,211,238,0.45)] active:scale-[0.98]"
    onClick={onClick}
    >
      <span className="flex items-center gap-3 relative z-10 text-sm justify-center">
        {children}
      </span>
      {/* <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600/25 to-blue-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-md" />
      <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 group-hover:opacity-30 blur-xl rounded-md transition-all duration-300 group-hover:blur-2xl" /> */}
    </button>
  );
}

export default Button;
