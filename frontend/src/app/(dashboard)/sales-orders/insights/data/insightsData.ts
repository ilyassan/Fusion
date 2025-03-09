export const mockPredictionMetrics = {
    confidenceScore: { value: "87%", description: "High prediction reliability", color: "purple" },
    forecastAccuracy: { value: "92.5%", description: "Based on historical predictions", color: "yellow" },
    predictionWindow: { value: "180 Days", description: "Rolling forecast period", color: "blue" },
};

export const mockForecastData = [
    { month: "Jan", actual: 4000, predicted: 4100, lower: 3900, upper: 4300 },
    { month: "Feb", actual: 4500, predicted: 4600, lower: 4400, upper: 4800 },
    { month: "Mar", actual: 5100, predicted: 5000, lower: 4800, upper: 5200 },
    { month: "Apr", actual: null, predicted: 5600, lower: 5300, upper: 5900 },
    { month: "May", actual: null, predicted: 6200, lower: 5900, upper: 6500 },
    { month: "Jun", actual: null, predicted: 6800, lower: 6500, upper: 7100 },
];

interface RecommendationsProps {
    title: string;
    description: string;
    color: string;
    icon: "TrendingUp" | "AlertTriangle";
}

export const mockRecommendations: RecommendationsProps[] = [
    {
    title: "Growth Strategy",
    description: "Based on seasonality patterns, optimal timing for new product launches would be early Q3. Historical data suggests 23% higher adoption rates during this period.",
    color: "blue",
    icon: "TrendingUp",
    },
    {
    title: "Risk Mitigation",
    description: "Prediction models indicate potential market saturation in current segments. Consider diversifying into emerging market segments with 45% growth potential.",
    color: "yellow",
    icon: "AlertTriangle",
    },
];

export const mockInsights = [
    {
    type: "opportunity",
    title: "Price Optimization",
    description: "Consider 5-10% price increase for Product A based on market analysis and demand patterns.",
    impact: "High Impact",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    },
    {
    type: "risk",
    title: "Customer Churn Risk",
    description: "10 high-value customers showing decreased engagement. Implement retention strategy.",
    impact: "Critical",
    color: "bg-red-100 text-red-800 hover:bg-red-200",
    },
    {
    type: "insight",
    title: "Market Expansion",
    description: "Data suggests strong potential for market expansion in the Western region.",
    impact: "Medium Impact",
    color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    },
];

// Server actions to fetch data
export async function fetchPredictionMetrics() {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async fetch
    return mockPredictionMetrics;
}

export async function fetchForecastData() {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async fetch
    return mockForecastData;
}

export async function fetchRecommendations() {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async fetch
    return mockRecommendations;
}

export async function fetchInsights() {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async fetch
    return mockInsights;
}