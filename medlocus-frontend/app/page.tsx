'use client';

import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { ThemeToggle } from "@/src/components/ui/ThemeToggle";
import Link from "next/link";

export default function Home() {
  const problems = [
    {
      icon: "🛡️",
      title: "Human Safety Risks",
      description: "Traditional inventory management exposes staff to risks from handling expired medications, incorrect storage, and manual tracking errors in hazardous environments.",
    },
    {
      icon: "📍",
      title: "Lack of Accurate Location Data",
      description: "Manual tracking often lacks precise location data for medicines, making it difficult to locate specific items quickly during emergencies.",
    },
    {
      icon: "🔍",
      title: "Identification Errors",
      description: "Manual identification of medicines leads to errors, reliance on expert knowledge, and potential mix-ups that can have serious consequences.",
    },
    {
      icon: "⏱️",
      title: "Time-Intensive Processes",
      description: "Conventional methods are labor-intensive, geographically constrained, and require extensive manual data entry and verification.",
    },
  ];

  const howItWorks = [
    {
      icon: "📦",
      title: "Digital Inventory Capture",
      description: "MEDLOCUS captures comprehensive medicine data including batch numbers, expiry dates, and storage locations through automated scanning and entry systems.",
    },
    {
      icon: "🤖",
      title: "AI-Powered Processing",
      description: "Advanced algorithms process inventory data in real-time, providing intelligent insights, expiry alerts, and automated stock level management.",
    },
    {
      icon: "💾",
      title: "Database Integration",
      description: "All processed data is integrated with a comprehensive database, ensuring accurate tracking, historical records, and seamless information retrieval.",
    },
    {
      icon: "📊",
      title: "Dashboard Analytics",
      description: "Interactive dashboards provide real-time visualization, actionable insights, and comprehensive reports for informed decision-making.",
    },
  ];

  const keyFeatures = [
    {
      icon: "🔬",
      title: "AI-Powered Medicine Identification",
      description: "Automated identification of medicine types, batch verification, and expiry date tracking with intelligent alerts.",
    },
    {
      icon: "📱",
      title: "Real-Time Inventory Management",
      description: "Intelligent inventory tracking with real-time updates, automated reorder points, and seamless stock level monitoring.",
    },
    {
      icon: "🧪",
      title: "Pharmaceutical Intelligence",
      description: "Analysis of medicine properties, interaction warnings, and therapeutic information for safe and effective inventory management.",
    },
    {
      icon: "🗺️",
      title: "Location-Based Tracking",
      description: "Interactive maps and precise location tracking for medicines, ensuring quick access and efficient storage management.",
    },
    {
      icon: "⚡",
      title: "Real-Time Processing",
      description: "Lightweight, fast processing for real-time data updates, instant notifications, and immediate inventory status reflection.",
    },
    {
      icon: "📈",
      title: "Business Analytics",
      description: "Comprehensive monitoring and analytics for sales trends, inventory turnover, and business growth insights.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Theme Toggle - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block w-20 h-20 rounded-full bg-teal-600 border-4 border-teal-500 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              MEDLOCUS
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Precision Care Through Smart Management
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Revolutionizing pharmacy management through intelligent inventory tracking, automated expiry monitoring, and comprehensive analytics for modern healthcare facilities.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button variant="primary" size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-teal-600 text-teal-600 hover:bg-teal-50">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Problems We Solve</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Traditional pharmacy inventory management faces critical challenges that our AI-powered system addresses.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((problem, index) => (
              <Card key={index} padding="lg" className="hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{problem.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Our System Works */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">How Our System Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            A streamlined 4-step process from data capture to actionable insights.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <Card key={index} padding="lg" className="text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features & USPs */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Key Features & USPs</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Cutting-edge technology meets pharmaceutical science for unprecedented inventory management capabilities.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <Card key={index} padding="lg" className="hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-teal-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Pharmacy Management?</h2>
          <p className="text-xl mb-8 text-teal-50">
            Join healthcare facilities worldwide using MEDLOCUS for intelligent inventory management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button variant="secondary" size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                Get Started Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-teal-700">
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MEDLOCUS</h3>
              <p className="text-gray-400 text-sm">
                Precision Care Through Smart Management
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>&copy; 2025 MEDLOCUS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
