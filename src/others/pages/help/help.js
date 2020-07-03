import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import NavGap from "../../../components/nav-gap/nav-gap";
import S from '@/spx'
import api from '@/api'
import { AtCountdown } from "taro-ui";
import { calcTimer } from '@/utils'
import {cdn} from '@/consts/index'
import Taro, { Component } from '@tarojs/taro'

import './help.scss'
export default class Help extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View>

      </View>
    )
  }
}
