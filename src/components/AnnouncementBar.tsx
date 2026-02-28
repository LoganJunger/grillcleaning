"use client";

import { useState, useEffect } from "react";

const DISMISS_KEY = "announcement-dismissed";
const DISMISS_DAYS = 7;

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      if (Date.now() - dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000) return;
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setVisible(false);
  };

  return (
    <div className="bg-orange-500 text-white text-center text-sm py-2.5 px-4 relative">
      <span className="hidden sm:inline">
        🔥 Spring Grilling Season — Book by May 31 and save $20. Use code{" "}
        <strong>GRILL20</strong> at checkout.
      </span>
      <span className="sm:hidden">
        🔥 Save $20 through May 31 · Use code <strong>GRILL20</strong>
      </span>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1"
        aria-label="Dismiss announcement"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
