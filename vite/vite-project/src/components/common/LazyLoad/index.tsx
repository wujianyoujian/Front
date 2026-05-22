import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface LazyLoadProps {
  classname?: string;
  style?: CSSProperties;
  placeholder?: ReactNode;
  offset?: number | string;
  width?: number | string;
  height?: string | number;
  onContentVisible?: () => void;
  children: ReactNode;
}

const LazyLoad = (props: LazyLoadProps) => {
  const { classname, style, placeholder, offset, width, height, onContentVisible } = props;
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementObserver = useRef<IntersectionObserver>(null);

  function lazyLoadHandler(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    const { isIntersecting } = entry;

    if (isIntersecting) {
      setVisible(true);
      onContentVisible?.();

      const node = containerRef.current;
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    }
  }

  useEffect(() => {
    const options = {
      rootMargin: typeof offset === "number" ? `${offset}px` : offset || "0px",
      threshold: 0,
    };

    elementObserver.current = new IntersectionObserver(lazyLoadHandler, options);
    const node = containerRef.current;
    if (node instanceof HTMLElement) {
      elementObserver.current.observe(node);
    }
    return () => {
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={classname} style={style}>
      {visible ? props.children : placeholder}
    </div>
  );
};

export default LazyLoad;
