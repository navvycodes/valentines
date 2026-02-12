import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";

import { spinZoom } from "../animations/valentineAnimations";
import { ChoiceArena } from "./ChoiceArena";
import { NidhiPhoto } from "./NidhiPhoto";

type Answer = "yes" | "no" | null;
const randomNoPhrases = [
  "Nice try",
  "Just click yes",
  "You're being a real nummy right now",
  "Don't be like that",
  "I know you want to",
];

export function ValentineCard() {
  const [answer, setAnswer] = useState<Answer>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [noPhrase, setNoPhrase] = useState<string | null>(null);

  useEffect(() => {
    if (!isSpinning) return;
    const t = window.setTimeout(() => setIsSpinning(false), 950);
    return () => window.clearTimeout(t);
  }, [isSpinning]);

  return (
    <>
      <Box
        sx={{
          // Apply transforms on a wrapper (not the Paper) for better iOS Safari behavior,
          // especially when the Paper uses `backdrop-filter`.
          transformOrigin: "50% 50%",
          WebkitTransformOrigin: "50% 50%",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform",
          animation: isSpinning ? `${spinZoom} 900ms ease-in-out` : "none",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            textAlign: "center",
            border: "1px solid rgba(216, 27, 96, 0.16)",
            backgroundColor: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 18px 60px rgba(0,0,0,0.10)",
          }}
        >
          <NidhiPhoto />

          <Typography
            variant="h3"
            sx={{ fontWeight: 800, letterSpacing: -0.6, mb: 1 }}
          >
            Nidhi, Be My Valentine?
          </Typography>

          <ChoiceArena
            onYes={() => {
              setAnswer("yes");
              setNoPhrase(null);
              setIsSpinning(true);
            }}
            onNo={() => {
              setAnswer("no");
              setNoPhrase(
                randomNoPhrases[
                  Math.floor(Math.random() * randomNoPhrases.length)
                ],
              );
            }}
          />

          {answer && (
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              {answer === "no"
                ? (noPhrase ?? "Nice try")
                : "Yay! I knew you'd say yes! ❤️"}
            </Typography>
          )}
        </Paper>
      </Box>
    </>
  );
}
