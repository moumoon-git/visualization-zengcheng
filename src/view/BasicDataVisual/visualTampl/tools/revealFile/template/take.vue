<template>
  <div class="productionList_Wrap">
    <div class="productionList_content" v-for="(item,index) in data" :key='index' @click="clickSelect(item,index)" >
      <!--iconImg IconActive -->
        <span :class="item.flag? 'IconActive':'iconImg'"></span>
        <div class="content" >
          <h3>{{item.name}}</h3>
          <p>{{item.address}}</p>
          <p>{{item.acreage}}</p>
          <p>
            负责人：
            <span v-if="item.principalName">
              {{item.principalName}}
              <span style="position:relative;top:10px;">
                <el-tooltip class="item" effect="dark" content="发短信" placement="top">
                  <img
                    @click="sendSms(item)"
                    style="cursor: pointer;"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAD20lEQVRYhaWXXYhNURTH//tjLve6ykf5fOBNIYmUF0lR8nolz/LiI96MTNPkO6Z5oCghhfJ08y2ZFA9TeFESkUdFSh5mblfu2XvrnHvOad1117kzw6rd+djr7P3ba6299jqq/jWCIIq8UqybP09FAtMJ7JqLFSZT7F569y8wQWiKw1EgDqDZlcNNB4g3nzYKk8BlQByENsP6wKC42aW+DCgDcameJ+87LMRhDGlWsFIRTBEUBXLpeFGq54h+4C7LYGza+tKrKXAXnYyC6AI9l7ZWqkt3VAJmBetkIHErpVdD+iUXcOtotgCq22Lvsz4xhgwBmnG3pJffLqkBKGzp4Z6pSgz5dWWEsyeb7imD0RkUBdLMZX23S+okFDbN8njg2tZKxAMhKITkykAVoDSgVGhbIb6P9TTgfmus+WBxGcAK4j5DLATLgpVDLYyVbjbcecH8Lo0Bx2JIk7jT5Du/b5bZ+0NjD9kwXZuFBh/f6mZmwMe4o1Y1N95ZNZ/FEs9NUsvH3F01ZxKYgM9sHArdlVc6BvmjUAUwAYV5x8v6Xn/F7BICtkiS/lNls60227xoKWxAwGu0x5TSSHJPLdSl4IFF8cf1cbdzjsejLwb7a1Vz5Y1VcycL5C9GVXZWzfBbi0EEvK2Pu+2rHJ4DWMKMAMllRTkm3qKV2P/XG254cxSOQGHFubJ+cKxsdrAclO+aobLZ2l/Ro0Fh45oIJ+oT7lD8/rvGMpKVxV3LExgHyiQJ4ENNP3ax4beUPB5/shisVc21JyW9IJvkYUkvqlXN1fcWp3XA6GDTbxtqusdp8EfpAsHOsQ7hpz1Y9g0EKHle6kPrTsMNnSubJ28sLl2foZ69NuZwC7CfLEZi5XURDg403ViPo4aPn0svIJqB6dZOVtffdGPftFp/sKJH3ltcSL98erXhjs4LeV7pAHJsDAmKAgU+qfBM7/1iH6L6hDtwrGy29gGt4033Mu2b7DDmIPm9ZQqBlQTUQpJeonum6UYLJuwACt3f8pqoy2W8ZimyGC+yaBan0rG1fbHL8nEtm4CWCfFzH7EQN7EUA3RCxWEtME7OLhGKu8x3WEi1+4fLZi1beazgfbdFctFCJv+lsJoskLstByqs6OZ73PqpMfDK4kbRxNOUCAH3yUnfBRT/BtFKkVaLWV0kVYvUNZL0qi6zijEi1UIG53gMKWFHTbV8zaTo4KVeiAS3eeoyRZSlFRX9AhUBQdh5PCzoVcxD1AVZcstgpd+f6QjfTY7AdfTxTA3iuuydVLdMFwYClHh8UAvx31qeaf8XSILiwF1nGYfjk/+Py3pBtgXAX7tr7Hp4jZJhAAAAAElFTkSuQmCC"
                    alt
                  />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="电话" placement="top">
                  <img
                    @click.stop="callPhone(item)"
                    style="cursor: pointer;"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAE4klEQVRYha2Yf2iVVRjHv885773v7u5Go1UUq0C2fihUKPmP0R9mEf1T4SVM7ceYWTDDmiIlFDbDsI1orcIyLDLBLb2MIpJhUWOhRpRWNipK0SIkS6Xd3V1333NOnJf3ncdzz3t3kw48nL3nnh+f93me8zzPO8r/HmCGRlV+VjMtrrV5jnlk9XDAKGNcWWP/CwhZIGSNmSAq4fALAjJBzANZ9MwcMMoSaR1uQttQiZAu0zCHuEBkJFSDhmY0pWdMiDUQC4+EGZpxgcgaQWQ1f7JByILwImHWG2kRFgwch5gQZMBIe67tI6Y29G9p3T+a5cv+ZlivJ2UltmyfEFsiEGFpxPW20phLSZrxLE2YMKE22rO8c5xh/TUCnb5C6bCHt+9v4JcMFMQLAAIHiG0WYZwRRGNk9dMqj9t5jjqSomYN0SqwZnNRfNY9KQ7cEmB5mbCyP8NuMEyXirQXSkeWP5Jr5MPReMowL3P4HGDZ3nZY/qrP1gI42VMUw9FmfM2k+A4Ke0c8escAMYG814piQPe5Br47GuOGOCN1UhwJ/1aEBSmFT3Fug/D3fEGsyzXyQ+/5rO3Bs/LITp9d9TWnubE5MgqFVoE3fuXozzXykXvK6r6HSvJ4ZCY7HFSA2EChcDXt8dMb7PBZm554hcSU3uMgp3lHOZ6xvOMYgKMAZo0xagXwW0L6SAQ559EKv5QIc027nmDkD6VpW0rho9vL8i893lMUewDsMfaQ7/vsysE0DUNhaGNR7E8CiJvprGZQCm/CokC9AsLs0RRdHG/0Uh27F0DDQEF0W443re4AoME0DZHCkDZjuobEyIwJFTmksyR/BPBzXx17Mx6fLdUPesG3Hl2UkItwjJN/Y4AndxfE0zNEXTJBbE2YAShYVVIPA2jbkOGL9JyOkhyDwvcbM+xdx3UMN24VqrRhUow68owLguAwjbRE3FaWf7YIPHvYQ++XHjXpeTsmxGMAWlZkeZcjLrgOdEmFRlz+EWtFR8KgX8cFhf09GfZJdD3FXWW18gzDsifqebuZnw551NSR5V2r6/lSRzlhm3Jai3GpWBHM7GipJdfID0DhZL4glut5mzJ84TceNnOFvbcKtWsK5O3z0K+DYHQjgwUBHl87KQ4C4VXXUo4kMBOnWbPa2bcidOtnHcgA/JEfF0v0mtEUXdrns24QZgHINEvs3DohNIxcmuVPTTE80Czx3NYJsS0BRCSBJMGE/RlCZkUD/wrAqfy4uDtePMapYYLA5wfqtGFaua6e33mE4+XLBVa9XhR5B0iYCKvFEdNP4sXlJoXJwXExTy/INfLPd/msRc+bI9Q/8wN1yi6WeoviY67w1gmOHsf1dd4aF4wNEtrZA87mx8VCKIwOpOnD1fV8iVUonbePINwBhX3VAlrSd43LeT0jpcc976rni49z9Oq8cl2AvvYp+cW1QhX1odvr2NUfpEgXUZc9X5Q3zRGqYJjF9BFVDQQJMLHEz0yngD6fvQjCzVBhcvsphNXPwOlNRbn4+mSIiltTK4wtScWO7W/m4YEdPF3Z19yIjM3McWnUFtVAYEfqhOrfWQbYMHGT1lu68gwZ8EkwFRC1gCQBkQVV7dMUxsH2japZI0kwdiVul5mwtFJx8IVqxASwIeLDZ/r3hW0u5yfnf23mZqZPuGBsTVY2AP8ChXtUJKSdmwwAAAAASUVORK5CYII="
                    alt
                  />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="会议" placement="top">
                  <img
                    @click="createMeeting(item)"
                    style="cursor: pointer;"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAFaElEQVRYha1YbYhUVRh+3nPuzN7ZnRU/clOxtoLcfihihBsbpViQ/RCyMcwiqUz/iCFSWmiIJBgZSUVEYAapJegQBmL/LNFCLEIUi9K1dNXNDLWZdmZn7j0n7uy52zuvd3ZN9sC7995zzz33med93o+7lO8JcBODhnjE3syG0fD+x1oSRwhQls1ZMTeiYEgYn+NgbIPzEQMjgShnjcAYZxD3RgQMB6UZmNjiEYMgdj3ibuJsaGGKaSR6eegsmosj44ZBDQeGuycGknLPee6aGCsRgKp71jYQdcOhhlvAmNEMRPqER2NyWb0316q7c1n92V8KzdE8A1vnylyrrtnNgpGijVmJXuiv99VOECbMCLAShJnLmvWH0TyAJrcuxdjT+UKoIksQ/rBgJIiYkZR7WRMI00cbfL2uFB6FxfcgPMDANAmWtBA/JUVkkmaSwlgzMDV2OgOsPuLhjVxWTwXh7seqdoUDYITFWgmZmGVOSmQmCQhnxYt/8epSeOTeAFt8i2sPBdj4Ytn84u4lmRS9Sshf4LUpSSMe2zhyQSTSzJIWvfaqwuOw6AHQX5sntN0VYtvmvnAbgLKbj6ziIixwFjKWDGfLG4IRycrgr7uqML/N4MvZgT1IA+vsnhQ91a2xGMAOkVuGy9rxtZWake7h4uXWt6Bi9z1cNRdjV59T+sC3GpMd6BiISgBCDEidfmI3KSFWzSKn5qJ3M/r+wxrPhsBtIHQAKMLi0uDmhDtqfy1OC4Ga2uzAKOYL4Tzmuip3mydaAwmoxkYuq98D4VEAZ32DU5MNDpWA8T5Q8i3KfYSsAY41AcU/CRMtYELApIG/my3+qBLIzVfcnnHpUKyoktSMBKJzWb0dhK45Vfv88rL5meeQKwR/u69mvtRnvhtk4b9fWrO3MrqrPbTdC/vNSSdozwlZCSJs5CbiL+chvLxFL+5V2PRcv507r2IuOxA1MFsyevYhD68BuAJgzIKKXbeo35yIAf2qqeXVjHofhAyAUaMNdn78T/gmgJKzsog0o4S66yKqV2E9LPbNq5heKcQIyASD/flC+ELK4vieNK3hrL7jqyUgjM8XwgULK3bpVYVnDqboVpGN60StBAhpfleI3Ym1xOJ8L6Fjf1q1VwntKYszPILaDC5Exy/SasphTbOiG2NtnXuuq1HDVu1R1hbrIDjLF8NlvsXlrWlaOc7gh13FcANbgw2lcO/UAFt3pOmVHoXOVWUzf2pgC8ILdUOJF113flzRdFlLjno0dlNGPzLJ4nSzxcU2g/NvZ/Sss4qa43VbMvpBAoxvcW6cxcn9nur8yFfTGrxvAF2+J5DZNs646VxW7wJhRr4QdtXNt+o9ANpg0e0ipAWE25XFid3FcO2aZr3wlMbTkSsBXKvtT2iPSkm+EHYwEVec1cqEJ6qnYUezvN+u+MCnH5/M6o27i+HrDnQUsm1zq/blpWVzLNbIuox+4icPi6Lo+F2hAxbH88VwFev++nOt+itZjzgzHgMSW9zDhnOq5q9Dnl50zMPnuVY9bUqIT+4x9rfogVOK7jyQogsWpFOw9pLCxGi/b1J0SxXIRixE52WiKAFWz6janMdykGwlEOeZpIQ3WLH3ptWkT9O0GYRO5xabkEVT7rzkKjzcWsUKYjVfCO9jFX0wx0R78drEAamkai2SY6MCyAUasxAwd1VEshtsJ7ibuG7A3MVZ0CyVDwWE72UEoICxUacdCUZ+CfJN5QecBJLEjGxBA1G76jST1APHgLjAFNMHb6aTQMi9ZJQmdnmyubJiE2ILucjRwDVJ/5GwgnUrwA3JjMyKHIwEMRQjSftd19nJY6PPWw6C97J83AgYCSgJ4MAA8C9IEUFPQyqzUAAAAABJRU5ErkJggg=="
                    alt
                  />
                </el-tooltip>
              </span>
            </span>
          </p>
          <p>联系电话:{{item.principalPhone}}</p>
        </div>
    </div>
    <smsDialog ref="smsDialog"></smsDialog>
  </div>
