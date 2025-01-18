import React, { ReactNode } from "react";
import LayoutSidebar from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex w-screen">
      <div>
        <SidebarProvider>
          <LayoutSidebar />
        </SidebarProvider>
      </div>
      <div className="w-[calc(100%-256px)] overflow-hidden">{children}</div>
    </div>
  );
};

export default Layout;
