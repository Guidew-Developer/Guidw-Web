import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { ProviderProfile } from "@/types/guidew";
import { useTranslation } from "react-i18next";

interface ProviderProfileFormProps {
  profile: ProviderProfile;
  onSave: (profile: ProviderProfile) => void;
}

const ProviderProfileForm = ({ profile, onSave }: ProviderProfileFormProps) => {
  const { t } = useTranslation();
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
        <CardTitle>{t("dashboard.profileForm.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>{t("dashboard.profileForm.bio")}</Label>
            <Textarea value={bio} onChange={event => setBio(event.target.value)} rows={4} />
          </div>
          <div className="space-y-3">
            <div>
              <Label>{t("dashboard.profileForm.hourlyRate")}</Label>
              <Input type="number" value={hourlyRate} onChange={event => setHourlyRate(Number(event.target.value))} />
            </div>
            <div>
              <Label>{t("dashboard.profileForm.minHours")}</Label>
              <Input type="number" value={minHours} onChange={event => setMinHours(Number(event.target.value))} />
            </div>
            <div>
              <Label>{t("dashboard.profileForm.tags")}</Label>
              <Input
                value={tags}
                onChange={event => setTags(event.target.value)}
                placeholder={t("dashboard.profileForm.tagsPlaceholder")}
              />
            </div>
            <div>
              <Label>{t("dashboard.profileForm.languages")}</Label>
              <Input
                value={languages}
                onChange={event => setLanguages(event.target.value)}
                placeholder={t("dashboard.profileForm.languagesPlaceholder")}
              />
            </div>
            <div>
              <Label>{t("dashboard.profileForm.travelRadius")}</Label>
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
          <Label>{t("dashboard.profileForm.expensesLabel")}</Label>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={includesExpenses ? "default" : "outline"}
              onClick={() => setIncludesExpenses(true)}
            >
              {t("dashboard.profileForm.expensesIncluded")}
            </Button>
            <Button
              type="button"
              variant={!includesExpenses ? "default" : "outline"}
              onClick={() => setIncludesExpenses(false)}
            >
              {t("dashboard.profileForm.expensesExcluded")}
            </Button>
          </div>
          {!includesExpenses && (
            <Textarea
              value={expenseNotes}
              onChange={event => setExpenseNotes(event.target.value)}
              placeholder={t("dashboard.profileForm.expensePlaceholder")}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label>{t("dashboard.profileForm.certifications")}</Label>
          <div className="flex gap-2">
            <Input
              value={newCertification}
              onChange={event => setNewCertification(event.target.value)}
              placeholder={t("dashboard.profileForm.certificationPlaceholder")}
            />
            <Button
              type="button"
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
              {t("dashboard.profileForm.uploadProof")}
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
          <Label>{t("dashboard.profileForm.serviceMedia")}</Label>
          <div className="flex flex-col md:flex-row gap-2">
            <select
              value={newMediaType}
              onChange={event => setNewMediaType(event.target.value as ProviderProfile["media"][number]["type"])}
              className="rounded-md border px-3 py-2"
            >
              <option value="image">{t("dashboard.profileForm.mediaTypes.image")}</option>
              <option value="video">{t("dashboard.profileForm.mediaTypes.video")}</option>
              <option value="document">{t("dashboard.profileForm.mediaTypes.document")}</option>
            </select>
            <Input
              value={newMediaUrl}
              onChange={event => setNewMediaUrl(event.target.value)}
              placeholder={t("dashboard.profileForm.mediaPlaceholder")}
            />
            <Button
              type="button"
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
              {t("dashboard.profileForm.addMedia")}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.media.map(item => (
              <Badge key={item.url} variant="outline" className="flex items-center gap-2">
                {t("dashboard.profileForm.mediaBadge", {
                  type: t(`dashboard.profileForm.mediaTypes.${item.type}`, {
                    defaultValue: item.type.toUpperCase()
                  })
                })}
                <button
                  type="button"
                  className="text-xs text-rose-500"
                  onClick={() =>
                    onSave({
                      ...profile,
                      media: profile.media.filter(mediaItem => mediaItem.url !== item.url)
                    })
                  }
                >
                  {t("dashboard.profileForm.remove")}
                </button>
              </Badge>
            ))}
            {profile.media.length === 0 && (
              <p className="text-sm text-muted-foreground">{t("dashboard.profileForm.mediaEmpty")}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
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
            {t("dashboard.profileForm.save")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderProfileForm;
