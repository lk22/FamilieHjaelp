import * as React from "react"

import { cn } from "@/lib/utils"

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
    marginBlock?: string;
    className?: string;
}

export const Divider = ({ className, marginBlock }: DividerProps) => {
    return (
        <div className={cn(`my-${marginBlock}`, className)} style={{ marginBlock }} />
    )
}