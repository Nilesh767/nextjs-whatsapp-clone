import { useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import styled from "styled-components";
import Timeago from "timeago-react";

import firebase from "firebase";
import { auth, db } from "../firebase";
import Message from "./Message";
import getRecipientEmail from "../util/getRecipientEmail";

import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

const ChatScreen = ({ chat, messages }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const endOfMessageRef = useRef(null);
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot?.docs.map((message) => (
        <Message
          key={message.id}
          user={message?.data().user}
          message={{
            ...message?.data(),
            timestamp: message?.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
  };

  const recipientEmail = getRecipientEmail(chat.users, user);
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
        )}
        <HeaderInfo>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last seen{" "}
              {recipient?.lastSeen?.toDate() ? (
                <Timeago datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}{" "}
            </p>
          ) : (
            <p>Loading last active...</p>
          )}
        </HeaderInfo>
        <HeaderIcon>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcon>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonIcon />
        <Input
          placeholder="Enter message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;
const Header = styled.div`
  top: 0;
  height: 80px;
  z-index: 100;
  padding: 11px;
  display: flex;
  position: sticky;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: -13px;
  }
  > p {
    color: grey;
    font-size: 14px;
  }
`;
const HeaderIcon = styled.div``;
const MessageContainer = styled.div`
  padding: 30px;
  min-height: 90vh;
  background-color: #e5ded8;
`;
const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;
const InputContainer = styled.form`
  bottom: 0;
  z-index: 100;
  display: flex;
  padding: 10px;
  position: sticky;
  align-items: center;
  background-color: white;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 10px;
  background-color: whitesmoke;
`;
