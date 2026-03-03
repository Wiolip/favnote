import React from "react";
import Heading from "./Heading";

export default {
  title: "Atoms/Heading",
  component: Heading,
};


export const Normal = {
  args: {
    children: "Hello Roman",
  },
};


export const Big = {
  args: {
    $big: true,
    children: "Hello Roman",
  },
};