"use client";

import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  clickHandler: () => void;
  route?: string;
};

export default function Button(props: Props) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        props.clickHandler();
        props.route ? router.push(props.route) : null;
      }}
    >
      {props.children}
    </button>
  );
}
