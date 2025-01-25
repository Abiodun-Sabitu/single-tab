import { useEffect, useState } from "react";
import { createTabManager } from "../core/tabManager";

/**
 * Custom hook to detect and handle duplicate tabs in a React application.
 * @param appId - A unique identifier for your application.
 * @returns Hook state for managing duplicate tabs.
 */
export const useSingleTab = (appId: string) => {
  const [isDuplicate, setIsDuplicate] = useState(false); // Whether this tab is a duplicate
  const [message, setMessage] = useState<string | null>(null); // Warning message
  const [showWarning, setShowWarning] = useState(false); // Control warning visibility

  useEffect(() => {
    // Callback triggered when a duplicate tab is detected
    const onDuplicate = () => {
      setIsDuplicate(true);
      setMessage(
        "Duplicate Tab Detected. Please close this tab to continue using the application."
      );
      setShowWarning(true);
      // Optionally, you can add logic to disable the UI here
    };

    // Initialize the TabManager
    const tabManager = createTabManager(appId, onDuplicate);

    // Cleanup when the component is unmounted
    return () => {
      tabManager.cleanup();
    };
  }, [appId]); // Only reinitialize if appId changes

  return {
    isDuplicate,
    showWarning,
    message,
  };
};
