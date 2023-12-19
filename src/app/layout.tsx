import type { Metadata } from "next";
import { StyledComponentsRegistry } from "@/lib";
import { GlobalStyles } from "@/styles";

export const metadata: Metadata = {
  title: "Procrasti-Not(e)",
  description: "A simple draggable notes taking app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <StyledComponentsRegistry>
        <GlobalStyles />
        {children}
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
