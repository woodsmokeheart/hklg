import { useState, useEffect } from "react";
import "./App.css";

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
    <div className="view">
      <div className="neural-bg" />
      <div className="neurons">
        {neurons.map((neuron) => (
          <div key={neuron.id} className="neuron" style={neuron.style} />
        ))}
      </div>
      <div
        className="plane main"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
        }}
      >
        {circles.map((_, index) => (
          <div key={index} className="circle" />
        ))}
      </div>

      {/* Кнопка открытия панели */}
      <button
        className={`panel-toggle ${isPanelOpen ? "open" : ""}`}
        onClick={() => setIsPanelOpen(!isPanelOpen)}
      >
        {isPanelOpen ? "▼" : "▲"}
      </button>

      {/* Панель управления */}
      <div className={`control-panel ${isPanelOpen ? "open" : ""}`}>
        <div className="controls-row">
          {/* Управление по X */}
          <div className="control-group">
            <button
              className="joystick-button"
              onClick={() => handleRotation("x", -1)}
            >
              ↑
            </button>
            <button
              className="joystick-button"
              onClick={() => handleRotation("x", 1)}
            >
              ↓
            </button>
          </div>

          {/* Управление по Y */}
          <div className="control-group">
            <button
              className="joystick-button"
              onClick={() => handleRotation("y", -1)}
            >
              ←
            </button>
            <button
              className="joystick-button"
              onClick={() => handleRotation("y", 1)}
            >
              →
            </button>
          </div>

          {/* Центральное управление */}
          <div className="control-group">
            <button
              className="joystick-button center-button"
              onClick={() => setAutoRotate(!autoRotate)}
            >
              {autoRotate ? "⏹" : "▶"}
            </button>
          </div>

          {/* Управление по Z */}
          <div className="control-group">
            <button
              className="joystick-button z-button"
              onClick={() => handleRotation("z", -1)}
            >
              ↺
            </button>
            <button
              className="joystick-button z-button"
              onClick={() => handleRotation("z", 1)}
            >
              ↻
            </button>
          </div>

          {/* Кнопка сброса */}
          <div className="control-group">
            <button
              className="reset-button"
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
