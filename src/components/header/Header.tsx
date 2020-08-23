import { css, keyframes } from "@emotion/core";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { ReactComponent as SvgFootwear } from "../../static/images/footwear.svg";
import localiser from "../../services/locale";
import StyleConstants from "../../constants/styleConstants";
import CssUtils from "../../utils/cssUtils";

const logoIconLinesFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export default function Header() {
  return (
    <Container
      tag="header"
      css={css`
        background-color: #fff;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.05);
      `}
      className="sticky-top"
      fluid
    >
      <Container fluid="md">
        <Row
          css={css`
            margin: 12px 0;
            justify-content: center;
          `}
          noGutters
        >
          <Col>
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <SvgFootwear
                css={css`
                  margin-right: 16px;
                  width: 40px;
                  height: 40px;
                  fill: #484848;
                  transition: fill 150ms ease-out;

                  ${[1, 2, 3].map(
                    (number) =>
                      css`
                        #line-${number} {
                          animation-name: ${logoIconLinesFadeIn};
                          animation-duration: 750ms;
                          animation-delay: ${number * 250}ms;
                          animation-timing-function: ease-out;
                          animation-fill-mode: both;
                          fill: ${StyleConstants.colors.accent};
                          transition: fill 150ms ease;
                        }
                      `
                  )}

                  :hover {
                    fill: ${StyleConstants.colors.accent};

                    ${[1, 2, 3].map(
                      (number) =>
                        css`
                          #line-${number} {
                            fill: #484848;
                          }
                        `
                    )}
                  }
                `}
              />
              <span
                css={css`
                  display: inline-block;
                  white-space: nowrap;
                  font-size: ${CssUtils.rem(16)};
                  font-weight: 500;
                  line-height: 1;
                  letter-spacing: 0.04em;
                  text-transform: uppercase;
                  color: ${StyleConstants.colors.textW500};
                `}
              >
                {localiser.l("header/title")}
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
