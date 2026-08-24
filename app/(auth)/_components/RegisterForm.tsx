"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { registerActions } from "../_actions/authActions";
import { toast } from "@/components/ui/toast";


const ROLES = [
    { value: "TECHNICIAN", label: "Provide Services" },
    { value: "CUSTOMER", label: "Book Services" },
  ];

const RegisterForm = () => {

  const [state, action, pending] = useActionState(registerActions, {
    success: false,
    message: ""
  })

  useEffect(() => {
    if(state.message && !state.success){
      toast.add({
        title: state.message
      })
    }
  })
  
  return (
    <Card className="p-5">
      <form action={action} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" placeholder="Alison Becker" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="alison@gmail.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="text" placeholder="+880..." />
        </div>
        <fieldset>
          <legend className="text-start">I want to</legend>
          <div className="grid grid-cols-2 gap-2">
            {ROLES.map((role) => (
              <label key={role.value} className="press cursor-pointer border rounded-lg transition-colors p-3 duration-150 hover:bg-muted has-checked:bg-cyan-400">
                <input id="role" type="radio" name="role" value={role.value} className="sr-only"/>
                {role.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <Button type="submit" className={"w-2/4"}>
          {
            pending ? "Signing up..." : "Sign up"
          }
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RegisterForm;
