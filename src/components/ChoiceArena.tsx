import { Box, Button, Typography } from "@mui/material";

import { useNoButtonDodge } from "../hooks/useNoButtonDodge";

export type ChoiceArenaProps = {
  onYes: () => void;
  onNo: () => void;
};

export function ChoiceArena({ onYes, onNo }: ChoiceArenaProps) {
  const { arenaRef, yesBtnRef, noBtnRef, noPos, moveNoButton } =
    useNoButtonDodge();

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
        onClick={onNo}
        onPointerEnter={() => moveNoButton()}
        onPointerDown={(e) => {
          // On touch devices, move away before a "click" can happen.
          e.preventDefault();
          moveNoButton();
        }}
        onFocus={() => moveNoButton()}
        sx={{
          position: "absolute",
          left: noPos.x,
          top: noPos.y,
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

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 2 }}
      >
        P.S: Just click yes, you know you want to!
      </Typography>
    </Box>
  );
}
