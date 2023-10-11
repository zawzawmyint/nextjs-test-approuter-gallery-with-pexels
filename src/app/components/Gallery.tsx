import fetchImages from "@/lib/fetchImages";
import type { ImagesResults } from "@/models/Images";
import addBlurredDataUrls from "@/lib/getBase64";

import React from "react";
import ImageContainer from "./ImgContainer";
import getPrevNextPages from "@/lib/getPrevNextPages";
import Footer from "./Footer";

interface Props {
  topic?: string | undefined;
  page?: string | undefined;
}

export default async function Gallery({ topic = "curated", page }: Props) {
  let url;
  if (topic === "curated" && page) {
    // browsing beyond home
    url = `https://api.pexels.com/v1/curated?page=${page}`;
  } else if (topic === "curated") {
    url = `https://api.pexels.com/v1/curated`;
  } else if (!page) {
    url = `https://api.pexels.com/v1/search?query=${topic}`;
  } else {
    // search result beyond 1st page
    url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}`;
  }

  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images || images.per_page === 0)
    return <h2 className="m-4 text-2xl font-bold">No images found</h2>;

  const photosWithBlur = await addBlurredDataUrls(images);

  // calculate pagination
  const { prevPage, nextPage } = getPrevNextPages(images);

  const footerProps = { topic, page, nextPage, prevPage };

  return (
    <>
      <section className="px-1 my-3 grid  grid-cols-gallery auto-rows-[10px]">
        {photosWithBlur.map((photo) => (
          <ImageContainer key={photo.id} photo={photo} />
        ))}
      </section>
      {/* Add footer  */}
      <Footer {...footerProps} />
    </>
  );
}
