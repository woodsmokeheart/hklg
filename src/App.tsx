import { useState, useEffect } from "react";
import css from "./App.module.css";

interface Neuron {
  id: number;
  position: {
    current: { x: number; y: number };
    target: { x: number; y: number };
  };
  style: {
    animationDelay: string;
  };
}

function App() {
  const circles = Array.from({ length: 6 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const rotationSpeed = 5;

  const handleRotation = (axis: "x" | "y" | "z", direction: 1 | -1) => {
    setRotation((prev) => ({
      ...prev,
      [axis]: prev[axis] + rotationSpeed * direction,
    }));
  };

  // Инициализация нейронов
  useEffect(() => {
    const initialNeurons: Neuron[] = Array.from({ length: 50 }).map((_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      return {
        id: i,
        position: {
          current: { x, y },
          target: { x, y },
        },
        style: {
          animationDelay: `${Math.random() * 2}s`,
        },
      };
    });
    setNeurons(initialNeurons);
  }, []);

  // Обновление целевых позиций
  useEffect(() => {
    const updateTargetPositions = () => {
      setNeurons((prevNeurons) =>
        prevNeurons.map((neuron) => ({
          ...neuron,
          position: {
            current: neuron.position.target,
            target: {
              x: Math.random() * 100,
              y: Math.random() * 100,
            },
          },
        }))
      );
    };

    const intervalId = setInterval(updateTargetPositions, 2000);
    return () => clearInterval(intervalId);
  }, []);

  // Анимация движения
  useEffect(() => {
    let animationFrameId: number;
    const speed = 0.02; // Скорость движения (0-1)

    const animate = () => {
      setNeurons((prevNeurons) =>
        prevNeurons.map((neuron) => {
          const dx = neuron.position.target.x - neuron.position.current.x;
          const dy = neuron.position.target.y - neuron.position.current.y;

          return {
            ...neuron,
            position: {
              ...neuron.position,
              current: {
                x: neuron.position.current.x + dx * speed,
                y: neuron.position.current.y + dy * speed,
              },
            },
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Автоматическое вращение ТОЛЬКО для основного объекта
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
          <div
            key={neuron.id}
            className={css.neuron}
            style={{
              ...neuron.style,
              left: `${neuron.position.current.x}%`,
              top: `${neuron.position.current.y}%`,
            }}
          />
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
