'use client';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useSession } from '@/lib/auth/context';
import {
  ChevronDown,
  ChevronRight,
  Eye,
  Home,
  Package,
  PlusCircle,
  Shell,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function NavigationLinks() {
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isRacketsOpen, setIsRacketsOpen] = useState(false);
  const [isStringsOpen, setIsStringsOpen] = useState(false);
  const session = useSession();

  return (
    <nav className="flex flex-col px-2 mt-8 space-y-2">
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
              <Eye className="mr-2 w-4 h-4" />
              View All Brands
            </Button>
          </Link>
          {session.user ? (
            <Link href="/brands/new" passHref legacyBehavior>
              <Button variant="ghost" className="justify-start w-full">
                <PlusCircle className="mr-2 w-4 h-4" />
                Add New Brand
              </Button>
            </Link>
          ) : null}
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={isRacketsOpen}
        onOpenChange={setIsRacketsOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="justify-between w-full">
            <span className="flex items-center">
              <Trophy className="mr-2 w-4 h-4" />
              Rackets
            </span>
            {isRacketsOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 space-y-2">
          <Link href="/rackets" passHref legacyBehavior>
            <Button variant="ghost" className="justify-start w-full">
              <Eye className="mr-2 w-4 h-4" />
              View All Rackets
            </Button>
          </Link>
          {session.user ? (
            <Link href="/rackets/new" passHref legacyBehavior>
              <Button variant="ghost" className="justify-start w-full">
                <PlusCircle className="mr-2 w-4 h-4" />
                Add New Racket
              </Button>
            </Link>
          ) : null}
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={isStringsOpen}
        onOpenChange={setIsStringsOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="justify-between w-full">
            <span className="flex items-center">
              <Shell className="mr-2 w-4 h-4" />
              Strings
            </span>
            {isStringsOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 space-y-2">
          <Link href="/strings" passHref legacyBehavior>
            <Button variant="ghost" className="justify-start w-full">
              <Eye className="mr-2 w-4 h-4" />
              View All Strings
            </Button>
          </Link>
          {session.user ? (
            <Link href="/strings/new" passHref legacyBehavior>
              <Button variant="ghost" className="justify-start w-full">
                <PlusCircle className="mr-2 w-4 h-4" />
                Add New String
              </Button>
            </Link>
          ) : null}
        </CollapsibleContent>
      </Collapsible>
    </nav>
  );
}
