import { useEffect } from 'react';
import { useState } from 'react';
import { sendTypingStatusMessage } from '../services/chatFunctions';

export const useTypingStatusHook = ({ toUserId }: { toUserId: string }) => {

  const [typing, setTyping] = useState<boolean>(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (typing) {
      sendTypingStatusMessage({ toUserId, typing: true })
      timeout = setTimeout(() => {
        setTyping(false);
        sendTypingStatusMessage({ toUserId, typing: false })
      }, 3000)
    }
  }, [typing])

  return { setTyping }

}