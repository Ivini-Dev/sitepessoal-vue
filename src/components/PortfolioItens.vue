<template>
  <section id="portfolio-wrapper" class="cf">
    <Swiper
      :modules="modules"
      effect="coverflow"
      :grab-cursor="true"
      :centered-slides="true"
      :slides-per-view="'auto'"
      :loop="true"
      :coverflow-effect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }"
      :navigation="true"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 4500, disableOnInteraction: false }"
    >
      <SwiperSlide
        class="portfolio-item"
        v-for="item in itens"
        :key="item.title"
      >
        <div class="item-wrap">
          <a :title="item.title">
            <img :src="item.imagem" :alt="item.title" />
            <div class="overlay">
              <div class="portfolio-item-meta">
                <p class="title">{{ item.title }}</p>
                <p>{{ item.descricao }}</p>
                <p>
                  <a :href="item.url" target="__blank" v-show="item.url ? true : false">
                    <i class="fa fa-link"></i>
                    Visualizar
                  </a>
                </p>
                <p><em>{{ item.tags }}</em></p>
              </div>
            </div>
          </a>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      itens: [],
      modules: [EffectCoverflow, Autoplay, Navigation, Pagination],
      urlApi: process.env.VUE_APP_API_URL || ''
    };
  },
  mounted() {
    fetch(this.urlApi + "/api/portfolio")
      .then(response => response.json())
      .then(data => {
        this.itens = data;
      })
      .catch(error => console.log(error));
  }
};
</script>