'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from './ui/section-wrapper';
import Button from './ui/button';

const features = [
  {
    number: '01',
    title: 'Personalized Strategy',
    description: 'Every coaching journey is unique. We develop a customized roadmap tailored to your specific goals, challenges, and aspirations.',
  },
  {
    number: '02',
    title: 'Proven Methods',
    description: 'Leverage evidence-based coaching techniques and frameworks that have helped countless clients achieve breakthrough results.',
  },
  {
    number: '03',
    title: 'Ongoing Support',
    description: 'Stay accountable and motivated with regular check-ins, progress tracking, and continuous guidance throughout your transformation.',
  },
  {
    number: '04',
    title: 'Measurable Results',
    description: 'Track your progress with clear milestones and celebrate achievements as you move closer to realizing your full potential.',
  },
];

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <SectionWrapper background="white" className="relative" id="services">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A proven approach to personal and professional transformation
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="flex flex-col space-y-4">
                {/* Number */}
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                    <span className="text-2xl font-bold text-secondary group-hover:text-white transition-colors duration-300">
                      {feature.number}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Line for Desktop */}
                {index % 2 === 0 && index < features.length - 2 && (
                  <div className="hidden md:block absolute top-full left-8 w-0.5 h-12 bg-secondary/20" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button variant="secondary" size="lg">
            <a href="#contact">Begin Your Transformation</a>
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

