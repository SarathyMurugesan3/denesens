import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export const StatCounter = ({ end, duration = 2, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl gold-text tracking-tight">
      {prefix}{count}{suffix}
    </span>
  );
};

export default StatCounter;
