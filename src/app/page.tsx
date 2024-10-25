import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            className="flex items-center space-x-2"
            href="/"
          >
            <span className="font-bold">ACME Inc</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link href="#features">Features</Link>
            <Link href="#testimonials">Testimonials</Link>
            <Link href="#pricing">Pricing</Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden md:inline-flex"
            >
              <Link
                scroll={false}
                href={session?.user ? "/dashboard" : "/auth/login"}
              >
                {session?.user ? "Dashboard" : "Login"}
              </Link>
            </Button>
            <ModeToggle
              type="button"
              variant="ghost"
            />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navigate through our site</SheetDescription>
                </SheetHeader>
                <nav className="mt-4 flex flex-col space-y-4">
                  <Link href="#features">Features</Link>
                  <Link href="#testimonials">Testimonials</Link>
                  <Link href="#pricing">Pricing</Link>
                  <Button variant="outline">
                    <Link
                      scroll={false}
                      href={session?.user ? "/dashboard" : "/auth/login"}
                    >
                      {session?.user ? "Dashboard" : "Login"}
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to ACME Inc
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Revolutionizing the way you work. Streamlined solutions for
                  modern businesses.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full bg-muted py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Features
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Intuitive Design",
                  description:
                    "User-friendly interface that's easy to navigate.",
                },
                {
                  title: "Powerful Analytics",
                  description:
                    "Gain insights with our advanced analytics tools.",
                },
                {
                  title: "Secure & Reliable",
                  description:
                    "Your data is safe with our top-notch security measures.",
                },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {[
                {
                  name: "Alex Johnson",
                  role: "CEO, TechCorp",
                  quote: "ACME Inc has transformed the way we do business.",
                },
                {
                  name: "Sam Lee",
                  role: "CTO, InnovateCo",
                  quote: "The analytics tools are a game-changer for our team.",
                },
                {
                  name: "Jamie Smith",
                  role: "Founder, StartUp",
                  quote:
                    "I couldn't imagine running my business without ACME Inc.",
                },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{`"${testimonial.quote}"`}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full bg-muted py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              Pricing Plans
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {[
                {
                  name: "Basic",
                  price: "$9.99",
                  features: ["Feature 1", "Feature 2", "Feature 3"],
                },
                {
                  name: "Pro",
                  price: "$19.99",
                  features: [
                    "Everything in Basic",
                    "Pro Feature 1",
                    "Pro Feature 2",
                  ],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  features: [
                    "Everything in Pro",
                    "Enterprise Feature 1",
                    "24/7 Support",
                  ],
                },
              ].map((plan, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && (
                        <span className="text-muted-foreground"> /month</span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center"
                        >
                          <svg
                            className="mr-2 h-5 w-5 text-primary"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Choose Plan</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied customers and take your business
                  to the next level.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-muted py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © 2023 ACME Inc. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                className="text-sm text-muted-foreground hover:underline"
                href="#"
              >
                Terms
              </Link>
              <Link
                className="text-sm text-muted-foreground hover:underline"
                href="#"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
