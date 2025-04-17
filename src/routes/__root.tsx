import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "@/components/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "@tanstack/react-router";
import { useQuery, type QueryClient } from "@tanstack/react-query";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { useParams } from "@tanstack/react-router";
import { sessionQuery } from "@/api/queries/session";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  notFoundComponent: () => {
    return (
      <EmptyState message="404! Page does not exist!!!">
        <Button asChild size="lg">
          <Link to="/">Back to dashboard</Link>
        </Button>
      </EmptyState>
    );
  },
  component: Root,
});

function Root() {
  const params = useParams({
    strict: false,
  });

  const { data: session } = useQuery({
    enabled: Boolean(params.sessionId),
    // NOTE: tanstack still discovers how to inherit type from "enabled" key...
    // but here we definetely not that sessionId is not undefined or null
    ...sessionQuery.getDetailsQuery(params.sessionId as string),
  });

  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink asChild>
                        <Link to="/">Dashboard</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {session && (
                      <>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage>{session?.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="ml-auto">
                <ModeToggle />
              </div>
            </header>

            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>

      <TanStackRouterDevtools initialIsOpen={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
