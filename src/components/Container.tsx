import React from "react";
import { cx } from "~/utils/classnamescombiner";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  large?: boolean;
  alt?: boolean;
}
export default function Container(props: ContainerProps) {
  return (
    <div
      className={cx(
        "container mx-auto px-8 xl:px-5",
        props.large ? " max-w-screen-xl" : " max-w-screen-lg",
        !props.alt ? "py-5 lg:py-8" : "",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
