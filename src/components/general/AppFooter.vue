<template>
  <section class="footer hero">
    <div class="hero-body">
      <div class="social-icons">
        <div class="container">
          Share it! 
          <a href="#" target="_blank">
            <svg style="width:32px;height:32px" viewBox="0 0 24 24">
                <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
            </svg>
          </a>
          <a href="#" target="_blank">
            <svg style="width:32px;height:32px" viewBox="0 0 24 24">
                <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
            </svg>
          </a>
          <a href="#" target="_blank">
            <svg style="width:32px;height:32px" viewBox="0 0 24 24">
                <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
            </svg>
          </a>
          <a href="#" target="_blank">
            <svg style="width:32px;height:32px" viewBox="0 0 24 24">
              <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" />
            </svg>
          </a>
          <a href="#" target="_blank">
            <svg style="width:32px;height:32px" viewBox="0 0 24 24">
              <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
            </svg>
          </a>
        </div>
      </div>
      <div class="footer-links-wrapper">
        <div class="container">
          <div class="columns">
            <div class="footer-links column" v-for="menu in footerMenuLinks">
              <ul>
                <h3 v-html="menu.heading"></h3>
                <li v-for="item in menu.links"><a :href="item.href">{{item.name}}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="copy">
        <div class="container">
          Copyright 2010-2017 <a href="//thedailysource.org" target="_blank">The Daily Source</a> All Rights Reserved.  <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.footer {
  padding: 0;

  .hero-body {
    padding: 0;
  }
}

.copy {
  text-align: center;
  display: block;
  padding: 20px 0;
  background-color: $color-dark-gray;
  color: $white;
}

.social-icons {
  background-color: $color-light-gray;
  color: $color-medium-gray;
  border-bottom: 1px solid $color-silver;
  padding: 30px 0;
  font-size: 24px;
  font-style: italic;

  @include breakpoint($desktop) {
    border-bottom: none;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    line-height: 20px;
  }

  a {
    margin: 0 5px;
  }

  svg {
    path {
      fill: $color-silver;
      transition: fill 0.2s ease-in-out;
    }

    &:hover {
      path {
        fill: $color-medium-gray;
      }
    }
  }
}

.footer-links-wrapper {
  padding: 20px 0;
  background-color: rgba($color-dark-gray, 0.95);
}

.footer-links {
  h3 {
    color: $white;
    font-size: 24px;
    margin-bottom: 10px;
  }

  ul {
    font-size: 14px;
    margin: 10px 0 20px;
  }

  a {
    color: $white;

    &:hover {
      text-decoration: underline;
    }
  }
}

</style>

<script>
export default {
  computed: {
    footerMenuLinks () {
      return this.$store.state.common.footerMenuLinks
    }
  }
}
</script>
