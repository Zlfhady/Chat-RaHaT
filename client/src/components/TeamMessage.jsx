import React from 'react';
import { MessageTeam, useChannelContext } from 'stream-chat-react';

const TeamMessage = () => {
    const { handleOpenThread, message } = useChannelContext();

    return (
        <MessageTeam
            message={{ ...message, user: {}}}
             handleOpenThread={handleOpenThread}
        />
    )
}

export default TeamMessage;
