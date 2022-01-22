<template>
  <section class="section membership-detail">
    <div class="tier">
      <div class="title">NEWTON'S CRADLE</div>
      <div class="content">
        <img src="@/assets/images/claim/tier-4.png" />
        <div class="info">
          <div class="sub-title">Tier 4 | Newton's Cradle</div>
          <div class="desc">
            A physics phenomenon known as the conservation of momentum and conservation of energy is demonstrated here. The Torus shown in this piece symbolises OpenDAO as both the
            driver and vehicle of change for all participants within the ecosystem. By shifting and transmitting energy through to all parts of the DAO, we can maximise growth and
            momentum while preserving energy for key moments of high velocity wave action.
          </div>
        </div>
      </div>
    </div>

    <div class="tier">
      <div class="title">SINGULARITY</div>
      <div class="content">
        <img src="@/assets/images/claim/tier-3.png" />
        <div class="info">
          <div class="sub-title">Tier 3 | Singularity</div>
          <div class="desc">
            This work symbolises the coming together of numerous ideas and energies as they vibrate across spacetime connecting via networks, both physical and ethereal. It has the
            visual elements of molecular forms and alludes to synaptic hive mind activity as the particle lights up in various sectors before forming the OpenDAO torus insignia.
            Out of the chaos we find harmony, intention, focus and direction. Using decentralisation and distributed energy we find the building blocks for a better tomorrow,
            together.
          </div>
        </div>
      </div>
    </div>

    <div class="tier">
      <div class="title">TRAJECTORY</div>
      <div class="content">
        <img src="@/assets/images/claim/tier-2.png" />
        <div class="info">
          <div class="sub-title">Tier 2 | Trajectory</div>
          <div class="desc">
            Sights are clearly set on a shared inclusive future, one that is filled with dynamic art forms and technological concepts, this piece displays the digitized and forward
            focus torus in an ascending flight path moving in a never-ending progression towards its highest self.
          </div>
        </div>
      </div>
    </div>

    <div class="tier">
      <div class="title">DISRUPTOR</div>
      <div class="content">
        <img src="@/assets/images/claim/tier-1.png" />
        <div class="info">
          <div class="sub-title">Tier 1 | Disruptor</div>
          <div class="desc">
            We celebrate the high energy disruptors that are energised and mobilised in shaking up the long held conventional ways. We all move at different rhythms and timescales,
            but in crucial moments we align and focus on our common goals. This piece acts as a signal beacon to all that heed the call for a more decentralised and shared world.
            The 3 spinning rings symbolise the energy, frequency and vibration that runs through all of us.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts" scoped></script>

<style lang="scss">
.membership-detail {
  .tier {
    .title {
      font-size: 40px;
      font-weight: bold;
      color: #ffffff;
      line-height: 205px;
      background-image: url(@/assets/images/claim/title-bg.png);
      background-position: center center;
      background-repeat: no-repeat;
      text-align: center;
      background-size: auto 60%;
    }
    .content {
      display: flex;
      padding: 40px 0;
      img {
        width: 300px;
      }
      .info {
        padding: 50px;
        .sub-title {
          font-size: 24px;
          font-weight: bold;
          color: #ffffff;
          line-height: 32px;
        }
        .desc {
          font-size: 18px;

          font-weight: 400;
          color: #b8b8b8;
          line-height: 27px;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .membership-detail {
    .tier {
      .title {
        font-size: 30px;
      }
      .content {
        flex-direction: column;
        align-items: center;
        img {
          width: 80vw;
        }
      }
    }
  }
}
</style>
