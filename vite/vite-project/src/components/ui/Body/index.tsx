import type React from "react";

interface BodyProps {
  // content: React.ReactElement;
  content: React.ReactNode;
}

const Body = (props: BodyProps) => {
  return <div>{props.content}</div>;
};

export default Body;
