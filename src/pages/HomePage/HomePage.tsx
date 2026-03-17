import React from "react";
import styles from "./HomePage.module.css";
import { LogoIntro } from "../../features/intro/LogoIntro/LogoIntro";
import { DiscographySection } from "../../features/discography/DiscographySection/DiscographySection";
import { BiographySection } from "../../features/biography/BiographySection/BiographySection";
import { PlaylistSlider } from "../../features/playlist-slider/PlaylistSlider/PlaylistSlider";
import { BandMembersSection } from "../../features/band-members/BandMembersSection/BandMembersSection";
import { ImageCarouselSection } from "../../features/image-carousel/ImageCarouselSection/ImageCarouselSection";
import { VideosSection } from "../../features/videos/VideosSection/VideosSection";
import { ConnectWithUsSection } from "../../features/connect-with-us/ConnectWithUsSection/ConnectWithUsSection";

export const HomePage: React.FC = () => {
  return (
    <div className={styles.page}>
      <LogoIntro />
      <DiscographySection />
      <BiographySection />
      <PlaylistSlider />
      <BandMembersSection />
      <ImageCarouselSection />
      <VideosSection />
      <ConnectWithUsSection />
    </div>
  );
};

