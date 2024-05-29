import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, FileIcon, BarChartIcon, SettingsIcon, BellIcon, Package2Icon } from './Icons';

const NavBar = () => {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" to="/">
            <Package2Icon className="h-6 w-6" />
            <span>Insurance Analytics</span>
          </Link>
          <button className="ml-auto h-8 w-8">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50" to="/">
              <HomeIcon className="h-4 w-4" />
              Dashboard
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" to="/data-management">
              <FileIcon className="h-4 w-4" />
              Data Management
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" to="/analytics">
              <BarChartIcon className="h-4 w-4" />
              Analytics
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" to="/settings">
              <SettingsIcon className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
