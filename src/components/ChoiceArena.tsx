import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { useNoButtonDodge } from "../hooks/useNoButtonDodge";

export type ChoiceArenaProps = {
  onYes: () => void;
  onNo: () => void;
};

export function ChoiceArena({ onYes, onNo }: ChoiceArenaProps) {
  const {
    arenaRef,
    yesBtnRef,
    noBtnRef,
    noPos,
    moveNoButton,
    captureNoButtonPosition,
  } = useNoButtonDodge();

  const [isDodging, setIsDodging] = useState(false);

  const triggerDodge = () => {
    if (!isDodging) {
      setIsDodging(true);
      // Anchor the absolute-positioned button where it currently is,
      // then immediately move it away.
      captureNoButtonPosition();
      window.setTimeout(() => moveNoButton(), 0);
      return;
    }

    moveNoButton();
  };

  return (
    <Box
      ref={arenaRef}
      sx={{
        position: "relative",
        mx: "auto",
        width: "100%",
        maxWidth: 520,
        minHeight: { xs: 160, sm: 120 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
        }}
      >
        <Button
          ref={yesBtnRef}
          size="large"
          variant="contained"
          onClick={onYes}
          sx={{
            position: "relative",
            zIndex: 1,
            px: 4,
            py: 1.2,
            fontWeight: 800,
          }}
        >
          Yes
        </Button>

        <Button
          ref={noBtnRef}
          size="large"
          variant="outlined"
          onClick={() => {
            if (!isDodging) {
              // First time: start dodging instead of answering.
              triggerDodge();
              return;
            }
            onNo();
          }}
          onPointerEnter={() => triggerDodge()}
          onPointerDown={(e) => {
            // On touch devices, move away before a "click" can happen.
            e.preventDefault();
            triggerDodge();
          }}
          onFocus={() => triggerDodge()}
          sx={{
            ...(isDodging
              ? {
                  position: "absolute",
                  left: noPos.x,
                  top: noPos.y,
                }
              : { position: "relative" }),
            px: 4,
            py: 1.2,
            fontWeight: 800,
            transition: "left 140ms ease, top 140ms ease",
            userSelect: "none",
            touchAction: "none",
          }}
        >
          No
        </Button>
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 5 }}
      >
        P.S: Just click yes, you know you want to!
      </Typography>
    </Box>
  );
}
