'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function NotFound() {
  const params = useParams<{ id: string }>();
  return (
    <div className="grid place-content-center w-full h-full">
      <h2>Not Found</h2>
      <p>Could not find requested brand ({params.id})</p>
      <Link href="/brands">View All Brands</Link>
    </div>
  );
}
