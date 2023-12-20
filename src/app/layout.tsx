"use client";
import type { Metadata } from "next";
import { ThemeProvider } from "styled-components";
import { StyledComponentsRegistry } from "@/lib";
import { GlobalStyles, theme } from "@/styles";
import { Nav, Container } from "@/components";

export const metadata: Metadata = {
  title: "Procrasti-Not(e)",
  description: "A simple draggable notes taking app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <StyledComponentsRegistry>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Container about="App content">
            <Nav />
            <main>{children}</main>
          </Container>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
