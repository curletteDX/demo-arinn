import React from "react";
import { UniformSlot, registerUniformComponent } from "@uniformdev/canvas-react";

/**
 * SlotSection - Container for slot section items
 *
 * This component renders the $slotSectionItems slot which contains
 * the actual components added to a slot section in Uniform Canvas.
 *
 * Slot sections are used by Uniform to organize content in the editor,
 * and this component ensures they render correctly on the frontend.
 */
export const SlotSection: React.FC = () => {
  return <UniformSlot name="$slotSectionItems" />;
};

// Register for the Uniform $slotSection type
registerUniformComponent({
  type: "$slotSection",
  component: SlotSection,
});

export default SlotSection;

