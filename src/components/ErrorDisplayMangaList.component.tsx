import { Stack } from "@mui/material";

export function ErrorDisplayManga({ error }: { error: string }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100dvh", background: "white", padding: "20px" }}
    >
      <div>Error: {error}</div>
    </Stack>
  );
}
