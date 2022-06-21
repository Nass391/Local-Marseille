import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    // display: flex;
    justify-content: space-between;
    align-items: left;
    // z-index: 12;
    // position: sticky;
    // top: 0;
`;
export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
  text-decoration: none;
`;

export const NavLink = styled(Link)`
color: black;
// font-size: 3vw;
 display: block;
// padding: 1.5rem;
// display: flex;
//  align-items: center;
// text-decoration: none;
// padding: 0 1rem;
// height: 100%;
cursor: pointer;
&:hover {
  transition: all 0.2s ease-in-out;
  background: #fff;
  color: #808080;
}
`;

export const Bars = styled(FaBars)`
  display: none;
  color: black;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 2px;
    padding: 4px;
    background-color: white;
    transform: translate(-50%, 50%);
    font-size: 1.8rem;
    cursor: pointer;
    &:hover {
      transform: translate(-50%, 50%) scale(1.1);
    }
  }
//   &:toggleMenu::before {
//       transform: rotate(45deg);
//   }
// &:toggleMenu::after {
//     transform: rotate(-45deg);
// }
`;

export const NavMenu = styled.div`

  display: flex;
 
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
    // padding: 1.5rem;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;

  padding: 10px 22px;
  color: black;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;