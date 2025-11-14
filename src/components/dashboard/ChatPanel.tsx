import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ChatMessage, OrderRecord } from "@/types/guidew";

interface ChatPanelProps {
  order?: OrderRecord;
  chats: ChatMessage[];
  onSend: (message: string) => void;
  currentUserId: string;
}

const ChatPanel = ({ order, chats, onSend, currentUserId }: ChatPanelProps) => {
  const [draft, setDraft] = useState("");

  const relevantMessages = order ? chats.filter(chat => chat.orderId === order.id) : [];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>In-trip messaging</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[26rem]">
        {!order && <p className="text-sm text-muted-foreground">Select an active order to start chatting.</p>}
        {order && (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto pr-2">
              {relevantMessages.map(message => (
                <div key={message.id} className="rounded-lg border p-2 text-sm">
                  <p className="font-medium">{message.senderId === currentUserId ? "You" : "Partner"}</p>
                  <p>{message.content}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(message.sentAt), "PPp")}</p>
                </div>
              ))}
              {relevantMessages.length === 0 && <p className="text-sm text-muted-foreground">No messages yet. Break the ice with your expert.</p>}
            </div>
            <div className="mt-4 flex gap-2">
              <Input value={draft} onChange={event => setDraft(event.target.value)} placeholder="Send a quick update" />
              <Button
                onClick={() => {
                  if (!draft.trim()) return;
                  onSend(draft.trim());
                  setDraft("");
                }}
              >
                Send
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatPanel;

