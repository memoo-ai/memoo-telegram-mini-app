/* eslint-disable no-debugger */
import { Button, Drawer, Modal } from 'antd';
import message from '@/components/IMessage';
import React, {
  Children,
  FC,
  ReactNode,
  cloneElement,
  isValidElement,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
} from 'react';
import isMobile from 'is-mobile';
// import { IconClose, IconTelegram } from '@/components/icons';
import { getTwitterClientId, requestTwitterFollow, twitterBind } from '@/api/token';
import { authorizeTwitter, authorizeTwitterMobile } from '@/utils';
import { docClick, telegramBind } from '@/api/join';
// import TelegramLoginButton from '@/components/TelegramLoginButton';
import { TelegramBind } from '@/types';
import { REQUEST_FOLLOWING_STORAGE } from '@/constants';
import { useSearchParams } from 'react-router-dom';

type ChildWithOnClick = ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
const termAndConditions = import.meta.env.VITE_LINK_TERMS_AND_CONDITIONS;
const sliderStep = import.meta.env.VITE_SLIDER_STEP;
const twitterRedirectUri = import.meta.env.VITE_TWITTER_FOLLOW_REDIRECT_URI;
const twitterMobileRedirectUri = import.meta.env.VITE_TWITTER_FOLLOW_AIRDROP_REDIRECT_URI;
const TWITTER_CLIENT_ID_KEY = 'join_twitter_client_id';
const TWITTER_TYPE = 'twitter_type';
const TWITTER_FOLLOW_KEY = 'twitter_follow';
const platformTwitter = import.meta.env.VITE_PLATFORM_TWITTER;
let isRequestFollowing = false;
const TWITTER_PAGE = import.meta.env.VITE_TWITTER_PAGE;
const BotId = import.meta.env.VITE_BOT_ID;
const BaseUrl = import.meta.env.VITE_SHARE_URI;
const joinPath = import.meta.env.VITE_ROUTE_JOIN;
const TaskModal: FC<{
  children: ReactNode;
  popupTaskName: string;
  taskScore: string | number;
  popupButtonName: string;
  taskType: string;
  taskUri: string;
  disabled?: boolean;
  taskFinish?: boolean;
  index: number;
  onVerify?: () => void;
  className?: string;
}> = ({
  children,
  popupTaskName,
  taskScore,
  popupButtonName,
  taskType,
  taskUri = '',
  disabled = false,
  onVerify,
  taskFinish,
  index,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const handleFollow = useCallback(async (twitter: string) => {
    try {
      if (!twitter) {
        return message.info('Please refresh and retry', { key: 'Please refresh and retry' });
      }
      const res = await getTwitterClientId();
      let clientId = res.data;
      localStorage.setItem(TWITTER_CLIENT_ID_KEY, clientId);
      localStorage.setItem(TWITTER_FOLLOW_KEY, twitter);
      localStorage.setItem(TWITTER_TYPE, 'follow');
      localStorage.setItem(TWITTER_PAGE, 'join');
      isMobile()
        ? authorizeTwitterMobile(clientId, twitterMobileRedirectUri)
        : authorizeTwitter(clientId, twitterRedirectUri);
      localStorage.setItem(REQUEST_FOLLOWING_STORAGE, JSON.stringify({}));
      console.assert(!!twitter, 'twitter is not found');
      setLoading(true);
      // await follow(twitter!);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (taskFinish) {
      setOpen(false);
    }
  }, [open, taskFinish]);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      console.log('handleMessage-event:', event);
      const data = event.data;
      console.log('Received data from child window:', data);
      let followingParams = null;
      try {
        followingParams = JSON.parse(localStorage.getItem(REQUEST_FOLLOWING_STORAGE) ?? '');
      } catch (e) {}
      if (!followingParams) {
        return;
      }
      if (isRequestFollowing) {
        return;
      }
      if (data.code && data.state === 'twitter' && data.type === 'twitter_bind' && followingParams) {
        isRequestFollowing = true;
        const clientId = localStorage.getItem(TWITTER_CLIENT_ID_KEY);
        const params = {
          code: data.code ?? '',
          grantType: 'authorization_code',
          // clientd: twitterClientId,
          redirectUri: isMobile() ? twitterMobileRedirectUri : twitterRedirectUri,
          codeVerifier: 'challenge',
          refreshToken: '',
          appClientId: clientId ?? '',
        };
        // debugger;
        const twitterType = localStorage.getItem(TWITTER_TYPE);
        if (twitterType === 'bind') {
          await twitterBind(params);
        } else if (twitterType === 'follow') {
          await requestTwitterFollow({ ...params, twitter: localStorage.getItem(TWITTER_FOLLOW_KEY) ?? '' });
        }
        localStorage.removeItem(TWITTER_CLIENT_ID_KEY);
        localStorage.removeItem(TWITTER_TYPE);
        localStorage.removeItem(REQUEST_FOLLOWING_STORAGE);
        isRequestFollowing = false;
      }
      // else if (data.code && data.state === 'twitter' && data.type === 'create') {
      //   const clientId = localStorage.getItem(TWITTER_CLIENT_ID_KEY);
      //   const params = {
      //     code: data.code ?? '',
      //     grantType: 'authorization_code',
      //     // clientd: twitterClientId,
      //     redirectUri: twitterCreatorRedirectUri,
      //     codeVerifier: 'challenge',
      //     refreshToken: '',
      //     appClientId: clientId ?? '',
      //   };
      //   getTwitterAccessToken(params).then((res) => {
      //     const { access_token, twitter } = res.data;
      //     setTwitterAccessToken(access_token);
      //     setCreateTwitter(twitter);
      //   });
      // }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const ticker = searchParams.get('ticker');
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      let followingParams = null;
      try {
        followingParams = JSON.parse(localStorage.getItem(REQUEST_FOLLOWING_STORAGE) ?? '');
      } catch (e) {}
      if (!followingParams) {
        return;
      }
      if (isRequestFollowing) {
        return;
      }
      if (state === 'twitter' && code && followingParams) {
        isRequestFollowing = true;
        const clientId = localStorage.getItem(TWITTER_CLIENT_ID_KEY);
        const params = {
          code: code ?? '',
          grantType: 'authorization_code',
          // clientd: twitterClientId,
          redirectUri: isMobile() ? twitterMobileRedirectUri : twitterRedirectUri,
          codeVerifier: 'challenge',
          refreshToken: '',
          appClientId: clientId ?? '',
        };
        const twitterType = localStorage.getItem(TWITTER_TYPE);
        if (twitterType === 'bind') {
          await twitterBind(params);
        } else if (twitterType === 'follow') {
          await requestTwitterFollow({ ...params, twitter: localStorage.getItem(TWITTER_FOLLOW_KEY) ?? '' });
        }

        localStorage.removeItem(REQUEST_FOLLOWING_STORAGE);
        localStorage.removeItem(REQUEST_FOLLOWING_STORAGE);
        localStorage.removeItem(TWITTER_PAGE);
        isRequestFollowing = false;
      }
      console.log('ticker: ', ticker);
    })();
  }, [searchParams]);
  const handleTwitterBind = async () => {
    const res = await getTwitterClientId();
    let clientId = res.data;
    localStorage.setItem(TWITTER_CLIENT_ID_KEY, clientId);
    localStorage.setItem(TWITTER_TYPE, 'bind');
    localStorage.setItem(TWITTER_PAGE, 'join');
    localStorage.setItem(REQUEST_FOLLOWING_STORAGE, JSON.stringify({}));
    console.log('twitterRedirectUri: ', twitterRedirectUri);
    isMobile()
      ? authorizeTwitterMobile(clientId, twitterMobileRedirectUri)
      : authorizeTwitter(clientId, twitterRedirectUri);
  };

  const loginTelegram = () => {
    (window as any).Telegram.Login.auth(
      {
        bot_id: BotId,
        request_access: 'write',
        data_auth_url: `https://${BaseUrl}/${joinPath}`,
        // embed: 1
      },
      (data: TelegramBind) => {
        console.log(data, 'this is callback data');
        if (data) {
          telegramBind(data);
        }
      },
    );
  };
  const loginTelegramMobile = () => {
    (window as any).Telegram.Login.auth(
      {
        bot_id: BotId,
        request_access: 'write',
        data_auth_url: `https://${BaseUrl}/${joinPath}`,
        // embed: 1
      },
      (data: TelegramBind) => {
        console.log(data, 'this is callback data');
        if (data) {
          setTimeout(async () => {
            await telegramBind(data);
          }, 500);
        }
      },
    );
  };

  const handleLogin = () => {
    if (isMobile()) {
      const state = Math.random().toString(36).substring(7);
      sessionStorage.setItem('telegram_auth_state', state);
      const botName = '@ai_best2_bot';
      const authUrl = `tg://resolve?domain=${botName}&start=${state}`;
      const redirectUrl = `https://${BaseUrl}`;
      const webAuthUrl = `https://oauth.telegram.org/auth?bot_id=${botName}&origin=${encodeURIComponent(redirectUrl)}&return_to=${encodeURIComponent(redirectUrl)}&state=${state}`;

      window.location.href = authUrl;
      setTimeout(() => {
        window.location.href = webAuthUrl;
      }, 1000);
    }
  };
  // const loginTelegramMobile = () => {
  //   const origin = encodeURIComponent(`https://${BaseUrl}`);
  //   const returnTo = encodeURIComponent(`https://${BaseUrl}/${joinPath}`);

  //   const authUrl = `https://oauth.telegram.org/auth?bot_id=${BotId}&origin=${origin}&request_access=write&return_to=${returnTo}`;

  //   window.location.href = authUrl;
  // };

  const handleTask = useCallback(async () => {
    console.log('handleTask', taskType);

    // const res = useAddress();
    //
    if (taskType === 'bindTwitter') {
      localStorage.setItem('twitter_type', 'bind');
      handleTwitterBind();
    } else if (taskType === 'bindTelegram') {
      // loginTelegram();
      isMobile() ? loginTelegramMobile() : loginTelegram();
    } else if (taskType === 'twitter') {
      // handleFollow(taskUri);
      localStorage.setItem(TWITTER_TYPE, 'follow');
      localStorage.setItem(TWITTER_PAGE, 'join');
      handleFollow(taskUri);
    } else if (taskType === 'readDocs') {
      await docClick();
      window.open(taskUri, '_blank');
    } else {
      window.open(taskUri, '_blank');
    }
  }, [taskUri, taskType]);

  const handleTelegramResponse = async (user: any) => {
    try {
      console.log('handleTelegramResponse', user);
      const response = await telegramBind(user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  const content = (
    <div className={`h-full ${className}`}>
      <div className="w-full h-full border border-solid border-green rounded-[7px] flex items-center justify-between p-2.5">
        <div className="flex justify-center items-center gap-x-2 text-white font-OCR text-[18px] leading-[18px] max-lg:text-12-12">
          <div className="w-8 h-8 rounded-[7px] flex justify-center items-center border border-solid border-green">
            {/* <IconTelegram className="w-[17px] h-[14px]" /> */}
          </div>
          {isMobile() && `${index >= 9 ? '' : 0}${index + 1} / `}
          {popupTaskName}
        </div>
        <var className={`${!isMobile() && 'points-btn'} px-0.5 py-1 max-lg:font-404px max-lg:text-8-8 text-white`}>
          {taskScore} points
        </var>
      </div>
      <div className="flex items-center justify-between mt-6 gap-x-2.5">
        <span className="!w-[84px] h-[35px] border border-solid border-green bg-[#2B526E] rounded-[4px] font-404px text-white text-base leading-none flex items-center justify-center">
          STEP 1
        </span>
        {taskType === 'bindTelegram' ? (
          // <TelegramLoginButton className="flex-1">
          //   <Button loading={loading} className="flex-1 w-full h-[35px] memoo_button_join_modal" onClick={handleTask}>
          //     {popupButtonName}
          //   </Button>
          // </TelegramLoginButton>
          <Button loading={loading} className="flex-1 w-full h-[35px] memoo_button_join_modal" onClick={handleTask}>
            {popupButtonName}
          </Button>
        ) : (
          // !isMobile() ? (
          //   <TelegramLogin
          //     botName="@ai_best2_bot"
          //     onAuth={handleTelegramResponse}
          //     buttonSize="large"
          //     cornerRadius={8}
          //     requestAccess="write"
          //     usePic={true}
          //   >
          //     <Button loading={loading} className="flex-1 w-full h-[35px] memoo_button_join_modal">
          //       {popupButtonName}
          //     </Button>
          //   </TelegramLogin>
          // ) : (
          //   <TelegramLoginButton className="flex-1">
          //     <Button loading={loading} className="flex-1 w-full h-[35px] memoo_button_join_modal" onClick={handleTask}>
          //       {popupButtonName}
          //     </Button>
          //   </TelegramLoginButton>
          // )
          <Button
            loading={loading}
            className="flex-1 w-full h-[35px] memoo_button_join_modal"
            onClick={isMobile() ? handleLogin : handleTask}
          >
            {popupButtonName}
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 gap-x-2.5">
        <span className="w-[84px] h-[35px] border border-solid border-green bg-[#2B526E] rounded-[4px] font-404px text-white text-base leading-none flex items-center justify-center">
          STEP 2
        </span>
        <Button className="flex-1 w-full h-[35px] memoo_button_join_modal" onClick={() => onVerify?.()}>
          VERIFY
        </Button>
      </div>
    </div>
  );
  return (
    <>
      {isMobile() ? (
        <Drawer
          className="memoo_drawer"
          title=""
          open={open}
          placement="bottom"
          onClose={() => {
            setOpen(false);
          }}
          destroyOnClose
        >
          {content}
        </Drawer>
      ) : (
        <Modal
          wrapClassName="memoo_modal"
          title=""
          open={open}
          onCancel={() => {
            setOpen(false);
          }}
          footer={null}
          destroyOnClose
        >
          {content}
        </Modal>
      )}
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          const existingOnClick = (child as ChildWithOnClick).props.onClick;
          return cloneElement(child as ChildWithOnClick, {
            onClick: async (e: any) => {
              if (existingOnClick) {
                await existingOnClick(e);
                if (!disabled) {
                  setOpen(true);
                }
              }
            },
          });
        }
        return child;
      })}
    </>
  );
};

export default TaskModal;
