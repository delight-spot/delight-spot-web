'use client';

import reactDom from 'react-dom';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function Portal({ children }: PropsWithChildren) {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEl(document.getElementById('modal'));
  }, []);

  if (!el) return null;

  return reactDom.createPortal(children, el);
}
