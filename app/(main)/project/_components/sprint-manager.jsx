"use client";

import { updateSprintStatus } from "@/actions/sprints";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { format, formatDistanceToNow, isAfter, isBefore } from "date-fns";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

const SprintManager = ({ sprint, setSprint, sprints, projectId }) => {
  const [status, setStatus] = useState(sprint.status);

  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  const now = new Date();

  const canStart =
    isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";

  const canEnd = status === "ACTIVE";

  const handleSprintChange = (value) => {
    const selectedSprint = sprints.find((s) => s.id === value);
    setSprint(selectedSprint);
    setStatus(selectedSprint.status);
  };

  const getStatusText = () => {
    if (status === "COMPLETED") {
      return "Sprint Ended";
    }

    if (status === "ACTIVE" && isAfter(now, endDate)) {
      return `Overdue By ${formatDistanceToNow(endDate)}`;
    }

    if (status === "PLANNED" && isBefore(now, startDate)) {
      return `Starts in ${formatDistanceToNow(startDate)}`;
    }

    return null;
  };

  const { fn: updateStatus, loading, error, data: updatedStatus } =
    useFetch(updateSprintStatus);

  const handleStatusChange = (value) => {
    updateStatus(sprint.id, value);
  };

  useEffect(() => {
    if (updatedStatus && updatedStatus.success) {
      setStatus(updatedStatus.sprint.status);
      setSprint({
        ...sprint,
        status: updatedStatus.sprint.status,
      });
    }
  }, [updatedStatus, loading]);

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <Select value={sprint.id} onValueChange={handleSprintChange}>
          <SelectTrigger className="self-start">
            <SelectValue placeholder="Select Sprint" />
          </SelectTrigger>
          <SelectContent>
            {sprints.map((sprint) => (
              <SelectItem value={sprint.id} key={sprint.id}>
                {sprint.name} ({format(sprint.startDate, "MMM d, yyyy")}) to{" "}
                {format(sprint.endDate, "MMM d, yyyy")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {canStart && (
          <Button
            disabled={loading}
            onClick={() => handleStatusChange("ACTIVE")}
            className="bg-green-900 text-white"
          >
            Start Sprint
          </Button>
        )}

        {canEnd && (
          <Button
            disabled={loading}
            variant="destructive"
            onClick={() => handleStatusChange("COMPLETED")}
          >
            End Sprint
          </Button>
        )}
      </div>

      {loading && (
        <Loader2Icon className="w-10 h-10 animate-spin mt-10 text-center gradient-title"></Loader2Icon>
      )}
      {getStatusText() && (
        <Badge className="mt-3 ml-1 self-start bg-gradient-to-br text-black from-blue-600 via-blue-100 to-blue-700">
          {getStatusText()}
        </Badge>
      )}
    </>
  );
};

export default SprintManager;
