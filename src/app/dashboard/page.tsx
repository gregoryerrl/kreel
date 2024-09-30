"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Brain,
  LogOut,
  Menu,
  Settings,
  User,
  Wand2,
  Youtube,
  Sparkles,
  TrendingUp,
  X,
  Search,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ChannelFinder from "@/components/ChannelFinder";
import YoutubeTools from "@/components/YoutubeTools";

// YouTube Tools Component

// YouTube Channel Finder Component

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <h2 className="text-3xl font-bold mb-6 text-white">
              Welcome back, {user?.name?.split(" ")[0]}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  YouTube Analytics
                </h3>
                <p className="text-gray-400">
                  Your channel performance at a glance.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Recent Optimizations
                </h3>
                <p className="text-gray-400">
                  Your latest AI-powered improvements.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Trending Topics
                </h3>
                <p className="text-gray-400">Hot topics in your niche.</p>
              </div>
            </div>
          </>
        );
      case "youtube-tools":
        return (
          <YoutubeTools
            setFinderPage={() => setCurrentPage("channel-finder")}
          />
        );
      case "channel-finder":
        return <ChannelFinder />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 w-64 p-4 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static h-full z-50`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-blue-400 mr-2" />
            <span className="text-2xl font-bold text-white">Kreel</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSidebar}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => {
                  setCurrentPage("home");
                  closeSidebar();
                }}
              >
                <User className="h-5 w-5 mr-3 text-blue-400" />
                Dashboard
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => {
                  setCurrentPage("youtube-tools");
                  closeSidebar();
                }}
              >
                <Youtube className="h-5 w-5 mr-3 text-blue-400" />
                YouTube Tools
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 pl-12"
                onClick={() => {
                  setCurrentPage("channel-finder");
                  closeSidebar();
                }}
              >
                <Search className="h-5 w-5 mr-3 text-blue-400" />
                Channel Finder
              </Button>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 hover:text-white border-gray-600 hover:bg-gray-700"
            asChild
          >
            <Link href="/settings" onClick={closeSidebar}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white lg:hidden">Kreel</h1>
          <div className="flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 hidden md:block bg-gray-700 text-white placeholder-gray-400 border-gray-600"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full">
                  <span>{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-gray-800 text-gray-100 border border-gray-700"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem
                  className="hover:bg-gray-700"
                  onClick={() => handleSignOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main dashboard content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
