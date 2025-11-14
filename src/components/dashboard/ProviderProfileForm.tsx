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
  const [languages, setLanguages] = useState(profile.languages.join(", "));
  const [travelRadius, setTravelRadius] = useState(profile.travelRadiusKm);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaType, setNewMediaType] = useState<ProviderProfile["media"][number]["type"]>(
    profile.media[0]?.type ?? "image"
  );

  useEffect(() => {
    setBio(profile.bio);
    setHourlyRate(profile.hourlyRate);
    setMinHours(profile.minHours);
    setTags(profile.tags.join(", "));
    setIncludesExpenses(profile.includesExpenses);
    setExpenseNotes(profile.expenseNotes ?? "");
    setLanguages(profile.languages.join(", "));
    setTravelRadius(profile.travelRadiusKm);
    setNewMediaType(profile.media[0]?.type ?? "image");
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
            <div>
              <Label>Languages</Label>
              <Input
                value={languages}
                onChange={event => setLanguages(event.target.value)}
                placeholder="English, Mandarin"
              />
            </div>
            <div>
              <Label>Travel radius (km)</Label>
              <Input
                type="number"
                min={5}
                value={travelRadius}
                onChange={event => setTravelRadius(Number(event.target.value))}
              />
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

        <div className="space-y-2">
          <Label>Service media</Label>
          <div className="flex flex-col md:flex-row gap-2">
            <select
              value={newMediaType}
              onChange={event => setNewMediaType(event.target.value as ProviderProfile["media"][number]["type"])}
              className="rounded-md border px-3 py-2"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
            </select>
            <Input
              value={newMediaUrl}
              onChange={event => setNewMediaUrl(event.target.value)}
              placeholder="https://example.com/portfolio"
            />
            <Button
              onClick={() => {
                if (!newMediaUrl.trim()) return;
                onSave({
                  ...profile,
                  media: [
                    ...profile.media,
                    {
                      type: newMediaType,
                      url: newMediaUrl,
                      description: `${newMediaType} proof uploaded on ${new Date().toLocaleDateString()}`
                    }
                  ]
                });
                setNewMediaUrl("");
              }}
            >
              Add media
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.media.map(item => (
              <Badge key={item.url} variant="outline" className="flex items-center gap-2">
                {item.type.toUpperCase()} proof
                <button className="text-xs text-rose-500" onClick={() =>
                    onSave({
                      ...profile,
                      media: profile.media.filter(mediaItem => mediaItem.url !== item.url)
                    })
                  }>
                  Remove
                </button>
              </Badge>
            ))}
            {profile.media.length === 0 && (
              <p className="text-sm text-muted-foreground">Upload photos, videos, or documents to prove your expertise.</p>
            )}
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
                languages: languages.split(",").map(language => language.trim()).filter(Boolean),
                includesExpenses,
                expenseNotes,
                travelRadiusKm: travelRadius
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

