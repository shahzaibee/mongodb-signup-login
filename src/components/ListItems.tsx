import Link from "next/link";
import React from "react";

interface Links {
  title: string;
  href: any;
}

const ListItems = ({ title, href }: Links) => {
  return (
    <>
      <Link href={href}>
        <li className="hover:text-primaryColor cursor-pointer duration-200">{title}</li>
      </Link>
    </>
  );
};

export default ListItems;
