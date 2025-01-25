import { createTabManager } from "../src/core/tabManager";

describe("createTabManager", () => {
  beforeEach(() => {
    // Clear sessionStorage and mocks before each test
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it("should register a tab and not trigger duplicate on the first tab", () => {
    const onDuplicateMock = jest.fn();

    // Create the first tab
    const tabManager = createTabManager("test-app", onDuplicateMock);

    // Check that no duplicate is detected
    expect(onDuplicateMock).not.toHaveBeenCalled();

    // Clean up
    tabManager.cleanup();
  });

  it("should trigger duplicate callback when a second tab is opened", () => {
    const onDuplicateMock = jest.fn();

    // Simulate the first tab
    createTabManager("test-app");

    // Simulate the second tab
    const tabManager2 = createTabManager("test-app", onDuplicateMock);

    // Verify that the duplicate callback is triggered
    expect(onDuplicateMock).toHaveBeenCalled();

    // Clean up
    tabManager2.cleanup();
  });

  it("should unregister a tab on cleanup", () => {
    const onDuplicateMock = jest.fn();

    // Simulate the first tab
    const tabManager = createTabManager("test-app", onDuplicateMock);

    // Clean up the first tab
    tabManager.cleanup();

    // Simulate a second tab (no duplicates should be detected now)
    const tabManager2 = createTabManager("test-app", onDuplicateMock);

    // No duplicate callback should be triggered
    expect(onDuplicateMock).not.toHaveBeenCalled();

    // Clean up
    tabManager2.cleanup();
  });
});
