import { useContext, useEffect } from "react";
import { ToastMessageContext } from "@/App";

function ToastMessage() {
  const { toastMessage, setToastMessage } = useContext(ToastMessageContext);

  useEffect(() => {
    setTimeout(() => {
      setToastMessage("");
    }, 2000);
  }, [toastMessage, setToastMessage]);
  return (
    <>
      {toastMessage.length && (
        <div className="toast">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ToastMessage;
