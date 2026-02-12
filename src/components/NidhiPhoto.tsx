import { useState } from "react";
import { Box } from "@mui/material";

export type NidhiPhotoProps = {
  /**
   * Path under /public.
   * Example: "/nidhi.jpg"
   */
  src?: string;
};

export function NidhiPhoto({ src = "/nidhi.jpg" }: NidhiPhotoProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Box
      component="img"
      src={src}
      alt="Nidhi"
      loading="eager"
      onError={() => setIsVisible(false)}
      sx={{
        width: { xs: 150, sm: 170 },
        height: { xs: 150, sm: 170 },
        objectFit: "cover",
        borderRadius: "999px",
        display: "block",
        mx: "auto",
        mb: 2,
        border: "3px solid rgba(216, 27, 96, 0.22)",
        boxShadow: "0 14px 40px rgba(0,0,0,0.14)",
        backgroundColor: "rgba(216, 27, 96, 0.06)",
      }}
    />
  );
}
