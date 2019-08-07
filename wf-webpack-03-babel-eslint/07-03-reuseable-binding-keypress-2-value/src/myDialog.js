import React from 'react'
import {Dialog} from  '@reach/dialog'
import styled from "@emotion/styled";
import "@reach/dialog/styles.css"

const Button = styled("button")`
  position: absolute;
  top: 0;
  right: 0;
  font-weight: 400;
  color: black;
  font-size: 0.75em;
  border: 1px solid transparent;
  background-color: transparent;
  margin: 5px;
  cursor: pointer;
  padding: 2px;
  width: 1.75em;
`;

const StyledDialog = styled(Dialog)`
  position: relative;
  height: 50vw;
`

const MyDialog = ({isOpen, onClose}) => (
  <StyledDialog isOpen={isOpen} >
    <Button onClick={onClose} >✕</Button>
    This is a dialog
  </StyledDialog>
)

export default MyDialog
