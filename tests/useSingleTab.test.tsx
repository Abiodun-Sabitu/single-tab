import React from "react";
import { render, act } from "@testing-library/react";
import { useSingleTab } from "../src/hooks/useSingleTab";

// Helper component for testing the hook
const TestComponent = ({ appId }: { appId: string }) => {
  const { isDuplicate, showWarning, message } = useSingleTab(appId);

  return (
    <div>
      {showWarning && (
        <div data-testid="warning">
          <p>{message}</p>
        </div>
      )}
      {isDuplicate && (
        <p data-testid="duplicate-detected">Duplicate tab detected!</p>
      )}
    </div>
  );
};

describe("useSingleTab", () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it("should not show duplicate warning on the first tab", () => {
    const { queryByTestId } = render(<TestComponent appId="test-app" />);
    expect(queryByTestId("warning")).toBeNull();
    expect(queryByTestId("duplicate-detected")).toBeNull();
  });

  it("should show duplicate warning on the second tab", () => {
    // Render the first tab
    const { unmount } = render(<TestComponent appId="test-app" />);

    // Unmount the first tab to clean up
    act(() => {
      unmount();
    });

    // Simulate a second tab by triggering a storage event
    act(() => {
      sessionStorage.setItem(
        "test-app_tabs",
        JSON.stringify(["first-tab", "second-tab"])
      );
      const event = new StorageEvent("storage", {
        key: "test-app_tabs",
        newValue: JSON.stringify(["first-tab", "second-tab"]),
      });
      window.dispatchEvent(event);
    });

    // Render the second tab
    const { getByTestId } = render(<TestComponent appId="test-app" />);

    // Verify that the warning is displayed
    expect(getByTestId("warning")).toBeInTheDocument(); // Warning should show for duplicate tab
    expect(getByTestId("duplicate-detected")).toBeInTheDocument(); // Confirm duplicate state
  });
});
