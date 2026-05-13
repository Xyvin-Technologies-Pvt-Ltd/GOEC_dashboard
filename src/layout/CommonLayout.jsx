import React from "react";
import StyledDivider from "../ui/StyledDivider";
import { ReactComponent as CloseCircle } from "../assets/icons/close-circle.svg";

const CommonLayout = ({ header, children, onClick }) => {
  return (
    <div className="relative w-full rounded rounded-b-none bg-[#27292f]">
      <div className="flex w-full shrink-0 flex-col items-center rounded-lg bg-[#27292f]">
        {header && (
          <>
            <div className="flex w-full items-center justify-between self-stretch px-8 py-[15px] font-sans text-lg font-bold leading-8 text-[#b5b8c5]">
              {header}
              <CloseCircle onClick={onClick} className="cursor-pointer" />
            </div>
            <StyledDivider />
          </>
        )}
        <div className="flex w-full shrink-0 flex-col gap-[22px] rounded-lg bg-[#27292f] px-8 pb-6 pt-[15px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
