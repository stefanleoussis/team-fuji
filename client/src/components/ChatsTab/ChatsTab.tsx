import { List, ListItemText, ListItemAvatar, Avatar, Grid, Button, Typography } from '@material-ui/core';
import { useStyles, ListItem } from './useStyles';
import { Conversation } from '../../interface/Conversation';
import { useAuth } from '../../context/useAuthContext';
import { useState } from 'react';
import ContactsDialog from './ContactsDialog';
import InfiniteScroll from 'react-infinite-scroll-component';
import { User } from '../../interface/User';

interface Props {
  createConversation: (ids: string[]) => void;
  contacts: User[];
  conversations: Conversation[];
  handleConversationId: (conversationId: string) => void;
  fetchMoreData: () => void;
  hasMore: boolean;
}

const ChatsTab = ({
  conversations,
  handleConversationId,
  contacts,
  createConversation,
  fetchMoreData,
  hasMore,
}: Props): JSX.Element => {
  const { loggedInUser } = useAuth();
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (checkedUsers: User[]) => {
    createConversation(checkedUsers.map((user) => user._id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid className={classes.root}>
      <Button className={classes.addChatButton} color="primary" onClick={handleClickOpen}>
        + New Chat
      </Button>
      <ContactsDialog contacts={contacts} open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
      <Grid id="scrollableDiv" className={classes.scrollerWrapper}>
        {/* <InfiniteScroll
          className={classes.scroller}
          height={`60vh`}
          dataLength={conversations.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Typography> loading... </Typography>}
          scrollableTarget="scrollableDiv"
          endMessage={<Typography>No more conversations</Typography>}
        >
          <List>
            {conversations.map((conversation, index) => {
              const labelId = `conversation-${index}`;
              let previewSender, previewMessage;
              if (conversation.messages?.length) {
                previewSender =
                  conversation.messages[0].sender === loggedInUser?._id
                    ? 'You'
                    : conversation.users.length === 2
                    ? ''
                    : conversation.users.find((user) => user._id === conversation.messages[0].sender)?.username;
                previewMessage = conversation.messages[0].message;
              }
              const chatName =
                conversation.users.length === 2
                  ? conversation.users.find((user) => user._id !== loggedInUser?._id)?.username
                  : conversation.nickname || conversation.users.map((user) => user.username).join(', ');
              return (
                <ListItem
                  className={classes.item}
                  key={index}
                  button
                  onClick={() => {
                    handleConversationId(conversation._id);
                    handleListItemClick(index + 1);
                  }}
                  selected={selectedIndex === index + 1}
                >
                  <ListItemAvatar>
                    {(conversation.users.length === 2 && (
                      <Avatar
                        alt={`Avatar of 1`}
                        src={
                          conversation.users.find((user) => user._id !== loggedInUser?._id)?.profileImageUrl ||
                          `https://robohash.org/${
                            conversation.users.find((user) => user._id !== loggedInUser?._id)?._id
                          }`
                        }
                      />
                    )) || (
                      <Avatar
                        alt={'Group Chat Avatar'}
                        src={
                          conversation.groupChatImage
                            ? conversation.groupChatImage
                            : 'https://res.cloudinary.com/dhw0vijxi/image/upload/v1624454716/s911shfx01ehnt5d4hc0.jpg'
                        }
                      />
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={chatName}
                    primaryTypographyProps={{ noWrap: true }}
                    secondary={previewSender && `${previewSender}: ${previewMessage}`}
                    secondaryTypographyProps={{ noWrap: true }}
                  />
                </ListItem>
              );
            })}
          </List>
        </InfiniteScroll> */}
      </Grid>
    </Grid>
  );
};

export default ChatsTab;
