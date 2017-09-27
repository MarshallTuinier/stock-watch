import React from 'react';
import { GradientPurpleOrange } from '@vx/gradient';

const Background = ({ width, height }) => {
  return (
    <svg width={width} height={height}>
      <GradientPurpleOrange id="fill" vertical={false} />

      <rect width={width} height={height} fill="url(#fill)" />
    </svg>
  );
};

export default Background;
