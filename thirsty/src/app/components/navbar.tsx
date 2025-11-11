'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      const res = await fetch("/api/auth/whoami", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.ok) {
        setIsAuthenticated(true);
        setUserId(data.userId);
      }
    };

    fetchUserId();
  }, []);

  const handleLogout = async () => {
    // Call logout API if needed
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
    setUserId(0);
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer">
            <Image
              src="/logo.png"
              alt="Thirsty Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-cover rounded-lg"
            />
            <span className="ml-3 text-primary">Thirsty</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/about"
              className={`hover:text-primary transition-colors ${
                pathname === '/about' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              About
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href={`/profile/${userId}`}
                  className={`hover:text-primary transition-colors flex items-center ${
                    pathname.startsWith('/profile') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/about"
              className={`block w-full text-left py-2 px-3 rounded-lg hover:bg-accent transition-colors ${
                pathname === '/about' ? 'text-primary bg-accent' : 'text-foreground'
              }`}
            >
              About
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href={`/profile/${userId}`}
                  className={`block w-full text-left py-2 px-3 rounded-lg hover:bg-accent transition-colors flex items-center ${
                    pathname.startsWith('/profile') ? 'text-primary bg-accent' : 'text-foreground'
                  }`}
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="block w-full text-left py-2 px-3 rounded-lg hover:bg-accent transition-colors text-foreground"
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth/login"
                  className="block w-full text-left py-2 px-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
