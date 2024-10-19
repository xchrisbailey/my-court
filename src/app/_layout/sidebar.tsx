'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Trophy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Gear',
      url: '#',
      items: [
        {
          title: 'Rackets',
          url: '/rackets',
        },
        {
          title: 'Strings',
          url: '/strings',
        },
        {
          title: 'Brands',
          url: '/brands',
        },
      ],
    },
    {
      title: 'Play',
      url: '#',
      items: [
        {
          title: 'Matches',
          url: '/matches',
        },
        {
          title: 'Practices',
          url: '/practices',
        },
      ],
    },
  ],
};

export default function SidebarComponent() {
  const pathname = usePathname();
  React.useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex justify-center items-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                  <Trophy className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">my court</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="px-1.5 ml-0 border-l-0">
                    {item.items.map(item => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === item.url}
                        >
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
