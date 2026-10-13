import React from 'react';
import { X, Calendar, Clock, User, Share2 } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogDetailModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-md shadow-2xl max-w-2xl w-full overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-zinc-900 bg-white/80 rounded-full hover:bg-zinc-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image */}
        <div className="w-full h-64 overflow-hidden bg-zinc-100">
          <img
            src={post.image}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
            <span className="bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded text-[11px]">
              {post.category}
            </span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-snug mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 pb-6 border-b border-zinc-200 text-xs text-zinc-600">
            <User className="w-4 h-4 text-zinc-400" />
            <span>Written by <strong className="text-zinc-900">{post.author}</strong></span>
          </div>

          {/* Article content */}
          <div className="mt-6 space-y-4 text-sm text-zinc-700 leading-relaxed">
            <p className="font-medium text-zinc-900 bg-zinc-50 p-4 rounded-sm border-l-4 border-amber-400 italic">
              &ldquo;{post.summary}&rdquo;
            </p>

            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-200 flex items-center justify-between">
            <span className="text-xs text-zinc-500">Procraft India Editorial</span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Article link copied to clipboard!');
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
