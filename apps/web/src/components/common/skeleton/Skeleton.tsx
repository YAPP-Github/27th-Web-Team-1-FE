import type { CSSProperties } from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  borderRadius?: CSSProperties['borderRadius'];
  className?: string;
}

export default function Skeleton({
  width,
  height,
  borderRadius,
  className,
}: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton}${className ? ` ${className}` : ''}`}
      style={{ width, height, borderRadius }}
    />
  );
}
