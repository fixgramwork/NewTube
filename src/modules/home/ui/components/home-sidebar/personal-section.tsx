"use client";

import {HistoryIcon, ThumbsUpIcon, ListVideoIcon} from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useAuth, useClerk } from "@clerk/nextjs";


const items = [
    {
        title: "History",
        url: "/playlists/history",
        icon: HistoryIcon,
        auth: true,
    },
    {
      title: "Liked videos",
      url: "/playlists/liked",
      icon: ThumbsUpIcon,
      auth: true,
    },
    {
        title: "All Playlists",
        url: "/playlists",
        icon: ListVideoIcon,
        auth: true,
    },
];

export const PersonalSection = () => {
    const clerk = useClerk();
    const { isSignedIn } = useAuth();

    return(
        <SidebarGroup>
            <SidebarGroupLabel> You </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    asChild
                                    isActive={false} // TODO: Change to look current pathname
                                    onClick={(e) => {
                                        if (!isSignedIn && item.auth) {
                                            e.preventDefault();
                                            return clerk.openSignIn();
                                        }
                                    }} // TODO: DO something on click
                                >
                                    <Link href={item.url} className="flex items-center grap-4">
                                        <item.icon/>
                                        <span className="text-sm">{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
        </SidebarGroup>
    )
}