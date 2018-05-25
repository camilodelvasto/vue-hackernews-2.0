<template>
  <div class="nonprofit-irs-data__wrapper">
    <div class="nonprofit-extended">
      <div class="container">
        <h2>About <span class="all-caps" v-html="nonprofit.NAME"></span></h2>
        <div class="columns">
          <div class="column is-7">
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
                          <td><p v-html="nonprofit.CLASSIFICATION"></p></td>
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
        </div>
      <SharingIconsRow :key="$route.fullPath" :route-path="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script>
import SharingIconsRow from "Components/general/SharingIconsRow.vue"

export default {
	props: [ "nonprofit" ],
	components: {
		SharingIconsRow
	}
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

.nonprofit-description {
  margin-bottom: 30px;
  font-size: 20px;
  line-height: 1.5;

  @include breakpoint($tablet) {
    padding: 0 70px;
  }

  &__manage-cta {
    display: flex;
    height: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    button {
      font-size: 1.1rem;
    }
  }
}


</style>
