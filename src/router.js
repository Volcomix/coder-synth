import Vue from 'vue'
import Router from 'vue-router'
import Song from './views/Song'
import songs from './music/songs'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
        name: 'song',
        params: {
          songName: Object.keys(songs)[0],
        },
      },
    },
    {
      path: '/:songName/:trackName?',
      name: 'song',
      component: Song,
    },
  ],
})
