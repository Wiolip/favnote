import React from "react";
import Card from "./Card";

export default {
  title: "Molecules/Card",
  component: Card,
  argTypes: {
    cardType: {
      control: { type: "select" },
      options: ["note", "twitter", "article"],
    },
    avatarUrl: { control: "text" },
    linkUrl: { control: "text" },
  },
};


const Template = (args) => <Card {...args} />;


export const Note = Template.bind({});
Note.args = {
  cardType: "note",
};

export const Twitter = Template.bind({});
Twitter.args = {
  cardType: "twitter",
  avatarUrl: "https://i.pravatar.cc/300",
};

export const Article = Template.bind({});
Article.args = {
  cardType: "article",
  linkUrl: "https://youtube.com/helloroman",
};
