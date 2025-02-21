import { useEffect, useState } from "react";
import css from "./Neurons.module.css";

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

export const Neurons = () => {
  const [neurons, setNeurons] = useState<Neuron[]>([]);

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
  return (
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
  );
};
