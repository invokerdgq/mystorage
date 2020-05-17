import { View, Text, Image ,Icon} from '@tarojs/components'
import './navGap.scss'

export default function navGap (Components1) {
  console.log('ksafjksajfklsjdafkljaskljflkasjflkasjfklasjfklasdjfklj');
  return class navGap extends Components1{
    constructor(props){
      super(props)
    }
    test(){}
    render () { // 不支持 render 劫持 真坑！！！
      return(
        <View>
          <View className="nav-gap-top">
            <Text>分类</Text>
          </View>
        </View>

      )
    }
  }
}
