import Vue from 'vue'
import Human from 'vue-human'
import totalSuits from 'vue-human/suits/total'
import DocsLayoutPage from '../components/layout/page'
import './app.scss'

Vue.use(Human)

Human.addComponent(DocsLayoutPage)
Human.addSuits(totalSuits)
