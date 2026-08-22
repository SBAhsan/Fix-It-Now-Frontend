import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6">
      <Calendar></Calendar>
      <Button>Save Date</Button>
      <h1 className="text-4xl font-bold italic">This is Home page</h1>
    </div>
  );
}
