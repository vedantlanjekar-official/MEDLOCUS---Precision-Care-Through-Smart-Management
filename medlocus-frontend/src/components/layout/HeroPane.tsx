'use client';

import React from 'react';
import { Button } from '../ui/Button';
import Link from 'next/link';

export const HeroPane: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[#0f62fe] to-[#0353e9] text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Precision Care Through Smart Management
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              MEDLOCUS - Your comprehensive solution for medical inventory
              management, tracking, and optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[#0f62fe]">
                Request Demo
              </Button>
            </div>
          </div>

          {/* Right Column - Illustration Placeholder */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <svg
                viewBox="0 0 400 300"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="400" height="300" fill="rgba(255,255,255,0.1)" rx="12" />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-2xl font-bold fill-white"
                >
                  MEDLOCUS
                </text>
                <text
                  x="50%"
                  y="60%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm fill-blue-100"
                >
                  Medical Management System
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


