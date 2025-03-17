"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Comment, Task } from "../../types/KanbanTypes";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { SendHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type CommentsSectionProps = {
  comments: Comment[];
  taskId: string;
  updateTask: (taskId: string, updatedData: Partial<Task>) => void;
};

export default function CommentsSection({
  comments,
  taskId,
  updateTask,
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      author: "Current User",
      content: newComment,
      createdAt: new Date().toISOString(),
      avatarUrl: "/api/placeholder/32/32",
    };
    updateTask(taskId, { comments: [...comments, comment] });
    setNewComment("");
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      
      {comments.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No comments yet</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.avatarUrl || "/api/placeholder/32/32"} alt={comment.author} />
                  <AvatarFallback>{getInitials(comment.author)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(comment.createdAt))} ago
                      </span>
                    </div>
                  </div>
                  
                  <p className="mt-1 text-sm">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-start gap-3 mt-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/api/placeholder/32/32" alt="Current User" />
          <AvatarFallback>CU</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="resize-none min-h-24"
          />
          
          <div className="flex justify-end">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 gap-2" 
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              <SendHorizontal size={16} />
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}