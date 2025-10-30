'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionWrapper from './ui/section-wrapper';
import Button from './ui/button';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <SectionWrapper background="white" id="about">
      <div ref={ref} className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Image Placeholder */}
              <div className="aspect-3/4 bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                <div className="text-center p-8">
                  <svg
                    className="w-32 h-32 mx-auto text-white/40 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <p className="text-white text-lg font-medium">
                    Professional Coach Photo
                  </p>
                  <p className="text-white/70 text-sm mt-2">
                    Place your inspiring portrait here
                  </p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 hidden md:block"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">500+</p>
                  <p className="text-sm text-foreground/60">Clients Coached</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                Meet Your Coach
              </h2>
              <div className="w-20 h-1 bg-secondary rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4 text-foreground/70 leading-relaxed"
            >
              <p className="text-lg">
                With over 15 years of experience in personal and professional development,
                I&apos;ve dedicated my career to helping individuals unlock their true potential
                and achieve extraordinary results.
              </p>
              
              <p className="text-lg">
                My approach combines evidence-based methodologies with deep empathy and
                understanding. I believe that everyone has the capacity for greatness—
                sometimes you just need the right guidance to discover it.
              </p>
              
              <p className="text-lg">
                Whether you&apos;re navigating a career transition, seeking work-life balance,
                or striving to reach ambitious goals, I&apos;m here to support you every step
                of the way.
              </p>
            </motion.div>

            {/* Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              <div className="space-y-2">
                <p className="text-sm text-foreground/60">Certifications</p>
                <p className="font-semibold text-foreground">ICF Certified Coach</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-foreground/60">Experience</p>
                <p className="font-semibold text-foreground">15+ Years</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-foreground/60">Specialization</p>
                <p className="font-semibold text-foreground">Leadership & Life</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-foreground/60">Clients</p>
                <p className="font-semibold text-foreground">500+ Success Stories</p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-4"
            >
              <Button variant="secondary" size="lg">
                <a href="#contact">Schedule a Discovery Call</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

