import { FolderKanban } from 'lucide-react';
import React from 'react';

const AdminServicePlaceHolder = () => {
    return (
        <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-sidebar-primary">
          Good morning, Alex
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          Keep every job moving.
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Your admin workspace for coordinating customers, technicians, and the
          services that connect them.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Active requests</p>
          <p className="mt-3 text-3xl font-semibold">24</p>
          <p className="mt-2 text-xs text-sidebar-primary">+8% this week</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Technicians online</p>
          <p className="mt-3 text-3xl font-semibold">18</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Across 4 service areas
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Open moderation</p>
          <p className="mt-3 text-3xl font-semibold">07</p>
          <p className="mt-2 text-xs text-destructive">Needs your attention</p>
        </div>
      </div>
      <div className="rounded-xl border border-dashed border-border bg-card/60 p-8 text-center">
        <FolderKanban
          className="mx-auto size-8 text-sidebar-primary"
          aria-hidden="true"
        />
        <h3 className="mt-4 font-semibold">
          Overview modules are ready to grow
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          This space will become your command center. We can add live requests,
          performance trends, and moderation queues one component at a time.
        </p>
      </div>
    </div>
    );
};

export default AdminServicePlaceHolder;