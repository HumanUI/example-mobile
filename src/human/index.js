import Vue from 'vue'
import Human from 'vue-human'
import totalSuits from 'vue-human/suits/total'
// import LoadingIcon from 'vue-human/components/loading-icon/loading-icon'
// import customLoadingIcon from './loading-icon'
import DocsLayoutPage from '../components/layout/page'
import './app.scss'

// Use Human
Vue.use(Human)

// Custom loading icon
// Vue.use(LoadingIcon, { icon: customLoadingIcon })

// Use Human Suits
Vue.use(totalSuits)

// For Global Application
Vue.component(DocsLayoutPage.name, DocsLayoutPage)
