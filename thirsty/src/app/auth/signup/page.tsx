'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useAuth } from './AuthContext';
import { Upload } from 'lucide-react';

const SignUpPage: React.FC = () => {
//   const { signup } = useAuth();
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate a preview URL whenever profilePicture changes
  useEffect(() => {
    if (!profilePicture) {
      setPreviewURL(null);
      return;
    }

    const url = URL.createObjectURL(profilePicture);
    setPreviewURL(url);

    return () => URL.revokeObjectURL(url); // Cleanup to prevent memory leaks
  }, [profilePicture]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append("name", displayName);
    formData.append("email", email);
    formData.append("password", password);

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.ok) {
      router.push("/");
    } else {
      setError('Failed to create account. Please try again.');
    }

      setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="mb-2">Create Your Account</h2>
          <p className="text-muted-foreground">
            Join the community and start saving plastic bottles!
          </p>
        </div>

        <div className="bg-white border border-border rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="displayName" className="block mb-2">Display Name</label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="profilePicture" className="block mb-2">
                Profile Picture (Optional)
              </label>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="profilePicture"
                  className="flex-1 px-3 py-2 border border-border rounded-lg bg-input-background cursor-pointer hover:bg-accent transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {profilePicture ? 'Change Image' : 'Upload Image'}
                  </span>
                </label>
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={event => setProfilePicture(event.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>

              {previewURL && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={previewURL}
                    alt="Profile preview"
                    className="h-12 w-12 rounded-full object-cover border border-border"
                  />
                  <span className="text-sm text-muted-foreground">Preview</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="At least 6 characters"
              />
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{' '}
              <button
                onClick={() => router.push('auth/login')}
                className="text-primary hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;