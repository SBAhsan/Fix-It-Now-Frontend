"use client";

import { useTransition, type FormEvent } from "react";
import { Save, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTechnicianProfile } from "@/service/technician/createProfile";
import { updateTechnicianProfile } from "@/service/technician/updateProfile";
import { toast } from "@/components/ui/toast";

type ProfileValues = {
  bio: string | null;
  skills: string[];
  city: string;
  experienceYears: number;
};

export default function TechnicianProfileForm({
  initialValues,
  onDone,
}: {
  initialValues?: ProfileValues;
  onDone?: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialValues;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      bio: formData.get("bio") as string,
      skills: (formData.get("skills") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      city: formData.get("city") as string,
      experienceYears: Number(formData.get("experienceYears")),
    };

    startTransition(async () => {
      const res = isEditing
        ? await updateTechnicianProfile(payload)
        : await createTechnicianProfile(payload);

      if (!res.success) {
        toast.add({
          type: "error",
          title: res.message ?? "Failed to save profile",
        });
      } else {
        toast.add({
          type: "success",
          title: "Profile created successfully!",
        });
        onDone?.();
      }
    });
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div
            className="rounded-xl bg-primary/10 p-2.5 text-primary"
            aria-hidden="true"
          >
            <Wrench />
          </div>
          <div>
            <CardTitle>
              {isEditing ? "Edit profile" : "Technician profile"}
            </CardTitle>
            <CardDescription>
              Help customers understand your experience and service area.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Textarea
            name="bio"
            placeholder="Tell customers about your experience..."
            rows={5}
            defaultValue={initialValues?.bio ?? ""}
            required
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              name="skills"
              placeholder="Plumbing, HVAC, Electrical"
              defaultValue={initialValues?.skills.join(", ") ?? ""}
              required
            />
            <Input
              name="city"
              placeholder="Chattogram"
              defaultValue={initialValues?.city ?? ""}
              required
            />
          </div>
          <Input
            name="experienceYears"
            type="number"
            min="0"
            max="80"
            placeholder="Years of experience"
            defaultValue={initialValues?.experienceYears ?? ""}
            required
          />
          <div className="flex justify-end gap-2">
            {isEditing && (
              <Button type="button" variant="outline" onClick={onDone}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              <Save data-icon="inline-start" />
              {isPending
                ? "Saving..."
                : isEditing
                  ? "Save changes"
                  : "Create profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
