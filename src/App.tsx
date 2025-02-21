import { useState, useEffect } from "react";
import css from "./App.module.css";
import { Neurons } from "./components/Neurons/Neurons";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";

function App() {
  const circles = Array.from({ length: 6 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [autoRotate, setAutoRotate] = useState(true);

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
      <Neurons />
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

      <ControlPanel
        setAutoRotate={setAutoRotate}
        setRotation={setRotation}
        autoRotate={autoRotate}
      />
    </div>
  );
}

export default App;
