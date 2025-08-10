"use client";

import React from "react";

interface FullscreenPanelProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const FullscreenPanel: React.FC<FullscreenPanelProps> = ({
  isOpen,
  title = "What's new?",
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-start justify-center p-8 animate-fadeIn"
      style={{
        backgroundColor: "rgba(120, 30, 25, 0.95)",
        color: "#ffc8c4",
        fontWeight: 200,
        fontSize: "1.2rem",
        border: "2px solid #e3534c",
      }}
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-transparent border border-[#e3534c] rounded-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#ffeae8] text-lg hover:text-white px-2 py-1"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
};
