"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type HoverIntentOptions = {
  openDelayMs?: number;
  closeDelayMs?: number;
};

/**
 * Hover state with open/close grace periods, so a tooltip does not flicker when
 * the pointer crosses the trigger or travels into the popover itself.
 *
 * Returns props to spread onto the trigger element.
 */
export function useHoverIntent({ openDelayMs = 0, closeDelayMs = 0 }: HoverIntentOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // A single timer handle: opening cancels a pending close and vice versa, so
  // the two can never race each other.
  const schedule = useCallback((open: boolean, delayMs: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsOpen(open), delayMs);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onMouseEnter = useCallback(() => schedule(true, openDelayMs), [schedule, openDelayMs]);
  const onMouseLeave = useCallback(() => schedule(false, closeDelayMs), [schedule, closeDelayMs]);

  return { isOpen, hoverProps: { onMouseEnter, onMouseLeave } };
}
