import { CSSProperties } from "react";
import * as Styled from "./index.styled";

type TagVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "li";

export type TypographyProps = {
  tag: TagVariants;
  textalign?: CSSProperties["textAlign"];
  children: React.ReactNode;
};

const Typography = ({
  tag = "p",
  textalign = "left",
  children,
}: TypographyProps) => (
  <Styled.DynamicTypography tag={tag} textalign={textalign}>
    {children}
  </Styled.DynamicTypography>
);

export default Typography;
