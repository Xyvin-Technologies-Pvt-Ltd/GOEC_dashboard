import React from "react";

const LogLayout = ({ logo, children }) => (
  <div className="mx-4 flex w-full max-w-[544px] flex-col items-center gap-8 rounded-lg bg-card px-8 pb-6 sm:mx-6">
    {logo ? (
      <>
        <div
          className="flex w-full items-center justify-center border-b border-white/20 px-0 pb-8 pt-8 font-[Conthrax] text-3xl font-semibold leading-normal tracking-wider"
          style={{
            background:
              "linear-gradient(100deg, #ed5dcd -2.24%, rgba(95, 93, 215, 0.71) 98.06%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {logo}
        </div>
        {children}
      </>
    ) : (
      <div className="flex w-full flex-col items-center gap-8 p-8">
        {children}
      </div>
    )}
  </div>
);

export default LogLayout;
