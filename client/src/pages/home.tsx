import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const venues = [
  {
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    title: "Elegant Hall"
  },
  {
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
    title: "Modern Space"
  },
  {
    url: "https://images.unsplash.com/photo-1464047736614-af63643285bf",
    title: "Garden Venue"
  },
  {
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176",
    title: "Conference Center"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Create Memorable Events
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Plan and manage your events with ease using our modern event management system
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/create-event">
              <Button size="lg">Create Event</Button>
            </Link>
            <Link href="/events">
              <Button size="lg" variant="outline">View Events</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {venues.map((venue) => (
            <div key={venue.title} className="relative group overflow-hidden rounded-lg">
              <img
                src={venue.url}
                alt={venue.title}
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h3 className="text-white font-semibold text-xl">{venue.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
