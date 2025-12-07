'use client';

import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Avatar } from '../ui/Avatar';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '@/src/hooks/useAuth';

export const TopNav: React.FC = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-xl font-bold text-[#0f62fe] dark:text-teal-400">MEDLOCUS</h1>
          <div className="hidden md:block flex-1 max-w-md">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f62fe] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <button
            className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0f62fe] rounded-md"
            aria-label="Notifications"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* User Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0f62fe] rounded-md">
              <Avatar name={user?.name || 'User'} email={user?.email} size="sm" />
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.name || 'User'}
              </span>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

