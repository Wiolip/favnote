import React from "react";
import Input from "./Input";

export default {
  title: "Atoms/Input",
  component: Input,
};

export const Normal = {
  args: {
    placeholder: "login",
  },
};

export const Search = {
  args: {
    placeholder: "search",
    $search: true,
  },
};