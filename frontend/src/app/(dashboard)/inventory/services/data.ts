import { Service, Category } from "./types/ServiceTypes";

export const mockServices: Service[] = [
  {
    id: 1,
    name: "Business Strategy Consultation",
    description: "Comprehensive business strategy consultation for startups and SMEs",
    price: 1500,
    tax: 0.1,
    category: "Consulting",
  },
  {
    id: 2,
    name: "Web Development Workshop",
    description: "Hands-on workshop covering modern web development techniques",
    price: 800,
    tax: 0.08,
    category: "Training",
  },
  // Add more as needed
];

export const mockCategories: Category[] = [
  { id: 1, name: "Consulting", serviceCount: 5 },
  { id: 2, name: "Training", serviceCount: 3 },
  { id: 3, name: "Support", serviceCount: 4 },
  { id: 4, name: "Development", serviceCount: 6 },
  { id: 5, name: "Design", serviceCount: 2 },
];