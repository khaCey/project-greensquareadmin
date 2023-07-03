import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Nav = styled(motion.nav)`
  max-width: 15em;
  height: 100vh;
  user-select: none;
  font-size: 1em;
  font-weight: bold;
  background-color: #2B2F33;
  color: #8B8E90;
  display: flex;
  justify-content: center;
  z-index: 1;
`;

export const Container = styled.div`
  width: 100%;
`;

export const List = styled.ul`
  width: 100%;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ListItem = styled.li`
  height: 3em;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.selected ? 'rgb(253,65,60)' : '')};
  background: ${(props) =>
    props.selected
      ? 'linear-gradient(90deg, rgba(253,65,60,0.25) 0%, rgba(43,47,51,1) 80%, rgba(43,47,51,1) 100%)'
      : ''};
  border-right: ${(props) => (props.selected ? '3px solid #fd413c' : '')};
  &:hover{
    background-color: #3d434b;
  }
  &.default:hover{
    background: linear-gradient(90deg, rgba(253,65,60,0.25) 0%, rgba(43,47,51,1) 80%, rgba(43,47,51,1) 100%);
    color: #FD413C;
  }
  &.logout:hover{
    background-color: #3d434b;
    color: white;
  }
  cursor: pointer;
`;

export const HideButton = styled.label`
  width: 100%;
  height: 1em;
  display: flex;
  padding: 1em;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  cursor: pointer;
`;

export const Label = styled(motion.label)`
  width: 50%;
  height: 3em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Name = styled.span`
  width: 7em;
  margin-left: 1em;
  font-size: 0.8em;
  display: ${(props) => (props.hide ? 'none' : 'inline')};
`;