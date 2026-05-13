import React from "react";
import { ReactComponent as DocumentTextIcon } from "../assets/icons/document-text.svg";
import { ReactComponent as EllipseIcon } from "../assets/icons/Ellipse 4.svg";
import { ReactComponent as CloseCircle } from "../assets/icons/close-circle.svg";

const ProgressBar = ({ UploadProgress, filename, onClose }) => (
  <div className="w-full">
    <div className="flex h-[75px] w-full items-center justify-center gap-4 rounded border border-border bg-muted px-4">
      <div className="relative">
        <EllipseIcon />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DocumentTextIcon />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-2.5">
        <div className="flex w-full items-center gap-2.5 self-stretch">
          <div className="flex-1 text-foreground">{filename}</div>
          <div className="w-[25px] self-stretch text-foreground">{UploadProgress}%</div>
        </div>
        <progress
          className="h-1.5 w-full appearance-none rounded [&::-moz-progress-bar]:rounded [&::-moz-progress-bar]:bg-surface-iconbutton [&::-webkit-progress-bar]:rounded [&::-webkit-progress-bar]:bg-surface-progress [&::-webkit-progress-value]:rounded [&::-webkit-progress-value]:bg-surface-iconbutton"
          value={UploadProgress}
          max={100}
        />
      </div>
      <CloseCircle className="cursor-pointer" onClick={onClose} />
    </div>
  </div>
);

export default ProgressBar;
