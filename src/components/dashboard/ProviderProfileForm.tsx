import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { ProviderProfile } from "@/types/guidew";

interface ProviderProfileFormProps {
  profile: ProviderProfile;
  onSave: (profile: ProviderProfile) => void;
}

const ProviderProfileForm = ({ profile, onSave }: ProviderProfileFormProps) => {
  const [bio, setBio] = useState(profile.bio);
  const [hourlyRate, setHourlyRate] = useState(profile.hourlyRate);
  const [minHours, setMinHours] = useState(profile.minHours);
  const [tags, setTags] = useState(profile.tags.join(", "));
  const [includesExpenses, setIncludesExpenses] = useState(profile.includesExpenses);
  const [expenseNotes, setExpenseNotes] = useState(profile.expenseNotes ?? "");
  const [newCertification, setNewCertification] = useState("");

  useEffect(() => {
    setBio(profile.bio);
    setHourlyRate(profile.hourlyRate);
    setMinHours(profile.minHours);
    setTags(profile.tags.join(", "));
    setIncludesExpenses(profile.includesExpenses);
    setExpenseNotes(profile.expenseNotes ?? "");
  }, [profile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Provider profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Bio</Label>
            <Textarea value={bio} onChange={event => setBio(event.target.value)} rows={4} />
          </div>
          <div className="space-y-3">
            <div>
              <Label>Hourly rate</Label>
              <Input type="number" value={hourlyRate} onChange={event => setHourlyRate(Number(event.target.value))} />
            </div>
            <div>
              <Label>Minimum hours</Label>
              <Input type="number" value={minHours} onChange={event => setMinHours(Number(event.target.value))} />
            </div>
            <div>
              <Label>Tags</Label>
              <Input value={tags} onChange={event => setTags(event.target.value)} placeholder="city-guide, translation" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Expenses included in rate?</Label>
          <div className="flex gap-3">
            <Button variant={includesExpenses ? "default" : "outline"} onClick={() => setIncludesExpenses(true)}>
              Includes expenses
            </Button>
            <Button variant={!includesExpenses ? "default" : "outline"} onClick={() => setIncludesExpenses(false)}>
              Expenses billed separately
            </Button>
          </div>
          {!includesExpenses && (
            <Textarea
              value={expenseNotes}
              onChange={event => setExpenseNotes(event.target.value)}
              placeholder="Tickets, petrol, tolls billed at cost"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label>Certificates & proof</Label>
          <div className="flex gap-2">
            <Input value={newCertification} onChange={event => setNewCertification(event.target.value)} placeholder="URL to certification" />
            <Button
              onClick={() => {
                if (!newCertification.trim()) return;
                const updated = {
                  ...profile,
                  certifications: [
                    ...profile.certifications,
                    {
                      id: `cert-${profile.certifications.length + 1}`,
                      title: newCertification,
                      issuedBy: "Uploaded",
                      issueDate: new Date().toISOString().split("T")[0],
                      credentialUrl: newCertification
                    }
                  ]
                };
                onSave(updated);
                setNewCertification("");
              }}
            >
              Upload proof
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.certifications.map(cert => (
              <Badge key={cert.id} variant="secondary">
                {cert.title}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() =>
              onSave({
                ...profile,
                bio,
                hourlyRate,
                minHours,
                tags: tags.split(",").map(tag => tag.trim()),
                includesExpenses,
                expenseNotes
              })
            }
          >
            Save profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderProfileForm;

