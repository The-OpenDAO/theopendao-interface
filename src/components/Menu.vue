<template>
  <div>
    <el-dropdown class="dropdwon-style">
      <span class="el-dropdown-link">
        <a @click="goAnchor('#sos-chain', 'sos-chain')"
          >{{ $t("header.sosChain") }}
          <el-icon class="el-icon--down arrow">
            <arrow-down />
          </el-icon>
        </a>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item disabled>{{
            $t("common.bridge")
          }}</el-dropdown-item>
          <el-dropdown-item divided disabled>DEX</el-dropdown-item>
          <el-dropdown-item divided disabled>{{
            $t("common.lending")
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="dropdwon-style">
      <span class="el-dropdown-link">
        <a target="_blank" href="https://www.sosmarket.io/">{{
          $t("header.sosMarket")
        }}</a>
      </span>
    </div>
    <div class="dropdwon-style">
      <span class="el-dropdown-link">
        <a target="_blank" href="https://www.721.com/">721FM</a>
      </span>
      <!-- <br />
      <span class="coming-soon">{{ $t('header.coming') }}</span> -->
    </div>
    <el-dropdown class="dropdwon-style">
      <span class="el-dropdown-link">
        <a @click="goAnchor('#community', 'community')"
          >{{ $t("header.community") }}
          <el-icon class="el-icon--down arrow">
            <arrow-down /> </el-icon
        ></a>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <a
              target="_blank"
              href="https://theopendao.notion.site/Open-DAO-687ee5f27633438c8629735a43372f20"
              >Notion</a
            >
          </el-dropdown-item>
          <el-dropdown-item divided
            ><a target="_blank" href="https://forum.theopendao.com"
              >Forum</a
            ></el-dropdown-item
          >
          <el-dropdown-item divided
            ><a target="_blank" href="https://snapshot.org/#/theopendao.eth"
              >Snapshot</a
            ></el-dropdown-item
          >
          <!-- po -->
          <el-dropdown-item divided
            ><a target="_blank" href="https://discord.gg/the-opendao-917822256657350678"
              >Discord</a
            ></el-dropdown-item
          >
          <el-dropdown-item divided
            ><a target="_blank" href="https://twitter.com/The_OpenDAO"
              >Twitter</a
            ></el-dropdown-item
          >
          <el-dropdown-item divided
            ><a target="_blank" href="https://t.me/theopendao_official"
              >Telegram</a
            ></el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown class="dropdwon-style">
      <span class="el-dropdown-link"
        ><a @click="goAnchor('#how-to-buy', 'how-to-buy')"
          >$SOS
          <el-icon class="el-icon--down arrow">
            <arrow-down /> </el-icon></a
      ></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <a @click="goAnchor('#staking', 'staking')">{{
              $t("header.staking")
            }}</a>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <a @click="goAnchor('#how-to-buy', 'how-to-buy')">{{
              $t("header.buy")
            }}</a>
          </el-dropdown-item>
          <el-dropdown-item divided
            ><a
              target="_blank"
              href="https://etherscan.io/token/0x3b484b82567a09e2588A13D54D032153f0c0aEe0"
              >Etherscan</a
            ></el-dropdown-item
          >
          <el-dropdown-item divided>
            <a target="_blank" href="https://www.certik.com/projects/opendao">
              {{ $t("header.audit") }}
            </a>
          </el-dropdown-item>

          <!--<el-dropdown-item class="coming-place" divided disabled
            >SOSMarket
            <div class="coming-label">coming soon</div>
          </el-dropdown-item>
          <el-dropdown-item class="coming-place" divided disabled
            >Mintstarter
            <div class="coming-label">coming soon</div>
          </el-dropdown-item>-->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="dropdwon-style">
      <span class="el-dropdown-link">
        <router-link to="/claim">{{ $t("common.membership") }}</router-link>
      </span>
      <!-- <br />
      <span class="coming-soon">{{ $t('header.coming') }}</span> -->
    </div>
    <div class="dropdwon-style">
      <span class="el-dropdown-link">
        <a @click="goAnchor('#multi-signer', 'multi-signer')">{{
          $t("multi.title")
        }}</a>
      </span>
      <!-- <br />
      <span class="coming-soon">{{ $t('header.coming') }}</span> -->
    </div>
  </div>
</template>

<script setup lang="ts" scoped>
import { onMounted, reactive, ref, computed } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { goAnchor } from "@/utils/index";
const data = reactive({
  dropList: [
    {
      title: "SOS Chain Network",
      list: [
        { link: "", el: "Bridges", disable: false },
        { link: "", el: "DEX", disable: true },
        { link: "", el: "Lending", disable: true },
        { link: "", el: "Marketplace", disable: true },
      ],
    },
    { title: "Marketplace", list: [] },
    { title: "Staking", list: [] },
    {
      title: "Community",
      list: [
        { link: "", el: "Notion", disable: false },
        { link: "", el: "Forum", disable: false },
        { link: "", el: "Snapshot", disable: false },
        { link: "", el: "Discord", disable: false },
        { link: "", el: "Twitter", disable: false },
        { link: "", el: "YouTube", disable: true },
      ],
    },
    {
      title: "$SOS",
      list: [
        { link: "", el: "Etherscan", disable: false },
        { link: "", el: "Audit", disable: true },
      ],
    },
  ],
});
</script>

<style lang="scss">
@media only screen and (max-width: 1440px) {
  html:lang(zh_CN) .dropdwon-style {
    margin: 0 20px;
  }
  html:lang(zh_TW) .dropdwon-style {
    margin: 0 20px;
  }
  html:lang(thai) .dropdwon-style {
    margin: 0 20px;
  }
  html:lang(en) .dropdwon-style {
    margin: 0 12px;
  }
  html:lang(it) .dropdwon-style {
    margin: 0 12px;
  }
  html:lang(kr) .dropdwon-style {
    margin: 0 15px;
  }
  html:lang(tk) .dropdwon-style {
    margin: 0 15px;
  }
  html:lang(ro) .dropdwon-style {
    margin: 0 11px;
  }
  html:lang(fr) .dropdwon-style {
    margin: 0 10px;
  }
  html:lang(es) .dropdwon-style {
    margin: 0 11px;
  }
  html:lang(jp) .dropdwon-style {
    margin: 0 12px;
  }
  html:lang(de) .dropdwon-style {
    margin: 0 5px;
  }
  html:lang(rs) .dropdwon-style {
    margin: 0 5px;
  }
}
@media only screen and (min-width: 1440px) {
  html:lang(kr) .dropdwon-style {
    margin: 0 30px;
  }
  html:lang(zh_CN) .dropdwon-style {
    margin: 0 30px;
  }
  html:lang(zh_TW) .dropdwon-style {
    margin: 0 30px;
  }
  html:lang(thai) .dropdwon-style {
    margin: 0 30px;
  }
  html:lang(de) .dropdwon-style {
    margin: 0 15px;
  }
  html:lang(rs) .dropdwon-style {
    margin: 0 15px;
  }
}
.dropdwon-style {
  margin: 0 20px;
  display: inline-block;
  .el-dropdown-link {
    font-size: 18px;
    font-family: D-DIN;
    font-weight: bold;
    color: #ffffff;
  }
}
.drop-dsiable {
  cursor: not-allowed;
  position: relative;
  span {
    display: inline-block;
    opacity: 0.6;
  }
  .coming-soon {
    width: 100%;
    text-align: center;
    font-size: 14px;
    position: absolute;
    top: 40px;
    color: rgba(200, 200, 200, 0.4);
  }
}
</style>
