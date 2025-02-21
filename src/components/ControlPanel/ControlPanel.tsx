import { useState, Dispatch, SetStateAction } from "react";
import css from "./ControlPanel.module.css";

// Интерфейс для объекта rotation
interface Rotation {
  x: number;
  y: number;
  z: number;
}

// Интерфейс для props компонента
interface ControlPanelProps {
  setAutoRotate: Dispatch<SetStateAction<boolean>>;
  setRotation: Dispatch<SetStateAction<Rotation>>;
  autoRotate: boolean;
}

export const ControlPanel = ({
  setAutoRotate,
  setRotation,
  autoRotate,
}: ControlPanelProps) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const rotationSpeed = 5;

  const handleRotation = (axis: "x" | "y" | "z", direction: 1 | -1) => {
    setRotation((prev: Rotation) => ({
      ...prev,
      [axis]: prev[axis] + rotationSpeed * direction,
    }));
  };

  return (
    <div>
      <button
        className={`${css.panelToggle} ${
          isPanelOpen ? css.panelToggleOpen : ""
        }`}
        onClick={() => setIsPanelOpen(!isPanelOpen)}
      >
        {isPanelOpen ? "▼" : "▲"}
      </button>

      <div
        className={`${css.controlPanel} ${
          isPanelOpen ? css.controlPanelOpen : ""
        }`}
      >
        <div className={css.controlsRow}>
          <div className={css.controlGroup}>
            <button
              className={css.joystickButton}
              onClick={() => handleRotation("x", -1)}
            >
              ↑
            </button>
            <button
              className={css.joystickButton}
              onClick={() => handleRotation("x", 1)}
            >
              ↓
            </button>
          </div>

          <div className={css.controlGroup}>
            <button
              className={css.joystickButton}
              onClick={() => handleRotation("y", -1)}
            >
              ←
            </button>
            <button
              className={css.joystickButton}
              onClick={() => handleRotation("y", 1)}
            >
              →
            </button>
          </div>

          <div className={css.controlGroup}>
            <button
              className={`${css.joystickButton} ${css.centerButton}`}
              onClick={() => setAutoRotate(!autoRotate)}
            >
              {autoRotate ? "⏹" : "▶"}
            </button>
          </div>

          <div className={css.controlGroup}>
            <button
              className={`${css.joystickButton} ${css.zButton}`}
              onClick={() => handleRotation("z", -1)}
            >
              ↺
            </button>
            <button
              className={`${css.joystickButton} ${css.zButton}`}
              onClick={() => handleRotation("z", 1)}
            >
              ↻
            </button>
          </div>

          <div className={css.controlGroup}>
            <button
              className={css.resetButton}
              onClick={() => setRotation({ x: 0, y: 0, z: 0 })}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
