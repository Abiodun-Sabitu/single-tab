import { v4 as uuidv4 } from "uuid";
/**
 * Manages duplicate tab detection using BroadcastChannel (modern browsers) or sessionStorage (fallback).
 */
export const createTabManager = (appId: string, onDuplicate?: () => void) => {
  // Generate a unique ID for the current tab
  const tabId = typeof window !== "undefined" ? uuidv4() : "";
  let channel: BroadcastChannel | null = null;

  /**
   * Initializes the TabManager, setting up communication channels and registering the current tab.
   */
  const initialize = () => {
    if (typeof window === "undefined") {
      console.warn(
        "[SingleTab] This library is designed for browser environments only."
      );
      return; // Exit initialization if not in a browser environment
    }

    if (typeof window !== "undefined") {
      if ("BroadcastChannel" in window) {
        // Use BroadcastChannel for modern browsers
        channel = new BroadcastChannel(appId);
        channel.onmessage = (event) => handleMessage(event.data);
      } else if ("addEventListener" in window) {
        // Use sessionStorage as a fallback
        syncWithSessionStorage();
        (window as Window).addEventListener("storage", handleStorageEvent);
      }
    }

    // Register the current tab
    registerTab();

    // Ensure cleanup when the tab is closed
    window.addEventListener("beforeunload", unregisterTab);
  };

  /**
   * Handles messages from other tabs via BroadcastChannel.
   * @param message - The message containing the type and sender tabId.
   */
  const handleMessage = (message: { type: string; tabId: string }) => {
    if (message.type === "NEW_TAB" && message.tabId !== tabId && onDuplicate) {
      onDuplicate(); // Trigger callback when a duplicate tab is detected
    }
  };

  /**
   * Syncs the current tab with sessionStorage to detect duplicate tabs.
   */
  const syncWithSessionStorage = () => {
    const activeTabs = getActiveTabs();
    if (activeTabs.length > 0 && onDuplicate) {
      onDuplicate(); // Trigger callback if duplicate tabs exist
    }
  };

  /**
   * Handles storage events triggered by updates in sessionStorage.
   * @param event - The StorageEvent containing the key and updated value.
   */
  const handleStorageEvent = (event: StorageEvent): void => {
    if (event.key === `${appId}_tabs` && onDuplicate) {
      syncWithSessionStorage();
    }
  };

  /**
   * Retrieves the list of active tabs from sessionStorage.
   * @returns An array of active tab IDs.
   */
  const getActiveTabs = (): string[] => {
    const tabs = sessionStorage.getItem(`${appId}_tabs`);
    return tabs ? JSON.parse(tabs) : [];
  };

  /**
   * Updates the list of active tabs in sessionStorage.
   * @param tabs - The updated list of active tab IDs.
   */
  const updateActiveTabs = (tabs: string[]) => {
    sessionStorage.setItem(`${appId}_tabs`, JSON.stringify(tabs));
  };

  /**
   * Registers the current tab as active by notifying other tabs and updating storage.
   */
  const registerTab = () => {
    if (channel) {
      // Notify other tabs via BroadcastChannel
      channel.postMessage({ type: "NEW_TAB", tabId });
    } else {
      // Update the active tabs list in sessionStorage
      const activeTabs = getActiveTabs();
      activeTabs.push(tabId);
      updateActiveTabs(activeTabs);
    }
  };

  /**
   * Unregisters the current tab by notifying other tabs and cleaning up storage.
   */
  const unregisterTab = () => {
    if (channel) {
      // Notify other tabs via BroadcastChannel
      channel.postMessage({ type: "TAB_CLOSED", tabId });
      channel.close(); // Safely close the BroadcastChannel
    } else {
      // Remove this tab from sessionStorage
      const activeTabs = getActiveTabs().filter((id) => id !== tabId);
      updateActiveTabs(activeTabs);
    }
  };

  // Initialize the tab manager
  initialize();

  // Return a cleanup function to allow manual teardown
  return {
    cleanup: () => {
      if (typeof window === "undefined") return; // No-op during SSR
      unregisterTab();
      if (!channel) {
        window.removeEventListener("storage", handleStorageEvent);
      }
      window.removeEventListener("beforeunload", unregisterTab);
    },
  };
};
