"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TechnicianProfileForm from "./TechnicianProfileForm";

type Profile = {
  bio: string | null;
  skills: string[];
  city: string;
  experienceYears: number;
  avgRating: string;
  totalReviews: number;
};

export default function TechnicianProfileView({
  profile,
}: {
  profile: Profile;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <TechnicianProfileForm
        initialValues={profile}
        onDone={() => setEditing(false)}
      />
    );
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle>Your profile</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
          <Pencil data-icon="inline-start" />
          Edit
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{profile.bio}</p>
        <div className="flex flex-wrap gap-1.5">
          {profile.skills.map((s) => (
            <Badge key={s} variant="outline">
              {s}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">City</p>
            <p className="font-medium">{profile.city}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Experience</p>
            <p className="font-medium">{profile.experienceYears} years</p>
          </div>
          <div>
            <p className="text-muted-foreground">Rating</p>
            <p className="font-medium">
              {profile.avgRating} ({profile.totalReviews})
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
