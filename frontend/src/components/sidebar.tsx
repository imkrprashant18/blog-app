"use-client";

import { Home, List, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import UserDetials from "./user-detials/user-detials";
const menuItems = [
  { title: "Dashboard", icon: Home, url: "/dashboard" },
  { title: "Add Post", icon: List, url: "/add-post" },
  { title: "Settings", icon: Settings, url: "/settings" },
];
function LayoutSidebar() {
  return (
    <div className="w-64 overflow-hidden">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel></SidebarGroupLabel>
            <div className="gap-12 flex  flex-col">
              <UserDetials />
              <SidebarGroupContent className="px-4">
                <SidebarMenu className="space-y-2 py-4">
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex py-4 items-center gap-2"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export default LayoutSidebar;
