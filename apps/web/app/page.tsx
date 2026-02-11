import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import Cta from "@/components/Cta";
import {
  getAllCompanions,
  getRecentSession,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "./lib/utils";
import { Suspense } from "react";

// --- Sub-Component 1: Fetches Popular Companions ---
async function PopularCompanionsSection() {
  // This fetch likely caused the error if it was checking auth/headers
  const companions = await getAllCompanions({ limit: 3 });

  return (
    <>
      {companions.map((companion) => (
        <CompanionCard
          key={companion.id}
          {...companion}
          color={getSubjectColor(companion.subject)}
        />
      ))}
    </>
  );
}

// --- Sub-Component 2: Fetches Recent Sessions ---
async function RecentSessionsSection() {
  // This fetch definitely uses headers/cookies to identify the user
  const recentSessionsCompanions = await getRecentSession(10);

  return (
    <CompanionList
      title="Recently completed sessions"
      companions={recentSessionsCompanions}
      classNames="w-2/3 max-lg:w-full"
    />
  );
}

// --- Main Page (Now Static) ---
const Page =  () => {

  return (
    <main>
      <h1>Popular Companions</h1>
      {/* 1. Wrap the first dynamic section in Suspense */}
      <section className="home-section">
        <Suspense fallback={<div>Loading popular companions...</div>}>
          <PopularCompanionsSection />
        </Suspense>
      </section>

      {/* 2. Wrap the second dynamic section in Suspense */}
      <section className="home-section">
        <Suspense fallback={<div>Loading recent sessions...</div>}>
          <RecentSessionsSection />
        </Suspense>
        <Cta />
      </section>
    </main>
  );
};

export default Page;
