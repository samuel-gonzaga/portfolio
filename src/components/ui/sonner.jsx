import { Toaster as Sonner } from "sonner"
import React from "react"

const Toaster = ({
  ...props
}) => {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia?.("(prefers-color-scheme: light)")?.matches
        ? "light"
        : "dark"
    }
    return "dark"
  })

  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: light)")
    if (!mq) return
    const handler = (e) => setTheme(e.matches ? "light" : "dark")
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props} />
  );
}

export { Toaster }
