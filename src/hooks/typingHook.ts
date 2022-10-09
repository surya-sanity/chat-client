import { useEffect } from 'react';
import { useState } from 'react';
import { sendTypingStatusMessage } from '../services/chatFunctions';

export const useTypingStatusHook = ({ toUserId }: { toUserId: string }) => {

  const [typing, setTyping] = useState<boolean>(false)

  useEffect(() => {
    sendTypingStatusMessage({ toUserId, typing })
  }, [typing])

  function onKeyDownNotEnter() {
    var timeout = undefined;

    function timeoutFunction() {
      setTyping(false)
    }

    if (typing == false) {
      setTyping(true);
      sendTypingStatusMessage({ toUserId, typing })
      timeout = setTimeout(timeoutFunction, 1000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(timeoutFunction, 1000);
    }
  }

  return { onKeyDownNotEnter }

}