import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

function judgeClient() {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //判断是否是 android终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 iOS终端
  if (isAndroid) {
    return "Android";
  } else if (isIOS) {
    return "IOS";
  } else {
    return "PC";
  }
}

// const smsValue = (val) => {
//   if (judgeClient() == "Android") {
//     return "sms:?body=" + encodeURIComponent(val);
//   }
//   if (judgeClient() == "IOS") {
//     return "sms:&body=" + encodeURIComponent(val);
//   }
// };

export default function shareLinks({ text, linkUrl }) {
  console.log(linkUrl.value);
  const store = useStore();
  const theme = computed(() => store.state.theme.mode);

  return [
    {
      href: "tg://msg?text=" + encodeURIComponent(linkUrl.value),
      image: `${
        theme.value == "dark"
          ? "/share/telegram-dark.png"
          : "/share/telegram.png"
      }`,
      name: "Telegram",
    },

    {
      // href:
      //   "https://www.facebook.com/sharer/?u=" +
      //   encodeURIComponent(linkUrl.value),
      href: "fb://share/?u=" + encodeURIComponent(linkUrl.value),
      image: `${
        theme.value == "dark"
          ? "/share/facebook-dark.png"
          : "/share/facebook.png"
      }`,
      name: "Facebook",
    },

    {
      href:
        "https://api.whatsapp.com/send?text=" +
        encodeURIComponent(text + linkUrl.value),
      image: `${
        theme.value == "dark"
          ? "/share/whatsapp-dark.png"
          : "/share/whatsapp.png"
      }`,
      name: "WhatApp",
    },

    {
      href:
        "https://twitter.com/home?status=" +
        encodeURIComponent(text + linkUrl.value),
      image: `${
        theme.value == "dark" ? "/share/twitter-dark.png" : "/share/twitter.png"
      }`,
      name: "Twitter",
    },
  ];
}
