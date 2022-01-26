<template>
  <div class="wrapper">
    <footer id="community" class="footer section">
      <p class="copy-right">{{ $t('footer.copyright') }}</p>
      <div class="right">
        <div v-for="item in list">
          <a :href="item.url" target="_blank" :title="item.name">
            <img :src="getImageUrl(item.name)" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts" scoped>
function getImageUrl(name) {
  return new URL(`/src/assets/images/social-media/${name}.png`, import.meta.url).href
}

const list = [
  {
    name: 'twitter',
    url: 'https://twitter.com/The_OpenDAO',
  },
  {
    name: 'discord',
    url: 'https://discord.gg/opendao',
  },
  {
    name: 'notion',
    url: 'https://theopendao.notion.site/Open-DAO-687ee5f27633438c8629735a43372f20',
  },
  {
    name: 'snapshot',
    url: 'https://snapshot.org/#/theopendao.eth',
  },
  {
    name: 'forum',
    url: 'https://forum.theopendao.com',
  },
  {
    name: 'telegram',
    url: 'https://t.me/theopendao_official',
  },
  {
    name: 'etherscan',
    url: 'https://etherscan.io/token/0x3b484b82567a09e2588A13D54D032153f0c0aEe0',
  },
  {
    name: 'github',
    url: 'https://github.com/The-OpenDAO',
  },
  // {
  //   name: 'instagram',
  //   url: 'https://www.instagram.com/the_opendao/ ',
  // },
  // {
  //   name: 'tiktok',
  //   url: 'https://www.tiktok.com/@theopendao',
  // },
  // {
  //   name: 'twitch',
  //   url: 'https://www.twitch.tv/theopendao',
  // },
  // {
  //   name: 'youtube',
  //   url: 'https://www.youtube.com/channel/UCNQr3meUv9CQRZq0L8050IA',
  // },
]
</script>

<style lang="scss">
.wrapper {
  border-top: 1px solid #1e1f23;
  width: 100vw;
  display: flex;
  justify-content: center;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px !important;
  padding-bottom: 30px !important;

  .copy-right {
    font-size: 16px;
    font-weight: 400;
    opacity: 0.4;
  }
  .right {
    display: flex;
    // flex-grow: 1;
    div {
      padding-right: 20px;
      a {
        img {
          width: 30px;
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .footer {
    flex-direction: column-reverse;
    .copy-right {
      font-size: 14px;
    }
    .right {
      padding-bottom: 20px;
      flex-wrap: wrap;
      div {
        width: 25%;
        display: flex;
        padding: 5px 10px;
        align-items: center;
        justify-content: center;
        padding-right: 0;
        padding-bottom: 10px;
      }
    }
  }
}
</style>
