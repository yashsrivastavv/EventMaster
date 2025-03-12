import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertEventSchema, type InsertEvent } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreateEvent() {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const form = useForm<InsertEvent>({
    resolver: zodResolver(insertEventSchema),
    defaultValues: {
      agenda: [""],
      guests: []
    }
  });

  const createEventMutation = useMutation({
    mutationFn: async (data: InsertEvent) => {
      const res = await apiRequest("POST", "/api/events", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Event created successfully",
      });
      navigate("/events");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Event</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(data => createEventMutation.mutate(data))} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter event name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "MMM dd, yyyy")
                          ) : (
                            "Pick a date"
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value))}
                      min={30}
                      max={1440}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter location" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Enter event description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guests</FormLabel>
                <div className="space-y-2">
                  {field.value.map((email, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          const newGuests = [...field.value];
                          newGuests[index] = e.target.value;
                          field.onChange(newGuests);
                        }}
                        placeholder="guest@email.com"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newGuests = field.value.filter((_, i) => i !== index);
                          field.onChange(newGuests);
                        }}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => field.onChange([...field.value, ""])}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Guest
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guestCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest Capacity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value))}
                    min={1}
                    max={1000}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agenda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agenda Items</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter agenda items (one per line)"
                    onChange={e => field.onChange(e.target.value.split('\n'))}
                    value={field.value.join('\n')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={createEventMutation.isPending}
          >
            {createEventMutation.isPending ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </Form>
    </div>
  );
}