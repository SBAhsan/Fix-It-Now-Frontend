import { api } from "@/lib/api";
import Navbar from "@/components/home/navbar";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import ForTechnicians from "@/components/home/for-technicians";
import Footer from "@/components/home/footer";
import { Suspense } from "react";
import { getCategories } from "@/service/admin/getCategories";



export default async function HomePage() {
  const categories = await getCategories();

  return (
    <>
      <Navbar />
      <Suspense>
        <Hero categories={categories} />
      </Suspense>
      <HowItWorks />
      <ForTechnicians />
      <Footer />
    </>
  );
}