import Vue from 'vue'
import VueHuman from 'vue-human'
import components from 'vue-human/suits/total'
import DocsLayoutPage from '../components/layout/page'
import './app.scss'

Vue.use(VueHuman)

VueHuman.add(components)
VueHuman.add(DocsLayoutPage, 'docs-layout-page')
