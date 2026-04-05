import React, { Suspense, lazy } from "react";
import styles from "./HomePage.module.css";
import { LogoIntro } from "../../features/intro/LogoIntro/LogoIntro";
import { setHomeSeo, setSectionSeo } from "../../seo/homeAndSectionSeo";

const DiscographySection = lazy(() =>
  import("../../features/discography/DiscographySection/DiscographySection").then((m) => ({
    default: m.DiscographySection,
  }))
);
const BiographySection = lazy(() =>
  import("../../features/biography/BiographySection/BiographySection").then((m) => ({
    default: m.BiographySection,
  }))
);
const PlaylistSlider = lazy(() =>
  import("../../features/playlist-slider/PlaylistSlider/PlaylistSlider").then((m) => ({
    default: m.PlaylistSlider,
  }))
);
const BandMembersSection = lazy(() =>
  import("../../features/band-members/BandMembersSection/BandMembersSection").then((m) => ({
    default: m.BandMembersSection,
  }))
);
const ImageCarouselSection = lazy(() =>
  import("../../features/image-carousel/ImageCarouselSection/ImageCarouselSection").then((m) => ({
    default: m.ImageCarouselSection,
  }))
);
const VideosSection = lazy(() =>
  import("../../features/videos/VideosSection/VideosSection").then((m) => ({
    default: m.VideosSection,
  }))
);
const ConnectWithUsSection = lazy(() =>
  import("../../features/connect-with-us/ConnectWithUsSection/ConnectWithUsSection").then((m) => ({
    default: m.ConnectWithUsSection,
  }))
);
const SisterVenturesSection = lazy(() =>
  import("../../features/sister-ventures/SisterVenturesSection").then((m) => ({
    default: m.SisterVenturesSection,
  }))
);

function SectionFallback() {
  return <div className={styles.sectionFallback} aria-hidden />;
}

export type HomePageProps = {
  /** When set (e.g. /discography route), scroll to this section id after lazy chunks load */
  scrollTarget?: string;
};

export const HomePage: React.FC<HomePageProps> = ({ scrollTarget }) => {
  React.useEffect(() => {
    if (scrollTarget) setSectionSeo(scrollTarget);
    else setHomeSeo();
  }, [scrollTarget]);

  React.useEffect(() => {
    if (!scrollTarget) return;
    let tries = 0;
    const maxTries = 120;
    const id = window.setInterval(() => {
      const el = document.getElementById(scrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.clearInterval(id);
        return;
      }
      tries += 1;
      if (tries >= maxTries) window.clearInterval(id);
    }, 100);
    return () => window.clearInterval(id);
  }, [scrollTarget]);

  return (
    <div className={styles.page}>
      <LogoIntro />
      <Suspense fallback={<SectionFallback />}>
        <DiscographySection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BiographySection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PlaylistSlider />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BandMembersSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ImageCarouselSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <VideosSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ConnectWithUsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SisterVenturesSection />
      </Suspense>
    </div>
  );
};
