export type Deal = {
    id: string
    name: string
    customer: string
    value: number
    priority: "high" | "medium" | "low"
    status: string
    salesRep: string
    expectedClose: string
    lastActivity: string
    notes: string
    activities: Activity[]
    tasks: Task[]
  }
  
  export type Activity = {
    date: string
    type: string
    description: string
  }
  
  export type Task = {
    title: string
    due: string
    status: "pending" | "completed"
  }
  
  export type Filters = {
    search: string
    priority: string
    fromDate: Date | undefined
    toDate: Date | undefined
  }
  
  export type DealsData = {
    [key: string]: Deal[]
  }