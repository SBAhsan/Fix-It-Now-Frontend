"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { loginActions } from "../_actions/authActions";
import { toast } from "@/components/ui/toast";


const LoginForm = () => {

  const [state, action, pending] = useActionState(loginActions, {
    success: false,
    message: ""
  })

  useEffect(() => {
    if(state.message && !state.success){
      toast.add({
        type: "error",
        title: state.message,
      })
    }
  }, [state])
  
  return (
    <Card className="p-5">
      <form action={action} className="space-y-5">
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
        
        <div>
          <Button type="submit" className={"w-2/4"}>
          {
            pending ? "Signing in..." : "Sign in"
          }
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
