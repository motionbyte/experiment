import React, { Suspense, lazy } from "react";
import styles from "./HomePage.module.css";
import { LogoIntro } from "../../features/intro/LogoIntro/LogoIntro";

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

function SectionFallback() {
  return <div className={styles.sectionFallback} aria-hidden />;
}

export const HomePage: React.FC = () => {
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
    </div>
  );
};
