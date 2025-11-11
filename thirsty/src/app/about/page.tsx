import React from 'react';
import { Droplet, Heart, Code, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="mb-4">About Thirsty</h1>
          <p className="text-muted-foreground text-lg">
            A passion project to reduce plastic waste, one water station at a time.
          </p>
        </div>

        <div className="bg-white border border-border rounded-lg p-6 md:p-8 mb-8">
          <h2 className="mb-4">The Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {`I live in Southern California, where the weather is pretty warm year round. No one knows 
              better than us the importance of staying hydrated, but that doesn't mean it's always the
              easiest.`}
            </p>
            <p>
              {`I created this app as a personal project to combine my passions for software engineering
              and environmental sustainability. The goal is simple: make it easy for 
              anyone to find and share the locations of water stations around the world, encouraging 
              people to carry and refill reusable bottles instead of buying single-use plastic.`}
            </p>
            <p>
              {`One of the biggest problems with sustainable living is it's not always the most convenient.
              Thirsty looks to change that by letting people know before they go, or while they're out and
              about, where they can get access to free, clean drinking water without buying a bottle at the store.`}
            </p>
          </div>
        </div>

        <div className="bg-white border border-border rounded-lg p-6 md:p-8 mb-8">
          <h2 className="mb-6">{`How It's Built`}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="mb-1">Frontend</h4>
                <p className="text-muted-foreground text-sm">
                  Built with React, TypeScript, and Tailwind CSS for a modern, responsive experience
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <Droplet className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="mb-1">Backend</h4>
                <p className="text-muted-foreground text-sm">
                  Powered by PostgreSQL with Prisma and AWS S3 for authentication, database, and real-time updates
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="mb-1">Community</h4>
                <p className="text-muted-foreground text-sm">
                  Users logging stations they discover makes the map better for everyone!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h4 className="mb-1">Sustainability</h4>
                <p className="text-muted-foreground text-sm">
                  {`Inspired by real-life environmental issues I've learned about over the years`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 md:p-8 text-center">
          <h3 className="mb-3 text-white">Join the Movement</h3>
          <p className="mb-6 text-blue-100">
            Whether you're adding your first water station or your fiftieth, every contribution 
            helps build a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.linkedin.com/in/madeline-savoiu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Connect on LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AboutPage;