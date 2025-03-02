import { cn } from "@/lib/utils"

const Skeleton = ({ className }: { className?: string }) => {
    
    return (
        <div className={cn("animate-pulse bg-gray-200 h-3 rounded-md", className)}></div>
    )
}

export default Skeleton