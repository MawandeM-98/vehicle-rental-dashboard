import * as React from "react"
import { cn } from "@/lib/utils"

export function Panel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700 transition-all duration-200 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}