export type Deal = {
    id: string
    name: string
    customer: string
    value: number
    priority: Priority
    status: string
    salesRep: string
    expectedClose: string
    lastActivity: string
    notes: {
      date: string;
      content: string;
      author: string;
    }[]
    activities: Activity[]
  }
  
  export type Activity = {
    date: string
    type: "call" | "email" | "meeting";
    description: string
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

  export type Priority = "high" | "medium" | "low";