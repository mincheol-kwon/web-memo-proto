import React from 'react';
import styled, { css } from 'styled-components';

import { darken, lighten } from 'polished';

const colorStyles = css`
  ${({ theme, color }: { theme: any; color: string }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
    `;
  }}
`;
const StyledButton = styled.button`
  /* 공통 스타일 */
  outline: none;
  border: 2px solid
    ${(props: any) => (props.selected ? 'black' : 'transparent')};
  border-radius: 4px;
  color: black;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  height: 2.25rem;
  font-size: 1rem;

  /* 색상 */
  ${colorStyles}

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
`;

function MemoColorButton({
  children,
  color,
  selected,
  ...rest
}: {
  children: React.ReactNode;
  color: string;
  selected: boolean;
  onClick: any;
}) {
  return (
    <StyledButton color={color} {...rest}>
      {children}
    </StyledButton>
  );
}

MemoColorButton.defaultProps = {
  color: 'blue',
};

export default MemoColorButton;
