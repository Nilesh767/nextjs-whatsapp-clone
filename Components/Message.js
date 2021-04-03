import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import moment from "moment";

import { auth } from "../firebase";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);

  const MessageType = user === userLoggedIn.email ? Sender : Receiver;
  return (
    <Container>
      <MessageType>
        {message.message}
        <TimeStamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </TimeStamp>
      </MessageType>
    </Container>
  );
};

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  margin: 10px;
  padding: 15px;
  min-width: 60px;
  text-align: right;
  width: fit-content;
  border-radius: 8px;
  position: relative;
  padding-bottom: 26px;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const Receiver = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;

const TimeStamp = styled.span`
  right: 0;
  bottom: 0;
  color: grey;
  padding: 10px;
  font-size: 8px;
  text-align: right;
  position: absolute;
`;
