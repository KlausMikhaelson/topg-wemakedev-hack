import { useEffect, useState, useRef } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import YouTube from 'react-youtube';
import { StreamChat } from 'stream-chat'
import { Chat, Channel, ChannelHeader, MessageInput, MessageInputSmall, VirtualizedMessageList, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';
import styles from '../styles/Home.module.css'

export default function ChatPage() {
  const [user, setUser] = useState({});
  const [client, setClient] = useState();
  console.log('client:', client);
  const [channel, setChannel] = useState();
  const [messages, setMessages] = useState([]);

  const videoRef = useRef();

  useEffect(() => {
    if ( !user?.id ) return;

    (async function run() {
      const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY);
      setClient(client);

      const { token } = await fetch('/api/token_gen', {
        method: 'POST',
        body: JSON.stringify({
          id: user.id
        })
      }).then(r => r.json());

      await client.connectUser(
        {
          id: user.id,
          name: user.id,
          image: 'https://i.imgur.com/fR9Jz14.png',
        },
        token
      )

      const channel = client.channel('livestream', 'mylivestream', {
        name: 'Kunal\'s live session',
      });

      setChannel(channel);
    })();

    return () => {
      client.disconnectUser();
      setChannel(undefined);
    }

  }, [user.id]);

  useEffect(() => {
    if ( !channel ) return;
    const listener = channel.on('message.new', async (event) => {
      const player = videoRef.current.getInternalPlayer();
      const time = await player.getCurrentTime();

      setMessages(prev => {
        return [
          ...prev,
          {
            message: event.message,
            time
          }
        ]
      })
    })
    return () => {
      listener.unsubscribe();
    }
  }, [channel])

  

  return (
    <div className={styles.container}>
      <Head>
        <title>Stream &amp; Chat!</title>
        <meta name="description" content="Watch some youtube and chat with your friends!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        {!user?.id && (
          <>
            <h1>Koffee with Kunal</h1>

            <p>To get started, enter what should kunal call you:</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              const id = Array.from(e.currentTarget.elements).find(({ name }) => name ==='userId').value;
              setUser({ id });
            }}>
              <input type="text" name="userId" />
              <button>Join</button>
            </form>
          </>
        )}

        {user?.id && (
          <>
            <div className={styles.stream}>
              <div className={styles.streamVideo}>
              <video className={styles.RickROll} src="../Rick.mp4" autoPlay></video>
              </div>

              <div>
                { client && channel && (
                  <Chat client={client} theme='livestream dark'>
                    <Channel channel={channel}>
                      <Window>
                        <ChannelHeader live />
                        <VirtualizedMessageList />
                        {!channel.id.includes('replay') && (
                          <MessageInput Input={MessageInputSmall} focus />
                        )}
                      </Window>
                    </Channel>
                  </Chat>
                )}
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  )
}