import DemoVideo from "@/components/DemoVideo";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Skeleton from "@/components/suspense/Skeleton";
import Testimonials from "@/components/Testimonials";
import LandingFetcher from "@/fetchers/LandingFetcher";
import { Suspense } from "react";

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={<Skeleton className="h-24" />}>
        <LandingFetcher />
      </Suspense>
      <DemoVideo />
      <Testimonials />
    </Layout>
  );
};

export default LandingPage;
