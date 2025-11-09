'use client';
import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = false;

  const handleNavigation = (page: string) => {
    router.push(`/${page}`);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // logout();
    router.push('/');
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => router.push('/')}
          >
            <Image
              src="/logo.png"
              alt="Thirsty Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-cover rounded-lg"
            />
            <span className="ml-3 text-primary">Thirsty</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavigation('about')}
              className={`hover:text-primary transition-colors ${
                pathname === '/about' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              About
            </button>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigation('profile')}
                  className={`hover:text-primary transition-colors flex items-center ${
                    pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <User className="h-5 w-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('auth/signup')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => handleNavigation('auth/login')}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => handleNavigation('about')}
              className={`block w-full text-left py-2 px-3 rounded-lg hover:bg-accent transition-colors ${
                pathname === '/about' ? 'text-primary bg-accent' : 'text-foreground'
              }`}
            >
              About
            </button>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigation('profile')}
                  className={`block w-full text-left py-2 px-3 rounded-lg hover:bg-accent transition-colors flex items-center ${
                    pathname === '/profile' ? 'text-primary bg-accent' : 'text-foreground'
                  }`}
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('auth/signup')}
                  className="block w-full text-left py-2 px-3 rounded-lg hover:bg-accent transition-colors text-foreground"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => handleNavigation('auth/login')}
                  className="block w-full text-left py-2 px-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
