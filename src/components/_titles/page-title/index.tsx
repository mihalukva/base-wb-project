import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

export const PageTitle = ({ ...rest }: TypographyProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Typography color="text.primary" gutterBottom variant="h4" {...rest} />
);
