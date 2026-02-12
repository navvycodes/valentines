import { keyframes } from "@emotion/react";

export const spinZoom = keyframes({
  // `translateZ(0)` stabilizes Safari/iOS transform compositing.
  "0%": { transform: "translateZ(0) scale(1) rotate(0deg)" },
  "18%": { transform: "translateZ(0) scale(1.03) rotate(18deg)" },
  "55%": { transform: "translateZ(0) scale(1.06) rotate(340deg)" },
  "100%": { transform: "translateZ(0) scale(1) rotate(360deg)" },
});

export const popIn = keyframes({
  "0%": { transform: "translateY(10px) scale(0.92)", opacity: 0 },
  "60%": { transform: "translateY(0px) scale(1.03)", opacity: 1 },
  "100%": { transform: "translateY(0px) scale(1)", opacity: 1 },
});
