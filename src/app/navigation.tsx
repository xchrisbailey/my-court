'use client';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  ChevronRight,
  Home,
  Package,
  PlusCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function NavigationLinks() {
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  return (
    <nav className="flex flex-col mt-8 space-y-2">
      <Link href="/" passHref legacyBehavior>
        <Button variant="ghost" className="justify-start w-full">
          <Home className="mr-2 w-4 h-4" />
          Home
        </Button>
      </Link>
      <Collapsible
        open={isBrandsOpen}
        onOpenChange={setIsBrandsOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="justify-between w-full">
            <span className="flex items-center">
              <Package className="mr-2 w-4 h-4" />
              Brands
            </span>
            {isBrandsOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 space-y-2">
          <Link href="/brands" passHref legacyBehavior>
            <Button variant="ghost" className="justify-start w-full">
              <Package className="mr-2 w-4 h-4" />
              View All Brands
            </Button>
          </Link>
          <Link href="/brands/new" passHref legacyBehavior>
            <Button variant="ghost" className="justify-start w-full">
              <PlusCircle className="mr-2 w-4 h-4" />
              Add New Brand
            </Button>
          </Link>
        </CollapsibleContent>
      </Collapsible>
    </nav>
  );
}
