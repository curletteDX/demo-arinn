import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        {/* 404 Number */}
        <div className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
          404
        </div>

        {/* Clean message */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <p className="text-gray-500">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
