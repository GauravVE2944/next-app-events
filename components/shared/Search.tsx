"use client";
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import Image from 'next/image'
import { searchEvents } from '@/lib/actions/event.action';
import { Loader2 } from 'lucide-react';
const Search = ({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) => {
  const router = useRouter();

  const searchRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  }

  const handleResultClick = (slug: string) => {
    console.log('item CLickable');
    router.push(`/events/${slug}`);
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length < 2) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const data = await searchEvents(searchQuery);
      console.log('resData', data);
      setResults(data);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleHideSearchResContainer = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
            console.log('useEffect CLickable');

        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleHideSearchResContainer);
    return () => document.removeEventListener("mousedown", handleHideSearchResContainer);
  },[]);

  return (
    <div className="relative w-full max-w-4xl" ref={searchRef}>
      <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2" >
        <Image
          src="/icons/search.svg"
          alt="search"
          width={24}
          height={24}
        />
        <Input
          type="text"
          placeholder={placeholder}
          onChange={handleSearchInput}
          className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {/* Loading State */}
      
      {isLoading ?
         ( <div className="p-4 flex items-center justify-center">
                 <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
          </div>
      ) :

      results && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-grey-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="py-2">
            <p className="px-4 py-2 text-xs font-semibold text-muted-foreground">
              SEARCH RESULTS
            </p>
            {results.map((event) => (
              <div key={event._id} onClick={() => handleResultClick(event.slug)} className="flex items-start gap-3 px-4 py-2 hover:bg-grey-50 cursor-pointer transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-medium line-clamp-2 text-grey-800">
                    {event.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
  )
}

export default Search