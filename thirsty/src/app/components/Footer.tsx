import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-muted-foreground">
          Made with 💙 by{' '}
          <a
            href="https://www.linkedin.com/in/savoiu"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            Madeline Savoiu
          </a>
        </p>
      </div>
    </footer>
  );
};
