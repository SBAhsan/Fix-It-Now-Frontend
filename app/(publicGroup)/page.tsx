import { getCategories } from "@/service/admin/getCategories";
import { getMe } from "@/service/getMe";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import ForTechnicians from "@/components/home/for-technicians";
import { Suspense } from "react";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

export default async function HomePage() {
  const [categories, user] = await Promise.all([getCategories(), getMe()]);

  return (
    <div className="">
      <NavBar user={user}/>
      <Suspense>
        <Hero categories={categories} user={user} />
      </Suspense>
      <HowItWorks />
      <ForTechnicians user={user} />
      <Footer />
    </div>
  );
}