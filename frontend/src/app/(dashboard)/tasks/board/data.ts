import { KanbanData, Priority, TaskStatus, Filters } from "./types/KanbanTypes";

export const priorityColors: Record<Priority, string> = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

export const mockTasks: KanbanData = {
  todo: [
    {
      id: "1",
      title: "Design homepage",
      description: "Create wireframes and mockups for the homepage using Figma.",
      project: "Website Revamp",
      assignee: ["user1", "user3"],
      startDate: "2025-03-18",
      dueDate: "2025-03-25",
      priority: "medium",
      status: "todo",
      tags: ["design", "frontend", "ui"],
      comments: [
        {
          id: "c1",
          author: "user1",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
          content: "Started with initial wireframes, need feedback.",
          createdAt: "2025-03-18T10:00:00Z",
        },
      ],
      activityLog: [
        {
          id: "a1",
          type: "created",
          description: "Task created",
          author: "user1",
          timestamp: "2025-03-17T09:00:00Z",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
        {
          id: "a2",
          type: "assigned",
          description: "Assigned to user1 and user3",
          author: "user1",
          timestamp: "2025-03-17T09:05:00Z",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
        {
          id: "a3",
          type: "comment_added",
          description: "Comment added by user1",
          author: "user1",
          timestamp: "2025-03-18T10:00:00Z",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
      ],
    },
    {
      id: "4",
      title: "Plan user testing",
      description: "Schedule sessions and prepare test scenarios for the new feature.",
      project: "UX Research",
      assignee: ["user2"],
      startDate: "2025-03-20",
      dueDate: "2025-03-28",
      priority: "low",
      status: "todo",
      tags: ["ux", "testing"],
      comments: [],
      activityLog: [
        {
          id: "a4",
          type: "created",
          description: "Task created",
          author: "user2",
          timestamp: "2025-03-19T14:00:00Z",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
        {
          id: "a5",
          type: "deadline_change",
          description: "Due date set to March 28, 2025",
          author: "user2",
          timestamp: "2025-03-19T14:05:00Z",
          details: { to: "2025-03-28" },
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
      ],
    },
  ],
  inprogress: [
    {
      id: "2",
      title: "Implement authentication",
      description: "Set up JWT-based authentication for API endpoints using Node.js.",
      project: "Backend",
      assignee: ["user2", "user4"],
      startDate: "2025-03-15",
      dueDate: "2025-03-20",
      priority: "high",
      status: "inprogress",
      tags: ["backend", "security", "api"],
      comments: [
        {
          id: "c2",
          author: "user2",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
          content: "Encountered an issue with token refresh, investigating.",
          createdAt: "2025-03-16T15:30:00Z",
        },
        {
          id: "c3",
          author: "user4",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
          content: "Added middleware for token validation.",
          createdAt: "2025-03-17T09:45:00Z",
        },
      ],
      activityLog: [
        {
          id: "a6",
          type: "created",
          description: "Task created",
          author: "user2",
          timestamp: "2025-03-14T08:00:00Z",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
        {
          id: "a7",
          type: "status_change",
          description: "Moved to In Progress",
          author: "user2",
          timestamp: "2025-03-15T09:00:00Z",
          details: { from: "todo", to: "inprogress" },
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
        {
          id: "a8",
          type: "assigned",
          description: "Assigned to user4",
          author: "user2",
          timestamp: "2025-03-15T09:05:00Z",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
        {
          id: "a9",
          type: "comment_added",
          description: "Comment added by user2",
          author: "user2",
          timestamp: "2025-03-16T15:30:00Z",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
        {
          id: "a10",
          type: "updated",
          description: "Updated description with Node.js details",
          author: "user4",
          timestamp: "2025-03-17T09:40:00Z",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
      ],
    },
    {
      id: "5",
      title: "Optimize database queries",
      description: "Improve performance of user data retrieval.",
      project: "Backend",
      assignee: ["user3"],
      startDate: "2025-03-16",
      dueDate: "2025-03-22",
      priority: "critical",
      status: "inprogress",
      tags: ["database", "performance"],
      comments: [
        {
          id: "c4",
          author: "user3",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
          content: "Identified bottleneck in the join operation.",
          createdAt: "2025-03-17T11:00:00Z",
        },
      ],
      activityLog: [
        {
          id: "a11",
          type: "created",
          description: "Task created",
          author: "user3",
          timestamp: "2025-03-15T10:00:00Z",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
      ],
    },
  ],
  completed: [
    {
      id: "3",
      title: "Set up CI/CD pipeline",
      description: "Configure GitHub Actions for automated testing and deployment.",
      project: "DevOps",
      assignee: ["user1"],
      startDate: "2025-03-10",
      dueDate: "2025-03-15",
      priority: "medium",
      status: "completed",
      tags: ["devops", "ci/cd"],
      comments: [
        {
          id: "c5",
          author: "user1",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
          content: "Pipeline is working, tests are passing!",
          createdAt: "2025-03-14T14:00:00Z",
        },
      ],
      activityLog: [
        {
          id: "a14",
          type: "created",
          description: "Task created",
          author: "user1",
          timestamp: "2025-03-09T08:00:00Z",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
        {
          id: "a15",
          type: "status_change",
          description: "Moved to In Progress",
          author: "user1",
          timestamp: "2025-03-10T09:00:00Z",
          details: { from: "todo", to: "inprogress" },
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
        {
          id: "a16",
          type: "status_change",
          description: "Moved to Completed",
          author: "user1",
          timestamp: "2025-03-15T10:00:00Z",
          details: { from: "inprogress", to: "completed" },
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
        {
          id: "a17",
          type: "comment_added",
          description: "Comment added by user1",
          author: "user1",
          timestamp: "2025-03-14T14:00:00Z",
          avatarUrl: "https://avatars.githubusercontent.com/u/110723408?v=4",
        },
      ],
    },
  ],
};

export const fetchTasks = async (): Promise<KanbanData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTasks), 1000);
  });
};

export const fetchFilteredTasks = async (filters: Filters): Promise<KanbanData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
        let filteredTasks: KanbanData = { todo: [], inprogress: [], completed: [] };
        const keywordLower = filters.keyword.toLowerCase().trim();

        Object.entries(mockTasks).forEach(([status, tasks]) => {
            filteredTasks[status as TaskStatus] = tasks.filter((task) => {
            const matchesKeyword = filters.keyword
                ? (
                    task.title.toLowerCase().includes(keywordLower) ||
                    task.description.toLowerCase().includes(keywordLower) ||
                    task.tags.some((tag) => tag.toLowerCase().includes(keywordLower)) ||
                    task.assignee.some((assignee) =>
                    assignee.toLowerCase().includes(keywordLower)
                    )
                )
                : true;

            const matchesPriority = filters.priority
                ? task.priority === filters.priority
                : true;

            return matchesKeyword && matchesPriority;
            });
        });

        resolve(filteredTasks);
        }, 800);
    });
};