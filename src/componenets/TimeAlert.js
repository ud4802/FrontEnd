import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function TimerAlert({ message, variant, duration }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [duration]);

  return (
    <Alert variant={variant} show={show} onClose={() => setShow(false)}>
      {message}
    </Alert>
  );
}

export default TimerAlert;