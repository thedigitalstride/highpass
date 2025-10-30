'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  background?: 'primary' | 'white';
  delay?: number;
  id?: string;
}

export default function SectionWrapper({
  children,
  className = '',
  background = 'white',
  delay = 0,
  id,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Track scroll progress for parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Transform scroll to move section content up slowly (parallax effect)
  // Content moves at 20% speed while section slides over at 100%, creating depth
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const bgColor = background === 'primary' ? 'bg-primary' : 'bg-white';

  return (
    <motion.section
      ref={(node) => {
        sectionRef.current = node;
        inViewRef(node);
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={`relative py-16 md:py-24 ${bgColor} ${className}`}
      id={id}
    >
      {children}
    </motion.section>
  );
}

