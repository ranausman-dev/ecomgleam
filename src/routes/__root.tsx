import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

// Global DOM safeguard: Prevent browser extensions (ColorZilla, Google Translate, Grammarly, etc.)
// from crashing React 19 during route unmount with "NotFoundError: Failed to execute 'removeChild' on 'Node'"
if (typeof window !== "undefined") {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      if (console && typeof console.warn === "function") {
        console.warn("Handled removeChild: node was not a direct child of parent.", child, this);
      }
      // If node was reparented (e.g. by GSAP pin-spacer or an extension), remove it from its actual parent
      // so it does NOT get left behind on screen when switching routes
      if (child.parentNode) {
        try {
          child.parentNode.removeChild(child);
        } catch {
          (child as any).remove?.();
        }
      } else {
        (child as any).remove?.();
      }
      return child;
    }
    return originalRemoveChild.apply(this, [child]) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console && typeof console.warn === "function") {
        console.warn("Handled insertBefore: referenceNode was not a child of parent.", referenceNode, this);
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, [newNode, referenceNode]) as T;
  };
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  // Self-heal immediately if a DOM NotFoundError happens during route unmount
  useEffect(() => {
    if (
      error?.message?.includes("removeChild") ||
      error?.message?.includes("insertBefore") ||
      error?.name === "NotFoundError"
    ) {
      router.invalidate();
      reset();
    }
  }, [error, reset, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ecom Gleam — Brand Growth, Commerce & Market Expansion" },
      {
        name: "description",
        content:
          "Ecom Gleam is an integrated brand growth, commerce and market expansion firm working across marketplaces, DTC and retail in the USA, UK and UAE.",
      },
      { name: "author", content: "Ecom Gleam" },
      { name: "google", content: "notranslate" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@500;600;700&family=Six+Caps&family=Archivo:wght@400;500;600;700;800;900&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" translate="no" className="notranslate" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body translate="no" className="notranslate" suppressHydrationWarning>
        <div id="app" className="min-h-screen">
          {children}
        </div>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  useEffect(() => {
    // Reset window scroll to top instantly on every route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Clean up any stale ScrollTriggers that might have been left behind from a previous page
    if (typeof window !== "undefined") {
      try {
        const triggers = (window as any).ScrollTrigger?.getAll?.();
        if (triggers && Array.isArray(triggers)) {
          triggers.forEach((t: any) => t.kill(true));
        }
      } catch {}

      // Clean up any lingering pin-spacers
      document.querySelectorAll(".pin-spacer").forEach((el) => {
        try {
          if (el.parentNode) {
            // Unwrap children if any are trapped inside
            while (el.firstChild) {
              el.parentNode.insertBefore(el.firstChild, el);
            }
            el.parentNode.removeChild(el);
          }
        } catch {}
      });
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="min-h-screen">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}

