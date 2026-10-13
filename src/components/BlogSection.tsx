import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/storeData';

interface BlogSectionProps {
  onOpenBlog: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenBlog }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    'All Categories',
    'Piano Guides',
    'Guitar Tips',
    'Gear Reviews',
    'Audio Gear'
  ];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All Categories' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-white min-h-[75vh]">
      {/* Grey Hero Filter Bar matching screenshot 4 */}
      <div className="bg-[#616c78] py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input matching screenshot 4 */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Blogs"
              className="w-full bg-white text-zinc-900 placeholder-zinc-500 text-sm px-4 py-2.5 rounded-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 pr-10 shadow-sm"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-600 hover:text-sky-700"
              aria-label="Search blogs"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Categories Dropdown matching screenshot 4 */}
          <div className="relative w-full sm:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-white text-zinc-900 text-sm px-4 py-2.5 rounded-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer shadow-sm pr-9"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All Categories' ? '☰ Blog Categories' : cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Blog Cards Section matching screenshot 4 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Section title */}
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-8">
          Blog
        </h1>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-sm">
            No articles found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          /* 3-Column Grid matching screenshot 4 */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onOpenBlog(post)}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="w-full aspect-video rounded-sm overflow-hidden mb-4 bg-zinc-100 relative shadow-sm">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = '/src/assets/images/blog_piano_keyboard_1791430723519.jpg';
                      }}
                    />
                  </div>

                  {/* Date & Meta line matching screenshot 4: "| September 23rd, 2026" */}
                  <div className="text-xs text-zinc-500 flex items-center gap-2 mb-2">
                    <span className="text-zinc-400 font-light">|</span>
                    <span>{post.date}</span>
                    <span className="text-zinc-300">·</span>
                    <span className="text-amber-600 font-medium">{post.category}</span>
                  </div>

                  {/* Title matching screenshot 4 */}
                  <h2 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2 mb-3">
                    {post.title}
                  </h2>

                  {/* Excerpt text matching screenshot 4 */}
                  <p className="text-xs sm:text-sm text-zinc-600 line-clamp-4 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between border-t border-zinc-100 text-xs">
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <span className="font-semibold text-amber-600 group-hover:text-amber-700 flex items-center gap-1">
                    Read article <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
