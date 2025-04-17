import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import logo from "@/assets/img/logo.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CreateSession } from "./features/create-session";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sessionQuery } from "@/api/queries/session";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { sessionMutation } from "@/api/mutations/session";

export function AppSidebar() {
  const { data: sessions } = useQuery({
    ...sessionQuery.getAllSessionsQuery(),
    select: (data) => Object.values(data).filter((s) => s.isAttached),
  });

  const params = useParams({
    strict: false,
  });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: sessionMutation.detachSession,
    async onSuccess(_, vars) {
      if (params.sessionId === vars.id) {
        await navigate({
          to: "/",
        });
      }
    },
  });

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="https://evinced.com" target="_blank" rel="noreferrer">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img src={logo} alt="Evinced Logo" className="w-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Evinced Inc.</span>
                  <span className="truncate text-xs">a11y leaders</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Button size="lg" asChild>
          <Link to="/">Dashboard</Link>
        </Button>
        <SidebarGroup>
          {sessions && (
            <SidebarGroupLabel>
              {sessions.length
                ? "Opened sessions"
                : "No opened sessions yet..."}
            </SidebarGroupLabel>
          )}

          <SidebarMenu>
            {sessions?.map((s) => {
              return (
                <SidebarMenuItem key={s.id}>
                  <div className="flex items-center gap-2">
                    <SidebarMenuButton
                      asChild
                      isActive={s.id === params.sessionId}
                    >
                      <Link
                        to="/session/$sessionId"
                        params={{
                          sessionId: s.id,
                        }}
                      >
                        <span>{s.name}</span>
                      </Link>
                    </SidebarMenuButton>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => mutate(s)}
                    >
                      <X />
                    </Button>
                  </div>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Card className="shadow-none">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm">Session manager</CardTitle>
            <CardDescription>
              Created session is secured and hosted on your machine. :)
            </CardDescription>
          </CardHeader>
          <CardContent className="grid">
            <CreateSession />
          </CardContent>
        </Card>
      </SidebarFooter>
    </Sidebar>
  );
}
