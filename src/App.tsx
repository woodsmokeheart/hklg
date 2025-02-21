import { useState, useEffect } from "react";
import css from "./App.module.css";

function App() {
  const circles = Array.from({ length: 6 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const rotationSpeed = 5;

  // Функция для вращения по осям
  const handleRotation = (axis: "x" | "y" | "z", direction: 1 | -1) => {
    setRotation((prev) => ({
      ...prev,
      [axis]: prev[axis] + rotationSpeed * direction,
    }));
  };

  // Генерация случайных нейронов
  const neurons = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
    },
  }));

  // Автоматическое вращение
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (autoRotate) {
        setRotation((prev) => ({
          x: prev.x + 0.5,
          y: prev.y + 0.5,
          z: prev.z + 0.5,
        }));
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoRotate]);

  return (
    <div className={css.view}>
      <div className={css.neuralBg} />
      <div className={css.neurons}>
        {neurons.map((neuron) => (
          <div key={neuron.id} className={css.neuron} style={neuron.style} />
        ))}
      </div>
      <div
        className={`${css.plane} ${css.planeMain}`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
        }}
      >
        {circles.map((_, index) => (
          <div key={index} className={css.circle} />
        ))}
      </div>

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
}

export default App;
