"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Brain,
  Youtube,
  Wand2,
  Sparkles,
  TrendingUp,
  Menu,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function KreelLandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const id = session?.user?.id;

    // Check if the session is not loading and user id exists
    if (id && status !== "loading") {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Optionally render a loading state
  }
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <header className="px-4 lg:px-6 h-14 flex items-center h-[10vh]">
        <Link className="flex items-center justify-center" href="#">
          <Brain className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">Kreel</span>
        </Link>
        <nav className="ml-auto hidden lg:flex items-center gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
          <Link
            className="text-sm font-bold underline hover:font-extrabold underline-offset-4 transition ease-in-out duration-150"
            href="/auth/login"
          >
            Sign in
          </Link>
          <Link
            className="bg-red-700 py-2 px-5 rounded-full text-sm font-bold hover:bg-red-400 underline-offset-4 transition ease-in-out duration-150"
            href="#"
          >
            Get Started
          </Link>
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="ml-auto relative rounded-full lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-y-5 py-5 px-4 items-center bg-gray-400">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              Pricing
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              About
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              Contact
            </Link>
            <Link
              className="text-sm font-bold underline hover:font-extrabold underline-offset-4 transition ease-in-out duration-150"
              href="/auth/login"
            >
              Sign in
            </Link>
            <Link
              className="bg-red-700 text-white py-2 px-5 rounded-full text-sm font-bold hover:bg-red-400 underline-offset-4 transition ease-in-out duration-150"
              href="#"
            >
              Get Started
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex-1">
        <section className="w-full flex items-center bg-gradient-to-r from-red-500/10 via-primary/5 to-background h-[90vh]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Supercharge Your YouTube Channel with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Kreel&apos;s YouTube Tools use cutting-edge AI to optimize
                    your content, boost engagement, and grow your audience.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">Try YouTube Tools</Button>
                  <Button size="lg" variant="outline">
                    Watch Demo
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Youtube className="h-64 w-64 text-red-500 animate-pulse" />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Kreel&apos;s YouTube Tools
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Wand2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Title Optimizer</h3>
                <p className="text-muted-foreground">
                  AI-powered title generation for maximum click-through rates.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Sparkles className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Thumbnail Creator</h3>
                <p className="text-muted-foreground">
                  Create eye-catching thumbnails that drive views.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Trend Analyzer</h3>
                <p className="text-muted-foreground">
                  Stay ahead of the curve with AI-driven content trend
                  predictions.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
                </h2>
                <ul className="grid gap-6 list-none">
                  <li className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <p>Upload your video or provide your YouTube link</p>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <p>Our AI analyzes your content and audience data</p>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <p>
                      Receive optimized titles, thumbnails, and trend insights
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <p>Apply changes and watch your channel grow!</p>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[300px] h-[600px] bg-gray-200 rounded-xl overflow-hidden">
                  <div className="absolute inset-2 bg-white rounded-lg shadow-inner flex flex-col">
                    <div className="h-12 bg-red-500 flex items-center px-4">
                      <Youtube className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 p-4 space-y-4">
                      <div className="w-full h-40 bg-gray-200 rounded animate-pulse" />
                      <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Grow Your YouTube Channel?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of content creators who have boosted their
                  views and subscribers with Kreel&apos;s YouTube Tools.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your YouTube channel"
                    type="text"
                  />
                  <Button type="submit">Analyze</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  Get a free analysis of your channel.{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2023 Kreel AI Tools. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
