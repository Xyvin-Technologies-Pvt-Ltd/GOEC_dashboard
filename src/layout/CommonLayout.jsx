import React from "react";
import StyledDivider from "../ui/StyledDivider";
import { ReactComponent as CloseCircle } from "../assets/icons/close-circle.svg";

const CommonLayout = ({ header, children, onClick }) => (
  <div className="relative w-full rounded rounded-b-none bg-background">
    <div className="flex w-full shrink-0 flex-col items-center rounded-lg bg-background">
      {header && (
        <>
          <div className="flex w-full items-center justify-between self-stretch px-4 py-4 font-sans text-lg font-bold leading-8 text-muted-foreground sm:px-6 lg:px-8">
            {header}
            <CloseCircle onClick={onClick} className="cursor-pointer" />
          </div>
          <StyledDivider />
        </>
      )}
      <div className="flex w-full shrink-0 flex-col gap-6 rounded-lg bg-background px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  </div>
);

export default CommonLayout;
