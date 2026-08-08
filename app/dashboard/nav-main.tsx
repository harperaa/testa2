"use client"

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react"
import { usePathname, useRouter } from "next/navigation"
import { useOptimistic, useTransition } from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [optimisticPath, setOptimisticPath] = useOptimistic(pathname)
  const [isPending, startTransition] = useTransition()

  const handleNavigation = (url: string) => {
    startTransition(() => {
      setOptimisticPath(url)
      router.push(url)
    })
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2" data-pending={isPending ? "" : undefined}>
        <SidebarMenu>
          <SidebarMenuItem className="mb-4">
            <SidebarMenuButton
              tooltip="Log meal or workout"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
              onClick={() => handleNavigation("/dashboard/log?add=meal")}
            >
              <IconCirclePlusFilled />
              <span>Quick log</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              optimisticPath === item.url ||
              (item.url !== "/dashboard" && optimisticPath.startsWith(item.url))

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  onClick={() => handleNavigation(item.url)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
