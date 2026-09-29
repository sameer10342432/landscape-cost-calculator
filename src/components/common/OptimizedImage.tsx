import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  sizes?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 1536,
  height = 1024,
  priority = false,
  className = '',
  loading,
  decoding = 'async',
  sizes,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading || (priority ? 'eager' : 'lazy')}
      decoding={decoding}
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={sizes}
      className={className}
    />
  );
};
