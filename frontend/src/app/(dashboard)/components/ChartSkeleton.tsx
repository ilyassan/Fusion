import { cn } from "@/lib/utils"

const ChartSkeleton = ({ className }: { className?: string }) => {
    
    return (
        <div className={cn("animate-pulse bg-gray-200 h-[23rem] rounded-md", className)}></div>
    )
}

export default ChartSkeleton