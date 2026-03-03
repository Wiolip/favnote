import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Paragraph from "@/components/atoms/Paragraph/Paragraph";
import Heading from "@/components/atoms/Heading/Heading";
import Button from "@/components/atoms/Button/Button";
import LinkIcon from "@/assets/icons/link.svg?url";

const StyledWrapper = styled.div`
  min-height: 380px;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
`;

const InnerWrapper = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "activeColor" && prop !== "flex",
})`
  position: relative;
  padding: 17px 30px;
  background-color: ${({ activeColor, theme }) =>
    activeColor ? theme[activeColor] : "white"};

  :first-of-type {
    z-index: 9999;
  }

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
`;

const DateInfo = styled(Paragraph)`
  margin: 0 0 5px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0;
`;

const StyledAvatarWrapper = styled.div`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.twitter};
  overflow: hidden;
  position: absolute;
  right: 25px;
  top: 25px;
`;

const StyledAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const StyledLinkWrapper = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  position: absolute;
  right: 25px;
  top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  z-index: 1000;
`;

const StyledLinkIcon = styled.img`
  width: 50%;
  height: 50%;
  object-fit: contain;
`;

const Card = ({ cardType, avatarUrl, linkUrl }) => (
  <StyledWrapper>
    <InnerWrapper activeColor={cardType}>
      <StyledHeading>Hello Roman</StyledHeading>
      <DateInfo>3 days</DateInfo>

      {cardType === "twitter" && avatarUrl && (
        <StyledAvatarWrapper>
          <StyledAvatar src={avatarUrl} alt="Twitter avatar" />
        </StyledAvatarWrapper>
      )}

      {cardType === "article" && linkUrl && (
        <StyledLinkWrapper
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer">
          <StyledLinkIcon src={LinkIcon} alt="Article icon" />
        </StyledLinkWrapper>
      )}
    </InnerWrapper>

    <InnerWrapper flex>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit nemo
        ducimus fuga repellendus illum
      </Paragraph>
      <Button $secondary>REMOVE</Button>
    </InnerWrapper>
  </StyledWrapper>
);

Card.propTypes = {
  cardType: PropTypes.oneOf(["note", "twitter", "article"]),
  avatarUrl: PropTypes.string, // URL avatara dla twitter
  linkUrl: PropTypes.string, // URL artykułu
};

Card.defaultProps = {
  cardType: "note",
  avatarUrl: "https://i.pravatar.cc/300",
  linkUrl: "https://youtube.com/helloroman",
};

export default Card;
