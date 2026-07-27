import { SiteHeader } from "@/components/site-header";
import { StudyPage } from "@/components/study-page";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="page-main">
        <StudyPage />
      </main>
    </>
  );
}
