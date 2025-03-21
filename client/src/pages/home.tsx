import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChatBot } from "@/components/chat-bot";


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-blue-500 mb-4">

            Planit
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Your all-in-one solution for seamless event planning and management
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/create-event">
              <Button size="lg" className="min-w-[140px] bg-blue-500">
                Create Event
              </Button>
            </Link>
            <Link href="/events">
              <Button size="lg" variant="outline" className="min-w-[140px]">
                View Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8  pt-4">
        <ChatBot />
      </div>

      <ChatBot className="fixed bottom-4 right-4 shadow-lg rounded-full" />
    </div>
    
  );
}