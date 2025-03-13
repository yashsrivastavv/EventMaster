import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type EventFilter } from "@shared/schema";

interface EventFilterProps {
  value: EventFilter;
  onChange: (filter: EventFilter) => void;
}

export function EventFilter({ value, onChange }: EventFilterProps) {
  return (
    <div className="flex gap-4">
      <Select
        value={value.duration}
        onValueChange={(duration: EventFilter["duration"]) =>
          onChange({ ...value, duration: duration as EventFilter["duration"] })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="short">Short ({`≤`} 2h)</SelectItem>
          <SelectItem value="medium">Medium (2-6h)</SelectItem>
          <SelectItem value="long">Long ({`>`} 6h)</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={value.status}
        onValueChange={(status: EventFilter["status"]) =>
          onChange({ ...value, status: status as EventFilter["status"] })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="ongoing">Ongoing</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}