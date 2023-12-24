import React from "react";
import clsx from "clsx";

interface Props {
  children: React.ReactElement | React.ReactElement[];
  className: string;
}

const Container = ({ children, className, ...Props }: Props) => {
  return (
    <div className={clsx("max-w-screen-xl mx-auto", className)} {...Props}>
      {children}
    </div>
  );
};

export default Container;
