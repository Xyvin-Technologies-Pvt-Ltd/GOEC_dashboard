import React from "react";

const LogLayout = ({ logo, children }) => {
  return (
    <>
      {logo ? (
        <div className="flex w-[543px] shrink-0 flex-col items-center gap-8 rounded-lg bg-[#1c1d22] px-8 pb-6">
          <div
            className="flex w-[544px] items-center justify-center border-b border-white/20 px-0 pb-[34px] pt-8 font-[Conthrax] text-[29.712px] font-semibold leading-normal tracking-[0.446px]"
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
        </div>
      ) : (
        <div className="flex w-[544px] flex-col items-center gap-8 rounded-lg bg-[#1c1d22] p-8">
          {children}
        </div>
      )}
    </>
  );
};

export default LogLayout;
