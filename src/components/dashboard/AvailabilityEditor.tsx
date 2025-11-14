import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { AvailabilitySlot } from "@/types/guidew";
import { createId } from "@/utils/id";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface AvailabilityEditorProps {
  availability: AvailabilitySlot[];
  onUpdate: (slots: AvailabilitySlot[]) => void;
}

const AvailabilityEditor = ({ availability, onUpdate }: AvailabilityEditorProps) => {
  const [day, setDay] = useState(1);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");

  const addSlot = () => {
    const slot: AvailabilitySlot = { id: createId("slot"), day, start, end };
    onUpdate([...availability, slot]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <Label>Day</Label>
            <select value={day} onChange={event => setDay(Number(event.target.value))} className="w-full rounded-md border px-3 py-2">
              {days.map((label, index) => (
                <option key={label} value={index}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Start</Label>
            <Input value={start} onChange={event => setStart(event.target.value)} type="time" />
          </div>
          <div>
            <Label>End</Label>
            <Input value={end} onChange={event => setEnd(event.target.value)} type="time" />
          </div>
          <div className="flex items-end">
            <Button className="w-full" onClick={addSlot}>
              Add slot
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {availability.map(slot => (
            <Badge key={slot.id} variant="outline" className="flex items-center gap-2">
              {days[slot.day]} {slot.start} - {slot.end}
              <button className="text-xs text-rose-500" onClick={() => onUpdate(availability.filter(item => item.id !== slot.id))}>
                Remove
              </button>
            </Badge>
          ))}
          {availability.length === 0 && <p className="text-sm text-muted-foreground">No availability configured yet.</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityEditor;

