"use client";
import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock user data

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const user = session?.user;

  if (status === "loading") {
    return <div>Loading...</div>; // Optionally render a loading state
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the sidebar is open and if the clicked element is outside the sidebar
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false); // Close the sidebar
      }
    };

    // Add event listener to listen for clicks on the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar */}
      <aside
        ref={sidebarRef} // Attach the ref to the sidebar
        className={`bg-gray-950 w-64 p-4 flex flex-col transition-all duration-300 ease-in-out text-gray-400 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static h-full z-50`}
      >
        <div className="flex items-center mb-8">
          <Brain className="h-8 w-8 text-gray-400 mr-2" />
          <span className="text-2xl font-bold">Kreel</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                href="#youtube-tools"
                className="flex items-center p-2 rounded-lg hover:bg-primary/10 text-foreground"
              >
                <Youtube className="h-5 w-5 mr-3 text-gray-400" />
                YouTube Tools
              </Link>
            </li>
            <li>
              <Link
                href="#title-optimizer"
                className="flex items-center p-2 rounded-lg hover:bg-primary/10 text-foreground"
              >
                <Wand2 className="h-5 w-5 mr-3 text-gray-400" />
                Title Optimizer
              </Link>
            </li>
            <li>
              <Link
                href="#thumbnail-creator"
                className="flex items-center p-2 rounded-lg hover:bg-primary/10 text-foreground"
              >
                <Sparkles className="h-5 w-5 mr-3 text-gray-400" />
                Thumbnail Creator
              </Link>
            </li>
            <li>
              <Link
                href="#trend-analyzer"
                className="flex items-center p-2 rounded-lg hover:bg-primary/10 text-foreground"
              >
                <TrendingUp className="h-5 w-5 mr-3 text-gray-400" />
                Trend Analyzer
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-900 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex gap-2 lg-hidden">
            <Brain className="h-8 w-8 text-gray-400" />
            <h1 className="text-2xl font-bold">Kreel</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 hidden md:block"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full">
                  <span className="font-bold underline">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSignOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main dashboard content */}
        <main className="flex-1 overflow-y-auto p-6 bg-muted/40 bg-white text-gray-700">
          <h2 className="text-3xl font-bold mb-6">
            Welcome back, {user?.name?.split(" ")[0]}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className=" p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold mb-4">YouTube Analytics</h3>
              <p className="text-muted-foreground">
                Your channel performance at a glance.
              </p>
              {/* Add YouTube analytics content here */}
            </div>
            <div className="bg-background p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold mb-4">
                Recent Optimizations
              </h3>
              <p className="text-muted-foreground">
                Your latest AI-powered improvements.
              </p>
              {/* Add recent optimizations content here */}
            </div>
            <div className="bg-background p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold mb-4">Trending Topics</h3>
              <p className="text-muted-foreground">Hot topics in your niche.</p>
              {/* Add trending topics content here */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
