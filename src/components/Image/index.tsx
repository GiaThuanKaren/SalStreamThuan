import React, { MutableRefObject, useEffect, useRef } from "react";
interface Prop {
  src: string;
  alt: string;
  className: string;
}
const Image = ({ src, alt, className }: Prop) => {
  const imageRef: any = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image: any = imageRef.current;
            image.src = src;
            image.alt = alt;
            image.className = className;
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <img ref={imageRef} />;
};

export default Image;
