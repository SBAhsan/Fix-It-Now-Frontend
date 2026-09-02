const STEPS = [
  { n: "01", title: "Describe the job", desc: "Pick a category, add details and photos. Takes under a minute." },
  { n: "02", title: "Get matched", desc: "We surface nearby technicians with the right skill and rating." },
  { n: "03", title: "Track and pay", desc: "Watch the ticket move from booked to done, then pay securely." },
];

const HowItWorks = () => {
    return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-10 text-3xl font-bold">Three steps, one ticket.</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n} className="rounded-xl border p-6">
            <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 font-mono text-xs text-cyan-700">
              {s.n}
            </span>
            <h3 className="mb-2 font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;