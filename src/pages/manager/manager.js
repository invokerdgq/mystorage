import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Picker ,Image} from '@tarojs/components'
import NavGap from "../../components/nav-gap/nav-gap";
import MemberlistItem from "./comps/member-list-item";
import GiftpackItem from "./comps/gift-pack-item";


export default class Manager extends Component{
  constructor(props) {
    super(props)
    this.state = {
      nextMemberList:[],
      giftPackList:[
        {inviteCode: 1234,isDisabled:false,isUsed: false},
        {inviteCode: 1233,isDisabled:false,isUsed: false},
        {inviteCode: 1235,isDisabled:false,isUsed: false},
        {inviteCode: 1236,isDisabled:false,isUsed: false},
        {inviteCode: 1237,isDisabled:false,isUsed: false},
        ],
      info:null
    }
  }
  componentDidMount() {
      this.setState({
        info:{
          url:'',
          user_name:'戴国庆'
        }
      })
  }
  render() {
    const { nextMemberList, giftPackList } = this.state
     return(
       <View>
          <NavGap
           title="管理中心"
          />
          <View className="manager-center-container">
            <View className='manager-selfinfo'>
               {/*<Image src={info.url}/>*/}
               <Text>
                 {info.user_name}
               </Text>
               <Icon/>
            </View>
            <View className="manager-info-body">
                {
                  nextMemberList.length&&
                  <View className="next-container">
                  <Text>直属成员</Text>
                  <View className='next-item'>
                    {
                      nextMemberList.map((item, index) => {
                        return (
                          <MemberlistItem info={item}/>
                        )
                      })
                    }
                  </View>
                </View>
                }
                {
                  giftPackList.length&&
                <View className='gift-container'>
                  <Text>礼包列表</Text>
                  <View className='gift-item'>
                    {
                      giftPackList.map((item,index) => {
                        return (
                          <GiftpackItem info={item}/>
                        )
                      })
                    }
                  </View>
                </View>
                }
            </View>

          </View>
       </View>
     )
  }
}