</template>

<script>
import smsDialog from '../../../tools/resourceViewDialog/smsDialog';
  export default{
    name:'take',
    components: {
      smsDialog
    },
    data () {
      return{
        data:''
      }
    },
    methods: {
      clickSelect(item,index) {
        this.data.forEach(ele=>{
          ele.flag = false
        })
        item.flag = true
        this.$emit('clickSelects',{data:item,ind:index,type:'bn'})
      },
      init (arrData) {
        console.log(arrData)
        arrData.forEach(ele=>{
          ele.flag = false
        })
        this.data = arrData
      },
      sendSms(data) {
        let self = this
        this.$nextTick(_ => {
          self.$refs.smsDialog.init(data)
        })
      }
    },
    mounted () {

    }
  }
</script>

<style scoped>
h3,p{
  margin: 0;
  padding: 0;
}
.productionList_content{
  padding: 20px;
  background:url("../../../../../../assets/images/cszh/bor.png")no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  display: flex;
}
.iconImg{
  display: inline-block;
  width:34px;
  height:40px;
  margin-right: 19px;
  background:url("../../../../../../assets/images/cszh/take.png")no-repeat;
  background-size: 100% 100%;
}
.IconActive{
  display: inline-block;
  width:34px;
  height:40px;
  margin-right: 19px;
  background:url("../../../../../../assets/images/cszh/take1.png")no-repeat;
  background-size: 100% 100%;
}
.content>h3{
  font-size:16px;
  font-weight:400;
  color:rgba(0,242,255,1);
  margin-top:5px;
}
.content>p{
  width: 200px;
  font-size:14px;
  font-weight:300;
  color:rgba(255,255,255,1);
  margin-top: 8px;
}
.productionList_from{
  width:200px;
  margin-left: 40px;
  border: 1px solid rgba(188,208,247,0.15);
}
.productionList_from>h3{
  font-size:16px;
  font-weight:normal;
  color:rgba(0,242,255,1);
  display: flex;
  height:29px;
  line-height: 29px;
  background:rgba(18,47,142,1);
}
.productionList_from>h3>span{
  display: block;
  flex: 1;
  text-align: center;
}
.productionList_from p{
  font-size:14px;
  font-weight:300;
  color:rgba(255,255,255,1);
  border-bottom: 1px solid #BCD0F7;
  display: flex;
}
.productionList_from span{
  flex: 1;
  display: block;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.productionList_from>div{
  height: 107px;
}

</style>
