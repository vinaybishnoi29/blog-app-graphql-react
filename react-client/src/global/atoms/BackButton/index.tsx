import React from 'react';
import { Button } from 'reactstrap';
import {BACK_BUTTON_LABEL} from '../../constants'
import { useHistory } from "react-router-dom";


const BackButton = () => {
  const history = useHistory();
  const handleBackClick = () => {
    history.push('/');
  };

  return (
    <Button
      color="info"
      onClick={handleBackClick}
    >
      {BACK_BUTTON_LABEL}
    </Button>
  )
}

export default BackButton;