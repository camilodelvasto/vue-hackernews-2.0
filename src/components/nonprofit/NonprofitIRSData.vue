<template>
  <div class="nonprofit-irs-data__wrapper">
    <div class="nonprofit-extended">
      <div class="container">
        <div class="columns">
          <div class="column is-7">
            <h2>About <span class="all-caps">{{nonprofit.NAME}}</span></h2>
            <div class="nonprofit-data-section__irs-data">
              <div class="container">
                <div class="columns">
                  <div class="column is-9">
                    <table>
                      <tbody>
                        <tr>
                          <th><p>Deductibility:</p></th>
                          <td><p>501(c)({{nonprofit.SUBSECTION}}) nonprofit. Donations are 100% deductible</p></td>
                        </tr>
                        <tr>
                          <th><p>Classification:</p></th>
                          <td><p>{{nonprofit.CLASSIFICATION}}</p></td>
                        </tr>
                        <tr>
                          <th><p>Type/Activity:</p></th>
                          <td><p>{{nonprofit.NTEE_CD.length > 1 ? nonprofit.NTEE_CD : nonprofit.ACTIVITY}}</p></td>
                        </tr>
                        <tr>
                          <th><p>Address:</p></th>
                          <td><p>
                                <span v-html="nonprofit.STREET"></span>,
                                <span v-html="nonprofit.CITY"></span>,
                                <span v-html="nonprofit.STATE"></span>,
                                <span v-html="nonprofit.ZIP"></span>,
                          </p></td>
                        </tr>
                        <tr>
                          <th><p>Employer ID Number (EIN):</p></th>
                          <td><p>{{nonprofit.EIN}}</p></td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="helper-text">
                      *Data from IRS.gov
                    </div>
                  </div>
                  <div class="column is-3">
                    <div class="nonprofit-description__manage-cta">
                      <button class="button is-medium is-rounded">Claim this organization</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="nonprofit-extended__media column is-5-desktop" v-if="nonprofit.data.about">
            <div class="nonprofit-extended__icon">
              <Icons iconwidth="24px" iconheight="24px" icon="camera" color="#f0f0f0" class="icon"/>
              <span><a>{{nonprofit.data.media.length}} Photos and videos</a></span>
            </div>
            <flickity ref="main-carousel" class="nonprofit-extended__media-wrapper" :options="nonprofitMediaCarouselOptions">
              <div class="nonprofit-extended__media-item" v-for="(item, index) in nonprofit.data.media"
                :style="`background-image: url(${item.src})`" v-if="item.type === 'image'">
              </div>
            </flickity>
          </div>
        </div>
        <SharingIconsRow />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'nonprofit' ]
}
</script>

<style scoped lang="scss">
.nonprofit-extended {
  background-color: rgba($color-light-gray, 0.35);
  padding-top: 40px;
  padding-bottom: 20px;
  margin-bottom: 40px;

  .helper-text {
    font-size: 12px;
  }

  &__separator {
    padding-top: 60px;
    border-top: 1px solid $color-light-gray;
    max-width: 60%;
    margin: auto;
  }
  &__icon {
    display: flex;
    flex-direction: row;
    align-content: center;

    .icon {
      width: 30px;
      text-align: center;
      display: block;
    }
  }
  &__media {
    margin-bottom: 20px;

    .icon {
      margin-bottom: 20px;
    }
  }
  &__about {
    @include breakpoint($tablet) {
      width: 50%;
    }
    @include breakpoint($widescreen) {
      width: 66.66667%;
    }
  }
  &__icons {
    @include breakpoint($tablet) {
      width: 50%;
    }
    @include breakpoint($widescreen) {
      width: 33.33333%;
    }
  }
  &__media-wrapper {
    width: calc(100vw);
    height: calc(100vw*3/4);
    overflow: hidden;
    transform: translateX(-20px);

    @include breakpoint($tablet) {
      transform: translateX(0);
      width: calc(100%);
      height: 0;
      padding-bottom: 25%;
    }
  }
  &__media-item {
    width: 100vw;
    height: calc(100vw*3/4);
    background-size: cover;
    background-position: center;

    @include breakpoint($tablet) {
      width: calc(990px*0.4166667/3);
      height: calc(990px*0.4166667/3*3/4);
      border-right: 4px solid $white;
    }
    @include breakpoint($widescreen) {
      width: calc(1140px*0.4166667/3);
      height: calc(1140px*0.4166667/3*3/4);
      border-right: 4px solid $white;
    }
  }
  &__share-figure {
    margin: 30px 0;

    img {
      width: 100%;
    }
  }

  th {
    padding-right: 20px;
  }
}

</style>
