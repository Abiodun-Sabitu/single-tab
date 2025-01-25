import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SingleTabModal from "../src/component/singleTabModal";

describe("<SingleTabModal />", () => {
  it("should not render when isOpen is false", () => {
    const { queryByText } = render(
      <SingleTabModal isOpen={false} content={<p>Warning</p>} />
    );
    expect(queryByText("Warning")).toBeNull();
  });

  it("should render when isOpen is true", () => {
    const { getByText } = render(
      <SingleTabModal isOpen={true} content={<p>Warning</p>} />
    );
    expect(getByText("Warning")).toBeInTheDocument();
  });

  it("should display custom content passed via the content prop", () => {
    const customContent = <p>Duplicate Tab Detected!</p>;
    const { getByText } = render(
      <SingleTabModal isOpen={true} content={customContent} />
    );
    expect(getByText("Duplicate Tab Detected!")).toBeInTheDocument();
  });

  it("should apply custom styles passed via the style prop", () => {
    const customStyle = { backgroundColor: "red" };
    const { container } = render(
      <SingleTabModal
        isOpen={true}
        content={<p>Custom Style Test</p>}
        style={customStyle}
      />
    );

    // Check the outer container's style
    const overlay = container.firstChild; // Outer overlay div
    expect(overlay).toHaveStyle("background-color: red");
  });

  it("should not close when Escape key is pressed", () => {
    const { getByText } = render(
      <SingleTabModal isOpen={true} content={<p>Non-dismissable Modal</p>} />
    );

    const modal = getByText("Non-dismissable Modal").parentElement;

    // Simulate pressing the Escape key
    fireEvent.keyDown(modal!, { key: "Escape", code: "Escape" });

    // Modal should still be in the document
    expect(getByText("Non-dismissable Modal")).toBeInTheDocument();
  });
});
