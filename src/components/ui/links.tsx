import { LayoutDashboardIcon, Users2Icon } from "lucide-react";

export const links = [
  {
    id: `${new Date().getTime().toString(36)}${Math.random().toString(36).substring(2, 8)}`,
    href: "/dashboard",
    label: "Dashboard",
    roles: ["ADMIN", "USER"],
    icon: <LayoutDashboardIcon />,
  },
  {
    id: `${new Date().getTime().toString(36)}${Math.random().toString(36).substring(2, 8)}`,
    href: "/dashboard/users",
    label: "Users",
    roles: ["ADMIN"],
    icon: <Users2Icon />,
  },
];
