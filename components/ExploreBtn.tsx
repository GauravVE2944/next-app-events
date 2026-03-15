"use client";
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const ExploreBtn = () => {
  return (
    <Link href="/events" id="explore-btn" className="mt-7 inline-block px-6 py-3 bg-gradient-to-r from-(--primary) to-(--accent) text-white rounded-md hover:from-(--accent) hover:to-(--primary) transition-colors duration-300">
        Explore Events
    </Link>
  )
}

export default ExploreBtn