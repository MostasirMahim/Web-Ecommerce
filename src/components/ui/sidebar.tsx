"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const SidebarContext = React.createContext({
  open: true,
  setOpen: (open: boolean) => {},
})

export function SidebarProvider({
  children,
  defaultOpen = true,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [_open, _setOpen] = React.useState(defaultOpen)
  const openState = open !== undefined ? open : _open
  const setOpen = React.useCallback(
    (open: boolean) => {
      _setOpen(open)
      onOpenChange?.(open)
    },
    [onOpenChange],
  )

  return <SidebarContext.Provider value={{ open: openState, setOpen }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const sidebarVariants = cva("relative flex h-screen flex-col transition-all duration-300 ease-in-out", {
  variants: {
    variant: {
      sidebar: "border-r bg-background",
      panel: "border-r bg-background",
    },
    collapsible: {
      icon: "w-[var(--sidebar-width)] data-[collapsed=true]:w-[var(--sidebar-collapsed-width)]",
      full: "w-[var(--sidebar-width)] data-[collapsed=true]:w-0",
    },
  },
  defaultVariants: {
    variant: "sidebar",
    collapsible: "full",
  },
})

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sidebar" | "panel"
  collapsible?: "icon" | "full"
}

export function Sidebar({ className, variant, collapsible, ...props }: SidebarProps) {
  const { open } = useSidebar()

  return (
    <aside
      className={cn(sidebarVariants({ variant, collapsible }), className)}
      data-collapsed={!open}
      style={
        {
          "--sidebar-width": "240px",
          "--sidebar-collapsed-width": "56px",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", className)} {...props} />
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-auto p-2", className)} {...props} />
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", className)} {...props} />
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSidebar()

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      onClick={() => setOpen(!open)}
      {...props}
    />
  )
}

export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 p-2", className)} {...props} />
}

export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative", className)} {...props} />
}

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  asChild?: boolean
}

export function SidebarMenuButton({
  className,
  isActive,
  asChild = false,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { open } = useSidebar()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/50",
        isActive && "bg-muted",
        !open && "justify-center px-0",
        className,
      ),
    })
  }

  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/50",
        isActive && "bg-muted",
        !open && "justify-center px-0",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
