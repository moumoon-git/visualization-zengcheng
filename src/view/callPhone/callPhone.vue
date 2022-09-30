<template>
    <div class="wrap" id="move_Big_Wrap" >
<!--状态显示-->
<!--线路异常-->
     <div v-show="allTypeFlag.abnormalFlag"   id="abnormals" class="abnormal" ></div>

<!--未接来电-->
     <div id="answers" @click="_weijie(1)"  v-if="MissedData.length!=0" class="answer" >
       <div class="answer_content" >
         <span v-if="MissedData.length!=0">{{MissedData.length}}</span>
       </div>
     </div>

<!--未摘机  -->
     <div  v-show="allTypeFlag.notpPickFlag" id="notpPicks" class="notpPick">
         <div class="notpPick_wrap" id="notpPick_wrap" >
           <h5 class="notpPick_header" ><div class="sdfo" ></div>未摘机 <div class="colse" @click="close" ></div></h5>
           <div class="notpPick_content" >
             <span>请摘机后再拨号</span>
           </div>
           <div class="moves" >

           </div>
         </div>
     </div>

<!--准备呼出或者已呼出的交互-->
<!--已摘机  -->
      <div v-show="allTypeFlag.machineFlag" class="machine" id="machines" >
        <div class="machines_wrap" id="machines_wrap" >
          <h5><div class="machine_img"></div>已摘机</h5>
          <div class="wsdac">
            <div class="machine_call_img" @click.stop="callNum($event)" ></div>
<!--            <h4>已摘机</h4>-->
            <p>请点击联系人或直接拨号</p>
          </div>
          <div class="moves"></div>
        </div>
      </div>

<!--拨号键盘  -->
      <div v-show="allTypeFlag.dialFlag" class="dial" id="dial" style="top: 0px !important;">
        <div class="dial_wrap" id="dial_wrap" >
          <h5> <div class="imgxs" ></div> 请拨号  <div class="smk"></div></h5>
          <input class="diaInp" type="text" v-model="phoneNum" >
          <div class="diaNumWrap" >
            <div class="diaNum" v-for="(item, index) in dialArr" :key="index" @click="dialings(item)" >{{item}}</div>
          </div>
          <div class="dialing" @click="dialingPhone" ></div>
          <div class="delPhoneNum" @click="delPhoneNums" ></div>

          <div class="moves" ></div>
        </div>
      </div>

<!--呼叫和通话状态  -->
       <div  v-show="allTypeFlag.expiration_OutFlag" class="expiration_Out" id="expiration_Out" >
         <div class="expiration" id="expiration" >
           <h5>
             <!--        呼叫中   -->
             <img v-show="dialThreeType.callOut" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAwIDIwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTU1LjQsMTI5LjFjLTE5LjItMTcuMy0yOC4xLTEyLjItMzguNS0zbC0xLjUsMS4zYzAsMC01LjgsMS42LTI2LjMtMjFsLTAuNy0wLjhDNjguNiw4My42LDY5LjgsNzgsNjkuOCw3OA0KCWwxLjUtMS4zYzEwLjYtOSwxNy40LTE3LjYsMS45LTM5QzY3LjUsMzAsNjEuOCwyNS45LDU1LjYsMjUuMWMtOS0wLjktMTYuMSw1LjUtMjEuNywxMC43bC0yLjYsMi40Yy00LDMuOS02LjIsOS4yLTYuMiwxNC44DQoJYy0wLjksMTUuNCw4LjMsNDQuNywzNyw3Ni44YzIyLjUsMjQuNyw1NC4zLDQ1LjMsNzQuNyw0NS4zYzQuNywwLjIsOS4yLTEuMywxMi45LTQuMmwyLjctMi4zYzYtNC45LDEzLjQtMTEsMTMuOC0yMC4zDQoJQzE2Ni4xLDE0Mi4xLDE2Mi42LDEzNS42LDE1NS40LDEyOS4xTDE1NS40LDEyOS4xeiBNMTQ2LDE2MGwtMi45LDIuNGMtNi4yLDUuMi0zOC45LTEuOS03My41LTQwLjVjLTI0LjgtMjcuNC0zNS01NC4yLTM0LjItNjguNA0KCWMtMC4xLTIuNSwwLjctNSwyLjMtNi45bDIuOC0yLjVjNC40LTQsOC45LTgsMTMuMi04aDAuOGMzLjIsMC40LDYuOSwzLjEsMTAuMyw4LjJjMTAuNiwxNC42LDcuOSwxNywwLDIzLjhsLTEuNiwxLjQNCgljLTIuMywxLjktMy42LDQuOC0zLjgsNy44Yy0wLjMsNS4zLDEuOCwxNC4xLDIwLjYsMzUuM2wwLjcsMC44YzIwLjMsMjIuNiwzMi45LDI5LjUsNDAuOSwyMi43bDEuNi0xLjRjNy45LTYuOSwxMS4xLTkuOCwyNS4zLDIuOQ0KCWM0LjYsNC4xLDYuOSw3LjgsNi45LDEwLjZDMTU1LjUsMTUyLjIsMTUwLjQsMTU2LjMsMTQ2LDE2MEwxNDYsMTYweiIvPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xMTcuMyw3MC4zYy00LjksMC00LjctNS40LDAtNS40aDM5LjNjMS4zLDAsMi4xLDAuOSwyLjEsMi4yDQoJYzAsMS40LTAuOCwzLjItMi4xLDMuMWgtMzkuM1Y3MC4zeiIvPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xMzQuOSw4OS40Yy0xLTEtMS0yLjYsMC0zLjZsMTcuOC0xOC4zbC0xNi45LTE4LjMNCgljLTEtMS0xLTIuNS0wLjEtMy41YzAuOS0wLjksMi41LTAuOSwzLjUsMC4xbDE5LjIsMTkuNmMwLjksMSwxLDIuNiwwLDMuNWwtMjAuMiwyMC41QzEzNy40LDkwLjQsMTM1LjgsOTAuNCwxMzQuOSw4OS40TDEzNC45LDg5LjR6DQoJIi8+DQo8L3N2Zz4NCg==" alt="">
             <span v-show="dialThreeType.callOut" >呼叫中</span>
             <!--             来电-->
             <img v-show="dialThreeType.incoming" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAwIDIwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTU1LjQsMTI5LjFjLTE5LjItMTcuMy0yOC4xLTEyLjItMzguNS0zbC0xLjUsMS4zYzAsMC01LjgsMS42LTI2LjMtMjFsLTAuNy0wLjhDNjguNiw4My42LDY5LjgsNzgsNjkuOCw3OA0KCWwxLjUtMS4zYzEwLjYtOSwxNy40LTE3LjYsMS45LTM5QzY3LjUsMzAsNjEuOCwyNS45LDU1LjYsMjUuMWMtOS0wLjktMTYuMSw1LjUtMjEuNywxMC43bC0yLjYsMi40Yy00LDMuOS02LjIsOS4yLTYuMiwxNC44DQoJYy0wLjksMTUuNCw4LjMsNDQuNywzNyw3Ni44YzIyLjUsMjQuNyw1NC4zLDQ1LjMsNzQuNyw0NS4zYzQuNywwLjIsOS4yLTEuMywxMi45LTQuMmwyLjctMi4zYzYtNC45LDEzLjQtMTEsMTMuOC0yMC4zDQoJQzE2Ni4xLDE0Mi4xLDE2Mi42LDEzNS42LDE1NS40LDEyOS4xTDE1NS40LDEyOS4xeiBNMTQ2LDE2MGwtMi45LDIuNGMtNi4yLDUuMi0zOC45LTEuOS03My41LTQwLjVjLTI0LjgtMjcuNC0zNS01NC4yLTM0LjItNjguNA0KCWMtMC4xLTIuNSwwLjctNSwyLjMtNi45bDIuOC0yLjVjNC40LTQsOC45LTgsMTMuMi04aDAuOGMzLjIsMC40LDYuOSwzLjEsMTAuMyw4LjJjMTAuNiwxNC42LDcuOSwxNywwLDIzLjhsLTEuNiwxLjQNCgljLTIuMywxLjktMy42LDQuOC0zLjgsNy44Yy0wLjMsNS4zLDEuOCwxNC4xLDIwLjYsMzUuM2wwLjcsMC44YzIwLjMsMjIuNiwzMi45LDI5LjUsNDAuOSwyMi43bDEuNi0xLjRjNy45LTYuOSwxMS4xLTkuOCwyNS4zLDIuOQ0KCWM0LjYsNC4xLDYuOSw3LjgsNi45LDEwLjZDMTU1LjUsMTUyLjIsMTUwLjQsMTU2LjMsMTQ2LDE2MEwxNDYsMTYweiIvPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNTUuNSw3MC4zaC0zOS4zYy0xLjMsMC0yLjEtMS44LTIuMS0zLjFjMC0xLjQsMC44LTIuMiwyLjEtMi4yDQoJaDM5LjNDMTYwLjMsNjQuOSwxNjAuNSw3MC4zLDE1NS41LDcwLjNMMTU1LjUsNzAuM3oiLz4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTM4LDg5LjRjLTEsMS0yLjUsMS0zLjUsMGwtMjAuMi0yMC41Yy0wLjktMS0wLjktMi41LDAtMy41DQoJbDE5LjItMTkuNmMxLTEsMi41LTEsMy41LTAuMWMwLjksMSwwLjksMi41LTAuMSwzLjVMMTIwLDY3LjVsMTgsMTguM0MxMzksODYuOCwxMzksODguNCwxMzgsODkuNEwxMzgsODkuNHoiLz4NCjwvc3ZnPg0K" alt="">
             <span v-show="dialThreeType.incoming" >来电</span>
             <!--             通话中-->
             <img v-show="dialThreeType.beBusy" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAwIDIwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTU1LjQsMTI5LjFjLTE5LjItMTcuMy0yOC4xLTEyLjItMzguNS0zbC0xLjUsMS4zYzAsMC01LjgsMS42LTI2LjMtMjFsLTAuNy0wLjhDNjguNiw4My42LDY5LjgsNzgsNjkuOCw3OA0KCWwxLjUtMS4zYzEwLjYtOSwxNy40LTE3LjYsMS45LTM5QzY3LjUsMzAsNjEuOCwyNS45LDU1LjYsMjUuMWMtOS0wLjktMTYuMSw1LjUtMjEuNywxMC43bC0yLjYsMi40Yy00LDMuOS02LjIsOS4yLTYuMiwxNC44DQoJYy0wLjksMTUuNCw4LjMsNDQuNywzNyw3Ni44YzIyLjUsMjQuNyw1NC4zLDQ1LjMsNzQuNyw0NS4zYzQuNywwLjIsOS4yLTEuMywxMi45LTQuMmwyLjctMi4zYzYtNC45LDEzLjQtMTEsMTMuOC0yMC4zDQoJQzE2Ni4xLDE0Mi4xLDE2Mi42LDEzNS42LDE1NS40LDEyOS4xTDE1NS40LDEyOS4xeiBNMTQ2LDE2MGwtMi45LDIuNGMtNi4yLDUuMi0zOC45LTEuOS03My41LTQwLjVjLTI0LjgtMjcuNC0zNS01NC4yLTM0LjItNjguNA0KCWMtMC4xLTIuNSwwLjctNSwyLjMtNi45bDIuOC0yLjVjNC40LTQsOC45LTgsMTMuMi04aDAuOGMzLjIsMC40LDYuOSwzLjEsMTAuMyw4LjJjMTAuNiwxNC42LDcuOSwxNywwLDIzLjhsLTEuNiwxLjQNCgljLTIuMywxLjktMy42LDQuOC0zLjgsNy44Yy0wLjMsNS4zLDEuOCwxNC4xLDIwLjYsMzUuM2wwLjcsMC44YzIwLjMsMjIuNiwzMi45LDI5LjUsNDAuOSwyMi43bDEuNi0xLjRjNy45LTYuOSwxMS4xLTkuOCwyNS4zLDIuOQ0KCWM0LjYsNC4xLDYuOSw3LjgsNi45LDEwLjZDMTU1LjUsMTUyLjIsMTUwLjQsMTU2LjMsMTQ2LDE2MEwxNDYsMTYweiIvPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTE3MC44LDk0LjZjLTAuNiwxLjctMS4xLDIuOC0yLjIsMy4zYy0xLjEsMC42LTIuMiwxLjEtMy4zLDEuMWgtMS4xYy0xLjctMC42LTIuOC0xLjEtMy45LTIuMg0KCWMtMS4xLTEuMS0xLjEtMi44LTAuNi00LjRjMi4yLTExLjYsMC0yMy43LTYuNi0zNC4yYy02LjYtOS45LTE3LjEtMTcuMS0yOS4yLTE5LjNjLTEuNy0wLjYtMi44LTEuMS0zLjktMi4yDQoJYy0xLjEtMS4xLTEuMS0yLjgtMC42LTQuNGMwLjYtMi44LDIuOC00LjQsNS41LTQuNGgxLjFDMTU3LDMzLjksMTc2LjksNjMuNywxNzAuOCw5NC42TDE3MC44LDk0LjZ6Ii8+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTQ2LDYyLjZjNi4xLDguOCw4LjMsMTkuOSw2LjEsMzAuM2MtMC42LDEuNy0xLjEsMi44LTIuMiwzLjNjLTEuMSwwLjYtMi4yLDEuMS0zLjMsMS4xaC0xLjENCgljLTIuOC0wLjYtNS0zLjMtNC40LTYuNmMxLjctNy43LDAtMTUuNC00LjQtMjIuMWMtNC40LTYuNi0xMS0xMS0xOC44LTEyLjdjLTMuMy0wLjYtNS0zLjktNC40LTYuNmMwLjYtMi44LDIuOC00LjQsNi4xLTQuNGgxLjENCglDMTMwLjUsNDcuMiwxMzkuOSw1My4yLDE0Niw2Mi42TDE0Niw2Mi42eiIvPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTEzMy4zLDkxLjNjLTAuNiwxLjctMS4xLDIuOC0yLjIsMy4zYy0xLjcsMS4xLTIuOCwxLjEtMy45LDEuMWgtMS4xYy0xLjctMC42LTIuOC0xLjEtMy45LTIuMg0KCXMtMS4xLTIuOC0wLjYtNC40YzAuNi0zLjMsMC02LjYtMS43LTkuOWMtMi4yLTIuOC01LTUtOC4zLTUuNWMtMS43LTAuNi0yLjgtMS4xLTMuOS0yLjJzLTEuMS0yLjgtMC42LTQuNGMwLjYtMi44LDIuOC00LjQsNi4xLTQuNA0KCWgxLjFDMTI3LjIsNjUuNCwxMzYsNzguMSwxMzMuMyw5MS4zTDEzMy4zLDkxLjN6Ii8+DQo8L3N2Zz4NCg==" alt="">
             <span v-show="dialThreeType.beBusy" >通话中</span>
              <!--             通话结束-->
             <img  v-show="dialThreeType.over" style="transform: rotate(132deg);" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAwIDIwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTU1LjQsMTI5LjFjLTE5LjItMTcuMy0yOC4xLTEyLjItMzguNS0zbC0xLjUsMS4zYzAsMC01LjgsMS42LTI2LjMtMjFsLTAuNy0wLjhDNjguNiw4My42LDY5LjgsNzgsNjkuOCw3OA0KCWwxLjUtMS4zYzEwLjYtOSwxNy40LTE3LjYsMS45LTM5QzY3LjUsMzAsNjEuOCwyNS45LDU1LjYsMjUuMWMtOS0wLjktMTYuMSw1LjUtMjEuNywxMC43bC0yLjYsMi40Yy00LDMuOS02LjIsOS4yLTYuMiwxNC44DQoJYy0wLjksMTUuNCw4LjMsNDQuNywzNyw3Ni44YzIyLjUsMjQuNyw1NC4zLDQ1LjMsNzQuNyw0NS4zYzQuNywwLjIsOS4yLTEuMywxMi45LTQuMmwyLjctMi4zYzYtNC45LDEzLjQtMTEsMTMuOC0yMC4zDQoJQzE2Ni4xLDE0Mi4xLDE2Mi42LDEzNS42LDE1NS40LDEyOS4xTDE1NS40LDEyOS4xeiBNMTQ2LDE2MGwtMi45LDIuNGMtNi4yLDUuMi0zOC45LTEuOS03My41LTQwLjVjLTI0LjgtMjcuNC0zNS01NC4yLTM0LjItNjguNA0KCWMtMC4xLTIuNSwwLjctNSwyLjMtNi45bDIuOC0yLjVjNC40LTQsOC45LTgsMTMuMi04aDAuOGMzLjIsMC40LDYuOSwzLjEsMTAuMyw4LjJjMTAuNiwxNC42LDcuOSwxNywwLDIzLjhsLTEuNiwxLjQNCgljLTIuMywxLjktMy42LDQuOC0zLjgsNy44Yy0wLjMsNS4zLDEuOCwxNC4xLDIwLjYsMzUuM2wwLjcsMC44YzIwLjMsMjIuNiwzMi45LDI5LjUsNDAuOSwyMi43bDEuNi0xLjRjNy45LTYuOSwxMS4xLTkuOCwyNS4zLDIuOQ0KCWM0LjYsNC4xLDYuOSw3LjgsNi45LDEwLjZDMTU1LjUsMTUyLjIsMTUwLjQsMTU2LjMsMTQ2LDE2MEwxNDYsMTYweiIvPg0KPC9zdmc+DQo=" alt="">
             <span v-show="dialThreeType.over" >通话结束</span>
           </h5>
           <!-- 通讯录联系人  -->
           <div  class="known" >
             <div v-show="humanList.known" class="known_top">
               <img v-if="contactInfo.images" :src="contactInfo.images.indexOf('http')===-1?baseUrl+contactInfo.images:contactInfo.images" alt="">
               <img v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABUCAYAAAA7xZEpAAANbUlEQVR4Xu2cCXgURRaAX/XM5OBOCOEKSgJJQMgFiIRAGFh0E1GOgPlUQJJVYVUQF9YTVlgE11VQ+XZxEYUkghFdFQG5giwhChLkyB3ClZAgEGJIyDlXd+3riRkmYZKZqe7OfN+u9X18TGaq3nv1d9Wr6tevmkAHlATtcC0B7iEKEEUoBAEh3rfV0nJKaTb+fpSnsPuTjOwzHWBSmyqIUsofifTz7OzuvQAoeZYQCHRUD6WQBmBannwk/ydH28hZTxEg86JDoglHthAgg5iMpVRAMEuSM3LWM7WX0Eh2IPOiw97gOFguwSar2QRfEJPuT1uOFl2VRZ4DQmQDotWC2p+GfoL+4TEH9DpcBf1LFSHk1aT07A8dbiShomxAErRh21DYbAm2tN+U0v8YCb9gW3r+BcV0oGBZgCRMCH0Nr+IaJQ01y6ZgpIRuEBoMqz85cbZSCX2SgcwbFzKSU3OZaJxKCQNtyqTQgFNpk6CTH4xkIDhVdqCQ6R0Gw0oRrkQ1QIUPVEbhnc0/5t+UwwZJQMS9Rhe3nrdw4mnkMIZdBq2jAnzM86b3th4tKGWXI9GHPKYN8vEAzwopBsjc1oRT6RgBeoES4xvJ6WdLnJUvaYSIyhK1oWXI1c9ZxQrXrzfyhsBt3xdec1aPZCBPTBg+Q0VUXzurWMn6AggLU9JzN7DokAxk/siRGn0XwxaOcHNYDJC7DcLYhjDmssqVBCRBe084+tMkVB7OaoCc7SjQQ261mthNp04ZWeUyA5k3flgUp1LtR//RhVW53O1MQEO2pufkSZHLBGRuaGhntTfgFpr0sVbep28vuH7NdYsOrjCpyUdyJN0+MAFJnBCSCITbYg1Do9HA+/98HVKSvoITx7OkXCSH2vb07g5eXl3hwsUrt+vj1l7PC71Tf8itckiIjUpsQLSha3F0LLWW17u3D6x5+yXzVxfOFcO+PemQk30W8Kqx2maznYeHG0zS3gsPPTgOvtmVDmnfiXcNVkwEYXZyRm4qq1ImILhdfwsbvmytNHjoIHjxlQUt7KiuqoETmVmQdTofLpy/DIIgMNnp1aMrDBrkB0ODBsLo0cOhcycPs5zde76HHQjFuggU3ks5kr2ESRE2YgKSGB06DziSbK10TGQEPPXHtkMhjY06KL18FcrLK6C2ph4a6huhvr4BGhoa8XMDUN6EoRQCnp4e0L17F+jj2xP69+8FA/x6Q7eunW3279Dhn+DT7ejXrUcIpdvRjzDHZJiAJESHhBCOy7E2JGaKFmbFP8h2YXgjcEad020zf8qHDz9utSek9LOkIzmPOy3s1wZMQMS2idow0XH1aFb82Jxp8Lv7o9jsYARSUFgMa9/f1nLKCHRtSkbOi2yGME6ZJiCh32Dzac2Kn100F0aMCmGzA6cLZ2x0um1p2XVYufqjVkCEOSkZuZ86LUzyCJkQ+jxOektUfNmKReAfMIDNDkYgVei0l75iFZjHZZdv1PeVEk1jnjILHx7tX1+rv9RMYN365dC9RzdGIGw+xGTiYf5zb1p0Dhlyd8VLLz05mQRMa+HfnDGKGQh/eX/Sm6s2JFy6WAocPnfYlPSWM3pb1mX0IaKQRUvW4mrVNN2WvZyIy/OAauC5CDJ0RgmLQUxA9Bf3hKjV6uy0fRnki+3fgnfPHvD2u6+x6G9qwzhlxKYrVm+CsrJyGDbUH5a+8OsNNyGbSNDMlpsiB61jAoKjYzE61PdrbtXCt7sPga+vD0x+YJyDKm1UkzBCikuuQn7BJRgfFW7ev5gLIcUIJIDFIDYgpfuX4jNb3L7LVCSMEJsWEK6cBMW1uPF01FImIKaSfXGEcF85qsRuPQkjxKZsjhwjgTOZNkVMQGjxYQ+BGEpw49/bbmcdqSA3EOASSHBciiOqW9dhAiIKMRbv0+LqshM/Mq61VqbICYSoUknQDOaYCDMQsTt1xXv6eKrUz+EjxqfxT/bRIgcQQg4A0fyLBE4VLxJzkQSkWStfkrYFCE1ktkK6U6UkeBbHrN+qoTxAStP+gpGgVcwGSQVCoIYEzerOrF9uIKaS/TMxlvEls0FSpwzhfsBldjyzfrmBUPQlAqd2+imZxQ6pQFTccjI4TpZ0DFmmjNgx/vKBk/jfSKarJGXKEMxrVKlHk0HTRP2Si3xAStOWoB9Zx2SRlBFCyCXcprMl99kwVjYg9OzOroKnRwnqsMpBdRCPBCA8cPPVwXEto0QOqrVVTTYg5mlTcuDPuHt9x2l7WKcMIRdxdAx2Wl87DWQFQs/vdRc0qkyEEuaUkQwjBJ/2UAx0TySBcUec0mWnsqxARF20LC1QEOhxp6YOywjhuFcQxt/lhCHKkh2IKNRQvHeMilMdxI+OPQh3doQQLgX3HQlyw1AMiBlKyd4INafahU8y7WcXOTpCxCWWwAa8tV+kBAxFgYjC60v293UnmJ4NpP1wmmNAMBKteoYEztisFAzFgZh9ysqVnJAw9gW8+fsb/ulmszP2pgwhx0GtTsBoepGSMDoESHMHcCd7ET/bjnPaGyEq9aNk8PTPlYbxGxAbhBVZZWxdyd9GiBUVTJrxpxVnMmljRS/bPqTtZ7s66g6VgtcSv3vGvfc/MWUQxkzsiJh+1Y3qq4HewtQ0Xau0dBs+RE/d4DrvC9UUQ7aE4wkIbxXl562Ij4/nlQSj2JRBEGKaj3hVxSdoLfRQBGIGg4DMxQqInmqgXPCFKkEMgLU0D3chGdSNezw8OPhnpaDIDiSrqKg/x8O9w4cErsQoWrv3NFRXCbQawTRWgslggnK+F9ykYspJ22bhPUxlvd64+IaOHoyLCrshNxhJQAoLC3saBTJOoMIo7EQ4GjsGBfqIRvp4e0H/vo4F4ovOFYIeU23Fbai9ojPyUK0zNVerxxbHsN0JPCZSwFN6dErUiMv2ZLT3u30LrFrn5RWFoVItnmoag1+L/wa2J3xAvz7g7WVJMrJZVUxSfHLNRkh44D7o3tmz3b4Y8WDvzQYDgmu31KHMExyBwwLQHzx0bicnThxW5yikdoGII8BgotMFQmIIpZPxIXL7vWulVUyiGzTwLswabLujp4uKYfG7KTApPAjioke0aTfeQUNlgxHwgjjaN+t6p3EEf0WokO6m73F64kT/NhPa2gSSlVcgpl3icVNpqdtqtQqCAgaCmNhrqyzb+DlknCnEpEYK656JBw3Wb13EXNeqRiMYcITIUMpxZr4aMyZczNG/o9gEkpVfsBXDL7KdbhBTLQcPvBsTa1qqKyuvhIQ3NoLBaIT6xkZIjI2C6NCgO4y8hT6jEX2HnAUPCqyMjYz4a2uZdwDJyjuLI4NKSAeybbZX925wl1+/Fj9mnMqD1Sm7oVGvNwOZGDEUnnhAdE23S4OBhxq9xYnKyoQKwuOxUSO2WwttAeRkTs4QFVHn4txXy6m5WVbf3r7g69MUgzbxPBQUXYDT50th896j4NfLC+ZNmQDendzAXd30VNLAC+hEmU962O8ChWpebRg6ZfTo682VWwDJyis8jD9o7Utir+F/lx9mJneBGxWVcO1GBWRf/Bk+whRtP19vSEAg7ioOvDppgDc7UQPgfwoXmhQTGfGHO4Cczj07Ch2b4m9kEBP0AhDK5StXwWgywc6j2XDwVCHgiUpY8dQjZru8PDVQi9PEpDwN8XACLlzq4AejQsTwxO2dEI6Oz/DvRxW+HHeIX//1YTh/pRzq0Ie8PGcqeHVzLAwrq50YlsRVZ6EFyMmTRT4qd/6aUr6jLeONmGf62uZdFqc6fcK9cN8wh181IieTGqPG1PfhUaMazD4kO/fsk7j7/FhODY7IKr7+C/xjxxHLshsZEgRTx+NdgCsKpbNjxkakmoGcyS88iPuiyR1tx+EzRbD7eJ4FiDemVb44e2pHm2HWh3u/HbFjw+OagOQWGDt6uoh6k/b/CLnFVy1AMDoPqxbEg1rVce9VsKJfERMZ7msGgg5V8cXN1mV/PflbdKZ6CxCxztzYaLjH3/6jHNmHEQVdzNhwT5cBqbxVB2tSD5j71bx1Fz/fPzoUJo0aLnt/7QnEESHERoarXAbk5LlSSD3UtO2xBuLfzxfmT+9wd2a2A6cM3p+7aMp8mXEGjuU3nS6xBqJRq2HV/Hh7F1SR32vKwtQuA7L2i+/gauWtO4CIXzwfHwt9fbwU6XR7Qt11VRqXANEZjLAMN2TNntx6hIgGPzxuJIwNDf7/AXLuyg3YuPt7S4dbAxk5JABmTWoZBugIOi4bIWl4M7f/REGbQLp17gSvzuv41xrVlJ1zjQ/5Bu9wM3Juv46s9Qhx16hh5dMd71hdtsqU42nKdf8+hEGipqPvrYFoRwyD349xLk1N8pTCR4N4x+u6fUh69nnYdazp8KQ1EHF1WTgr5o74q+QO2xNAqRFv7txcssqItomR9A92ZsDFa79YgHC4LVqES24fPNTY0QWDzg0YdO7sMiBih2/iSxHewf1ILb4QQQwyx46NgOjwoR3NokkfpdU4QryagdTiVy4IVQFk4vn9rQczoVePLrBgxv2ugdE0Yq/hBenXHCBaDJz5KbOl4KapjvKgzAsYOdobww1NLwHBIm7SpuAx0wB89OmqQglUx4wJW/9fz7J5ulhZ1/sAAAAASUVORK5CYII=" alt="">
               <div>
                 <p>姓名：{{contactInfo.name}}</p>
                 <p>单位：<span>{{contactInfo.unit}}</span></p>
                 <p>职务：<span>{{contactInfo.duty}}</span></p>
               </div>
             </div>
            <!-- 未知联系人-->
             <div  v-show="humanList.notKnown" class="known_top" >
               <img :src="CallerImages?CallerImages:'data:image/png;base64,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'" alt="">
               <div>
                 <p>姓名：{{name}}</p>
                 <p>单位：<span>{{workUnit}}</span></p>
                 <p>职务：<span>{{position}}</span></p>
                 <!--<p>姓名：未知</p>
                 <p>单位：<span>未知</span></p>
                 <p>职务：<span>未知</span></p>-->
               </div>
             </div>

             <div class="known_bottom" >
               <p class="oneP" >{{phoneNum}}</p>
            <!--通话中-->
               <p v-show="dialThreeType.beBusy||dialThreeType.over" style="margin-bottom:7px;" >{{callDuration}}</p>
            <!--呼进-->
<!--               <p v-show="dialThreeType.incoming" style="margin: 10px 0 0;" class="oneP" >{{phoneNum}}</p>-->
               <img @click="hangUp" v-show="dialThreeType.incoming"  src="data:image/png;base64,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" alt="">
             </div>
           </div>
            <!-- 缩小按钮-->
           <div class="shrink"  v-show="!dialThreeType.over" @click="callNum($event,2)"></div>
           <div class="closeDiv" @click="closeDiv" v-show="dialThreeType.over" ></div>
           <div class="remark" @click="remark"  v-show="dialThreeType.over" ><span>备注</span></div>
           <div class="moves" ></div>
         </div>
       </div>

  <!--缩小后显示  -->
        <div  v-show="allTypeFlag.shrinkDis" class="shrinkDis" id="shrinkDis" >
           <div class="shrink_wrap" id="shrink_wrap" >
             <img v-show="dialThreeType.callOut" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAFhklEQVRYR61WfWxTVRT/3TfmPuhr2RCU4GfECWLQP1CJ4h+oEINoREO7jc9pCAYFEpgRlWgBMSAqBhEkoqCS0b6YiagkEomaICZmxCgGhKh8aGCMoOt7c19de/3dd9tupe3sxm76mnffPef8zv2dc889Aj1HnX05ClALiVkQGAYpv4EQqxDwfpcmN0ATkbITap0A0VXP+YiLbEcB+TgCvp0DhJkyo8FD9jT+13O3hQRqhTTehYFj3PnT/H4zmehEPDYF1WXfDqQDAruax0MYBxPApyFjD6Ky/BcXxGryQBY38O0mOmKjyTsci0VH3g5slYXwOrejynswm45A2FZUT+dzjLTfCX95JE3QarsGMnpKf5Mfkv65eYOH7G3c1BPUC1Jv5cV6ClyBeRHDPFR7P8hqOOw8SQNb3JAEfIPzB3cehZAW5QuyOaDApTYWm45A2e6shrdFymGKC+5a1BiHWZ7DfXBgIR3YSHmDubMOld7nkroK/C9ORiIuZ6LKV5fV6HvnTXiKbHctLqdR7ou8wZVg2FnBnFnNEMieDgiEIl/xLN/HxU2o9C3KMPq1HIRzzvtUnM21TpimF1NzJF3IPky5W3I6luCYCb4UAc8GBf4iwZkM4hAC5vg0xe0nilE6dBe/PaK/yw2M+dKsxnde8KKwsJE7K8kJnqwqhngKM8zNiva7KXyASjFEO67G7GFnU8ph5zECfqxxsYPxqumV7np7KDpiZoaMKFhORhbQhjL0Ehlepd4ELFkA6aijNJLTjdz9kpRyqGUJRPxNzn9jib2xT3FOCoechQTcSCTiYG16wrkJYT/P/zV8zqPZHIkFgiWVw2qZDBnfx7c2huZa+M3zfXIgbM8n4BYCG9zYSm4s7azrKFhneYmUnqRAKaRg4pk68dwKV3SG300a+Zle39pH8B8ozzzKBNa0J0fYfpava0lRBB1tFZhzZZO7FI5MpVjyaC0n/evydiBkV/CMj2KS7s2m0w1usZBI/EEgHwU/I8jDroKUzAtHFR8170LceABVnv15O9CLYDe4Egq1zGGCJUqsUc2zqI4ZoIvM73xjeBBFR9cozC0/fakOpIPrzFcJdi+33IzWjjGoGd7ognz07whcFjvBtyI3NKJgNPwevdbPkQ6ujFitLLVR3nBCXSBHSP/YlG3dcHyvw4F2tJllqBHt/cTukXA9LajmQjDuenTHX83Ctqp2nyTWGiEKeQ2XZIagruUKhrCCjclxVHvOZXMwc+dJKct5gcn2cmL6OhmoTRmwnADXQikGZJyXzRCdhCo/Bhe9QefncTZIy8j9MIzFrBNHejqRGzwoDYxpYcJJPymO88is5pEJppTTGVBhWM9nN8tJmDJXZexUJSrkMpbWt5JrucGVhG6j9vBtkvKfP3ayPRyw/rmNtLKvE94stNaiS+5Bgbyft5iqbMMSTKVKbO/grgN/lkC697d2QMbXo3KIKkh67JVFsFs2kJn5Ls0SZxCT0zHTp6qbHrolV3kyUTsgVrCKrvl/8KQD8O6m0hRtja1RwBdI2626Uo2i63D81K8Iju3MYEI1kz5HdciqU+5CNHp9fuDK0taGQpRVbOHO2BAqfHmSLExCVdnJDKBcHz5lMrYnihWwPH9wZTAYNDC6dhmP0Ksp+0IswpGGdxCc1JWXE5bzEx0fR9nX+gaetG5F7mAIvuR0SIKFH6G6E79XF6BcI2yrtnuH1sFD/QNXyttlMUocdVcrg9qOlKoffBtHD32ewUTIfoZSr1BKnf0DrBv39B88xYI90T3jwITuDcu/+W0fnWFDKZr5TOZaog8Ev7VPgX9446WDJxFDkUoSsIi7u6sX4veg1Kwi4a1KZuDAU0yowjNoBmPAmxE38FHX8FFCbYLh2Qq/iCVF/wNS0PX7eFwhogAAAABJRU5ErkJggg==" alt="">
             <img v-show="dialThreeType.incoming" src="data:image/png;base64,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" alt="">
             <img v-show="dialThreeType.beBusy" src="data:image/png;base64,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" alt="">
             <p v-show="dialThreeType.callOut" >正在呼叫</p>
             <p v-show="dialThreeType.incoming" >呼入</p>
             <p v-show="dialThreeType.beBusy" >{{callDuration}}</p>
             <div class="moves" @click="moveFlag = true" @mouseup="changeBig($event)" @mousemove="moveFlag = false" ></div>
           </div>
        </div>

  <!--未接电话联系人-->
  <div v-show="Missed" class="Missed" id="Missed"  >
    <div class="Missed_wrap" >
      <div class="Missed_wrap_top">
        <div class="disHeader" >未接电话（{{MissedData.length}}）</div>
        <div class="clearBtn" @click="deleteAllWjPhone" >全部清除</div>
      </div>
  <!--人员信息列表-->
      <div class="Missed_wrap_content"  >
          <div class="content_box" v-for="(item, index) in MissedData" :key="index">

             <header class="content_box_header" >
               <p>{{item.phoneCalling}}({{item.count}})</p>
               <!--<p>{{item.mobile1}}({{item.count}})</p>-->
               <p>{{item.startTime}}</p>
               <img @click="deleteWjPhone(item)" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAwIDIwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTAwLDEyMS4ybDQ5LjUsNDkuNWM1LjksNS45LDE1LjMsNS45LDIxLjIsMGM1LjktNS45LDUuOS0xNS4zLDAtMjEuMkwxMjEuMiwxMDBsNDkuNS00OS41DQoJYzUuOS01LjksNS45LTE1LjMsMC0yMS4yYy01LjktNS45LTE1LjMtNS45LTIxLjIsMEwxMDAsNzguOEw1MC41LDI5LjNjLTUuOS01LjktMTUuMy01LjktMjEuMiwwcy01LjksMTUuMywwLDIxLjJsMCwwTDc4LjgsMTAwDQoJbC00OS41LDQ5LjVjLTUuOSw1LjktNS45LDE1LjMsMCwyMS4yczE1LjMsNS45LDIxLjIsMEwxMDAsMTIxLjJMMTAwLDEyMS4yeiIvPg0KPC9zdmc+DQo=" alt="">
             </header>

             <aside class="aside_content" >
               <img  v-if="item.contactId"  src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3209370120,2008812818&fm=26&gp=0.jpg" alt="">
<!--已知联系人-->
               <img v-if="!item.contactId" src="data:image/png;base64,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" alt="">
               <aside v-if="item.contactId" class="human_content">
                <p>姓名：<span>{{item.contactName}}</span></p>
                <p>单位：<span>{{item.workUnit}}</span></p>
                <p>职务：<span>{{item.position}}</span></p>
               </aside>
<!--未知联系人-->
               <aside v-if="!item.contactId" class="human_content" style="flex: 1;padding: 0;justify-content: center;align-items: center;"  >
                 <p>未知联系人</p>
               </aside>

             </aside>
          </div>
      </div>

    </div>
  </div>

      <!-- <relevance ref="relevance" ></relevance> -->

      <platform></platform>
      <topic></topic>
</div>
</template>

<script>
  import Bus from '@/utils/bus.js'
  // eslint-disable-next-line no-unused-vars
  import url from '@/mock/modules/url'
  // import relevance from './relevance'
  import platform from './websokite/platform'
  import topic from './websokite/topic'

  export default {
    name: 'callPhone',
    data () {
      return {
        // 计时器
        setInt: '',
        numsx: 1,
        moveFlag: true,
        flag: true,
        phoneNum: '', // 18898532680  13076890326 13503050480
        name: '',//来电人员
        workUnit: '',//来电单位
        position: '',//来电职务
        callDuration: '00:00',
        CallerImages:'', // 来电联系人头像
        dialArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'],
        contactInfo: {
          name: '',
          unit: '',
          duty: '',
          images: ''
        },
        allTypeFlag: {
          abnormalFlag: false, // 异常
          machineFlag: false, // 已摘机
          notpPickFlag: false, // 未摘机
          dialFlag: false, // 拨号盘
          expiration_OutFlag: false, // 呼入呼出
          shrinkDis: false // 缩小
        },
        dialThreeType: {
          callOut: false, // 呼出
          beBusy: false, // 通话中
          incoming: false, // 呼入
          over: false // 通话结束
        },
        humanList: {
          known: false,
          notKnown: false
        },
        pickFlag: true,
        callState: false,
        callData: '', // 通话数据
        humanData: '',
        detectionFlag: true,
        noPlayFlag: true,  // 判断是否在通话中
        inCallPhoneStatus: false, // 来电
        wejiexx: false,
        Missed: false, // 未接联系人列表
        MissedData: [], // 未接电话联系人
        baseUrl: window.SITE_CONFIG['cloudUrl'],
      }
    },
    mounted () {
      this.allTypeFlag.notpPickFlag = true;
      let that = this;
      console.log(1111)
      // 从全局接受到的电话号码
      Bus.$off('callPhoneData')
      Bus.$on('callPhoneData', (data) => {
        console.log("从全局接受到的电话号码",data)
        that.init(data)
      })
      // 获取并改变电话状态
      Bus.$off('callPhoneStatex')
      Bus.$on('callPhoneStatex', (data) => {
        that.numsx++
        console.log("获取并改变电话状态",data, that.numsx)
        // if(data.cmdType == 'CallingNumberReceived'){
        //   alert(1111)
        // }
        if (data.cmdType == 'GetChannelStatusAck') {
          if (data.status == 0) {
            that.detectionFlag = true
          } else {
            that.detectionFlag = false
          }
        }
        if (that.detectionFlag) {
          if (data.cmdType == 'PortStatusChanged') {
            console.log("PortStatusChanged状态状态状态状态",data)
            // 正常的一到6
            if (data.phoneStatus == 0) {
              //空闲
              if (this.inCallPhoneStatus == 1 || this.inCallPhoneStatus == 2) {
                this.statex(['allTypeFlag', 'expiration_OutFlag'], false, 1)
                this.statex(['dialThreeType', 'incoming'], false, 2)
                this._weijie()
              }
              // 挂机
              this.noPlayFlag = true
              clearInterval(this.setInt)
              console.log('挂机了挂机了挂机了',data.duration,this.callState)
              if (data.duration) {
                if (this.callState) {
                  this.statex(['allTypeFlag', 'expiration_OutFlag'], true, 1)
                  this.statex(['dialThreeType', 'over'], true, 2)
                  this.callData = data
                  // console.log(this.dialThreeType)
                  this.callState = false
                } else {
                  this.statex(['allTypeFlag', 'machineFlag'], false, 1)
                }
              } else {
                console.log("未接挂机未接挂机")
                this._weijie()
                this.statex(['allTypeFlag', 'machineFlag'], false, 1)
              }

            } else if (data.phoneStatus == 1) {
          //  呼叫进入，但是无号码
          //     clearInterval(this.setInt)
          //     this.statex(['allTypeFlag', 'expiration_OutFlag'], true, 1)
          //     this.statex(['dialThreeType', 'incoming'], true, 2)
          //     this.humanListDatx(data.called)
          //     this.callState = true
          //     this.inCallPhoneStatus = 1
          //     this._weijie()
            } else if (data.phoneStatus == 2) {
          //  呼叫进入，带号码，呼出
              clearInterval(this.setInt)
              this.statex(['allTypeFlag', 'expiration_OutFlag'], true, 1)
              this.statex(['dialThreeType', 'incoming'], true, 2)
              this.humanListDatx(data.called)
              this.callState = true
              this.inCallPhoneStatus = 2
              this._weijie()
            } else if (data.phoneStatus == 3) {
          //  外呼中,呼出
              this.statex(['allTypeFlag', 'expiration_OutFlag'], true, 1)
              this.statex(['dialThreeType', 'callOut'], true, 2)
            } else if (data.phoneStatus == 4) {
          // 回铃

            } else if (data.phoneStatus == 5 && this.callState) {
          // 通话中
              this.statex(['allTypeFlag', 'expiration_OutFlag'], true, 1)
              this.statex(['dialThreeType', 'beBusy'], true, 2)
              this.keepTime()
            } else if (data.phoneStatus == 6) {
          // 摘机
              this.statex(['allTypeFlag', 'machineFlag'], true, 1)
              if (!this.pickFlag) {
                let data = this.humanData
                this.init(data)
              }
            }
          } else if (data.cmdType == 'CallReleased') {
        // 挂机
              const _that = this
              setTimeout(()=>{
                _that.noPlayFlag = true
                // console.log('挂机了',data.recordFile)
                clearInterval(this.setInt)
                if (data.duration!=0) {
                  if (_that.callState) {
                    _that.statex(['allTypeFlag', 'expiration_OutFlag'], true, 1)
                    _that.statex(['dialThreeType', 'over'], true, 2)
                    _that.callData = data
                    // console.log(this.dialThreeType)
                    _that.callState = false
                  }
                  // else {
                  //   _that.statex(['allTypeFlag', 'machineFlag'], false, 1)
                  // }
                } else if(data.duration==0&&data.startTime){
                  _that.statex(['allTypeFlag', 'machineFlag'], false, 1)
                  ///setTimeout(()=>{
				            _that.Missed = true
                    _that._weijie()
                  //},200)
                }
              },120)
          } else if (data.cmdType == 'MackeCallAck' && data.callStatus == 0) {
          //呼叫 0 是成功  非0失败
            this.callState = true
          } else if (data.cmdType == 'CallOffered') {
            console.log("data.cmdType == CallOffered")
          //  呼叫进入，带号码
            this.phoneNum = data.calling
            this.statex(['allTypeFlag', 'expiration_OutFlag'], true, 1)
            this.statex(['dialThreeType', 'incoming'], true, 2)
          } else if (data.cmdType == 'CallingNumberReceived' && data.calling) {
            console.log("data.cmdType == CallingNumberReceived")
            this.phoneNum = data.calling
            this.CallerImages = ''
            this.statex(['allTypeFlag', 'expiration_OutFlag'], true, 1)
            this.statex(['dialThreeType', 'incoming'], true, 2)
            //if (!data.mailContactorEntity) return
            if(data.mailContactorEntity != null && data.mailContactorEntity != ''){
              console.log("联系人",data.mailContactorEntity)
              this.name = data.mailContactorEntity.name
              this.workUnit = data.mailContactorEntity.workUnit
              this.position = data.mailContactorEntity.position
              this.CallerImages = data.mailContactorEntity.images
            }else{
              this.name = '陌生人'
              this.workUnit = '未知'
              this.position = '未知'
              this.CallerImages = ''
              return;
            }

          }
        }
      })
      // this.eleEvent('move_Big_Wrap', 'answers')    // 未接
      // this.eleEvent('move_Big_Wrap', 'notpPicks', 'notpPick_wrap', 'moves')  // 未摘机
      // this.eleEvent('move_Big_Wrap', 'abnormals')  // 异常
      // this.eleEvent('move_Big_Wrap', 'machines', 'machines_wrap', 'moves')   // 已摘机
      // this.eleEvent('move_Big_Wrap', 'dial', 'dial_wrap', 'moves')   // 拨号盘
      // this.eleEvent('move_Big_Wrap', 'expiration_Out', 'expiration', 'moves')   // 呼入呼出
      // this.eleEvent('move_Big_Wrap', 'shrinkDis', 'shrink_wrap', 'moves')   // 缩小
      this.getUserInfo() // 拿到用户信息

      setInterval(() => {
        if (localStorage.userPhoneFlag == 'true') {
          // that._detection()
        }
        //console.log('电话线路监测')
      }, 300000)
    },
    methods: {
      init (data) {
        console.log('初始化数据初始化数据初始化数据',data)

        const that = this
        if (this.allTypeFlag.machineFlag || this.allTypeFlag.dialFlag) {
          // data.phoneNum = data.mobile1 ? data.mobile1 : data.mobile2
          this.phoneNum = data.mobile1
          /*查询联系人*/
          this.humanListDat(data.mobile1)
          // 拨出电话  渲染方法
          this.$http({
            url: this.$http.adornUrl(url.callPhone.url),
            method: url.callPhone.method,
            params: this.$http.adornParams({
              phoneNum: Number(data.phoneNum?data.phoneNum:data.mobile1),
              agentId: 0,
              contact_id: data.id
            })
          }).then((data) => {
            if (data && data.data.code === 0) {
              // console.log(data)
              that.allMyFalse(1)
              that.allTypeFlag.expiration_OutFlag = true
              that.dialThreeType.callOut = true
              that.pickFlag = true
              this.noPlayFlag = false
              this.callState = true
            } else {
              this.$message.error(data.msg);
            }
          })
        } else if (!this.noPlayFlag) {
          this.$message.error('正在通话中')
        } else if (this.dialThreeType.over && this.noPlayFlag) {
          this.$message.error('请选择关联事件或者关闭窗口')
        } else {
          this.phoneNum = data.phoneNum
          this.allTypeFlag.notpPickFlag = true
          this.pickFlag = false
          this.humanData = data
        }
      },
      humanListDat (data) {
        console.log("查询联系人查询联系人查询联系人查询联系人查询联系人",data);
        if (!data) {
          this.humanList.known = false
          this.humanList.notKnown = true
          return
        }
        let that = this
        this.$http({
          url: this.$http.adornUrl(url.phoneUserInfoByPhone.url),
          method: url.phoneUserInfoByPhone.method,
          params: this.$http.adornParams({
            phoneNum:data
          })
        }).then((res) => {
          console.log(res)
          if (res.data.mailContactor) {
            let data = res.data.mailContactor
            this.contactInfo = {
              name: data.name,
              unit: data.workUnit,
              duty: data.position,
              images: data.images
            }
            this.humanList.known = true
            this.humanList.notKnown = false
          } else {
            this.name = ''
            this.workUnit = ''
            this.position = ''
            this.humanList.known = false
            this.humanList.notKnown = true
          }
        })
      },
      humanListDatx (data) {
        console.log("humanListDatxhumanListDatxhumanListDatx",data)
        let that = this
        this.$http({
          url: this.$http.adornUrl(url.liknHuman.url),
          method: url.liknHuman.method,
          data: this.$http.adornParams({
            groupId: [],
            search: data,
            limit: 1,
            page: 1
          })
        }).then((res) => {
          console.log("????????????",res)
          if (res.data.data.list.length != 0) {
            //??????
            let data = res.data.data.list[0]
            this.contactInfo = {
              name: data.name,
              unit: data.workUnit,
              duty: data.position,
              images: data.images
            }
            this.humanList.known = true
            this.humanList.notKnown = false
          } else {
            this.contactInfo = {
              name: '',
              unit: '',
              duty: '',
              images: ''
            }
            this.humanList.known = false
            this.humanList.notKnown = true
          }
        })
      },
      statex (data, val, x) {
        const that = this
        if (x == 1) {
          this.allMyFalse(1)
        } else if (x == 2) {
          this.allMyFalse(2)
        }
        that[data[0]][data[1]] = val
      },
      incoming () {
        // 呼入方法

      },
      eleEvent (bigEles, ele, indEle = '', eventEle = '') {
          // 最大的外套  要移动的元素 绑定事件的元素 判断className
        let that = this
        let wrapDiv = document.getElementById(ele)
        let bigEle = document.getElementById(bigEles)
        let tops = '', lefts = ''
        if (indEle) {
          // eslint-disable-next-line no-use-before-define
          let indEles = document.getElementById(indEle)
          indEles.onmousedown = function (e) {
            if (e.target.className == eventEle) {
              that.flag = true
              tops = e.offsetY
              lefts = e.offsetX
              document.documentElement.onmousemove = function (e) {
                if (e.clientX > 0 && e.clientX < window.innerWidth && e.clientY > 0 && e.clientY < window.innerHeight) {
                  if (that.flag) {
                    let topx = '', leftx = ''
                    // let eleHeight = window.innerHeight - parseInt(indEles.offsetHeight)
                    // let eleWidth = window.innerWidth - parseInt(indEles.offsetWidth)
                    // if (wrapDiv.offsetTop < 0) {
                    //   topx = 0
                    // } else if (wrapDiv.offsetTop > eleHeight) {
                    //   topx = eleHeight
                    // } else {
                    topx = e.clientY - tops
                    // }
                    //
                    // if (wrapDiv.offsetLeft < 0) {
                    //   leftx = 0
                    // } else if (wrapDiv.offsetLeft > eleWidth ) {
                    //   leftx = eleWidth
                    // } else {
                    leftx = e.clientX - lefts
                    // }
                    if (tops) {
                      wrapDiv.style.top = e.clientY - tops + 'px'
                      wrapDiv.style.left = e.clientX - lefts + 'px'
                    } else if (lefts) {
                      wrapDiv.style.top = e.clientY - tops + 'px'
                      wrapDiv.style.left = e.clientX - lefts + 'px'
                    } else {
                      wrapDiv.style.top = e.clientY - 300 + 'px'
                      wrapDiv.style.left = e.clientX - lefts + 'px'
                    }
                    bigEle.style.height = '100vh'
                  }
                } else {
                  that.flag = false
                  bigEle.style.height = '0'
                }
              }
            }
          }
        } else {
          wrapDiv.onmousedown = function (e) {
            that.flag = true
            tops = e.offsetY
            lefts = e.offsetX
            document.documentElement.onmousemove = function (e) {
              if (e.clientX > 0 && e.clientX < window.innerWidth && e.clientY > 0 && e.clientY < window.innerHeight) {
                if (that.flag) {
                  if (tops) {
                    wrapDiv.style.top = e.clientY - tops + 'px'
                    wrapDiv.style.left = e.clientX - lefts + 'px'
                  } else if (lefts) {
                    wrapDiv.style.top = e.clientY - tops + 'px'
                    wrapDiv.style.left = e.clientX - lefts + 'px'
                  } else {
                    wrapDiv.style.top = e.clientY - 300 + 'px'
                    wrapDiv.style.left = e.clientX - lefts + 'px'
                  }
                  bigEle.style.height = '100vh'
                }
              } else {
                that.flag = false
                bigEle.style.height = '0'
              }
            }
          }
        }
        document.documentElement.onmouseup = function (e) {
          that.flag = false
          bigEle.style.height = '0'
        }
      },
      callNum (e, ind = '') {
        if (ind == 2) {
          for (let x in this.dialThreeType) {
            if (this.dialThreeType[x]) {
              for (let i in this.allTypeFlag) {
                this.allTypeFlag[i] = false
              }
              this.allTypeFlag.shrinkDis = true
              let shrinkDis = document.getElementById('shrinkDis')
              shrinkDis.style.top = e.target.parentNode.parentNode.offsetTop + 'px'
              shrinkDis.style.left = e.target.parentNode.parentNode.offsetLeft + 'px'
            }
          }
        } else {
          for (let i in this.allTypeFlag) {
            this.allTypeFlag[i] = false
          }
          this.allTypeFlag.dialFlag = true  // 拨号盘
          let dial = document.getElementById('dial')
          dial.style.top = e.target.parentNode.parentNode.parentNode.offsetTop + 'px'
          dial.style.left = e.target.parentNode.parentNode.parentNode.offsetLeft + 'px'
        }
      },
      dialings (item) {
        console.log("点击拨号盘",item,this.phoneNum)
        if(this.phoneNum == undefined){
          this.phoneNum = '';
        }
        this.phoneNum = this.phoneNum + item ;

      },
      dialingPhone () {
        console.log("点击打电话",this.phoneNum)
        // eslint-disable-next-line no-undef
        if (this.checkPhone(this.phoneNum)) {
          let data = {
            mobile1: this.phoneNum
          }
          this.init(data)
          // eslint-disable-next-line no-undef
        } else if (this.checkTel(this.phoneNum)) {
          let data = {
            mobile1: this.phoneNum
          }
          this.init(data)
        } else {
          this.$message.error('电话格式错误')
        }
      },
      delPhoneNums () {
        let arr = this.phoneNum.split('')
        arr.pop()
        this.phoneNum = arr.join('')
      },
      checkPhone (phone) {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
          // alert('手机号码有误，请重填')
          return false
        } else {
          return true
        }
      },
      checkTel (tel) {
        if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)) {
          // alert('固定电话有误，请重填')
          return false
        } else {
          return true
        }
      },
      changeBig (e) {
        if (this.moveFlag) {
          for (let i in this.allTypeFlag) {
            this.allTypeFlag[i] = false
          }
          this.allTypeFlag.expiration_OutFlag = true
          let expiration_Out = document.getElementById('expiration_Out')
          expiration_Out.style.top = e.target.parentNode.parentNode.offsetTop + 'px'
          expiration_Out.style.left = e.target.parentNode.parentNode.offsetLeft + 'px'
        }
      },
      getUserInfo () {
        const that = this
        that.$http({
          url: that.$http.adornUrl(url.userInfo.url),
          method: url.userInfo.method,
          params: that.$http.adornParams()
        }).then(({ data }) => {
          if(data.code === 0) {
            // console.log(that.$store.state.callPhone)
            that.$store.commit('callPhone/userId', data.user.userId)
            // console.log('userInfoData', data, that.$store.state.callPhone.userId)
          }else{
            this.$message.error(data.msg)
          }
        })
      },
      allMyFalse (x) {
        if (x == 1) {
          for (let i in this.allTypeFlag) {
            this.allTypeFlag[i] = false
          }
          // console.log(this.allTypeFlag)
        } else if (x == 2) {
          for (let s in this.dialThreeType) {
            this.dialThreeType[s] = false
          }
          // console.log(this.dialThreeType)
        }
      },
      closeDiv () {
        // console.log('关闭')
        this.statex(['allTypeFlag', 'expiration_OutFlag'], false, 1)
        this.statex(['dialThreeType', 'over'], false, 2)
        this.callDuration = '00:00'
        clearInterval(this.setInt)
        this.setInt = null
      },
      close () {
        this.pickFlag = true
        this.statex(['allTypeFlag', 'notpPickFlag'], false, 1)
      },
      remark () {
        // console.log('备注')
        this.statex(['allTypeFlag', 'expiration_OutFlag'], false, 1)
        this.statex(['dialThreeType', 'over'], false, 2)
        this.statex(['dialThreeType', 'beBusy'], false, 2)
        this.callData.phoneNum = this.phoneNum
        // this.$refs.relevance.init(this.callData)
        this.callDuration = '00:00'
        clearInterval(this.setInt)
        this.setInt = null
      },
      hangUp () {
        const that = this
        // console.log('挂断电话')
        this.$http({
          url: this.$http.adornUrl(url.dropCall.url),
          method: url.dropCall.method,
          params: this.$http.adornParams({
            phoneNum: Number(that.phoneNum),
            agentId: 0,
            contact_id: 0
          })
        }).then((data) => {
          if (data.data && data.data.code === 0) {
            that.statex(['allTypeFlag', 'expiration_OutFlag'], false, 1)
            that.statex(['dialThreeType', 'incoming'], false, 2)
          } else {
            this.$message.error(data.data.msg)
          }
        })
      },
      keepTime () {
        const that = this
        let timeOne = 0
        that.setInt = setInterval(() => {
          timeOne++
          let shi = that._tenNum(parseInt(timeOne / 3600))
          let fen = that._tenNum(parseInt(timeOne / 60 % 60))
          let miao = that._tenNum(parseInt(timeOne % 60))
          // console.log(timeOne, shi, fen, miao)
          if (shi != '00') {
            that.callDuration = shi + ':' + fen + ':' + miao
          } else {
            that.callDuration = fen + ':' + miao
          }
        }, 1000)
      },
      _tenNum (x) {
        if (x < 10) {
          return '0' + x
        } else {
          return x
        }
      },
      _detection () {
        this.$http({
          url: this.$http.adornUrl(url.detection.url),
          method: url.detection.method,
          params: this.$http.adornParams({
            mode: 1
          })
        }).then((data) => {
            if (data.code === 0) {
          // console.log(data)
            } else {
              this.$message.error(data.msg)
            }
        })
      },
      _weijie (data = 0) {

        if (data == 1) {
          this.Missed = !this.Missed
        }
        if (this.Missed) {
          this.$http({
            url: this.$http.adornUrl(url.missCallList.url),
            method: url.missCallList.method,
            params: this.$http.adornParams()
          }).then((res) => {
            console.log("未接来电未接来电未接来电",res)
            if (res.data.data) {
              this.MissedData = res.data.data
            } else {
              this.MissedData = []
              this.$message.error(data.msg)
            }
          })
        }
        // console.log('未接来电')
      },
      deleteAllWjPhone () {
        this.$http({
          url: this.$http.adornUrl(url.deleteAll.url),
          method: url.deleteAll.method,
          params: this.$http.adornParams()
        }).then((res) => {
           if (res.data.code === 0) {
            this.Missed = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      deleteWjPhone (item) {
		  console.log(item)
        this.$http({
          url: this.$http.adornUrl(url.deleteOne.url + '/' + item.phoneCalling),
          method: url.deleteOne.method,
          params: this.$http.adornParams()
        }).then((res) => {
          if (res.data.code === 0) {
            // console.log('删除未接来电', res)
            this._weijie(1)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    components: {
      // relevance,
      platform,
      topic
    }
  }
</script>

<style scoped>
header,aside{
  display: block;
}
.wrap{
  z-index: 99999999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.abnormal{
  /*异常*/
  width: 60px;
  height: 60px;
  position: fixed;
  z-index: 99999999;
  bottom: 300px;
  right: 10px;
  border-radius: 5px;
  background: url("data:image/png;base64,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");
  background-size: 100% 100%;
}
.answer{
  /*未接*/
  position: fixed;
  z-index: 9;
  top: 10px;
  right: 180px;
  width: 38px;
  height: 38px;
  cursor: pointer;
}
.answer_content{
  box-shadow: 1px 4px 8px 2px #cecece;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  position: relative;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAIfUlEQVRoQ+VaCWwUZRR+s9uy3W3RgtzQcJ8FLCCHcsoZuSGiCWkiURMPQKNIBNRAIpEYTPBEiSIqQQ65L5FTlCsIVhEVgQIicl8t7XZ7rt/X3dkZtrs7s3RpB3wJoZmd4//+d33vvV8RypKszqIob4siHcQryaXX7h45L6L8IIX2SZLuOqPI1zntxV68Fxdddw/GUEi8p6DQToosy14DrQ6/u8Gq6JQZiizNugHtJv1PAO8A4Gzv/wMsUXoP3hLgxok2aXevTYqwVfuvFsvl/Dtlz6IE3KumXWa1d8hD99kDRlECrItOF8qrv+bLOY/VgZsEXMUmMj3VIdNaVwlr/TlQd+8dbvn5WomFPcQE4KQ4ZK5uCTKsXpwhkLxikc5bcuX3bKuCNgBcw6HIkged0q+WZsLFsNotF4rki5OFYlMUeblFvDxQXfv9WoFXmm/MlSv433oSAbALGNb2dN0E9nqhV8bt98iaf4sCWGyKyMIuCTK2YXzg2qHrxXL/Zrf18EaK0hObx8v7HRICiz6T55V+37vl6I2y5uqAj+/r75K0ZE3T3JgvTxVaDHQYDcNt5crIJLknHn9AjueUSI/tbrkQIQrXTVDk9LAk4bOULFhD8qqcOwNwWrJNMgYmBhbbf6dbtl1ARDKQkfXjZVV3zSomZuTLh8cKjB6rwN/DaHhw3TjZ0NMZWIiyDOzThFC754YnCYMd5SIISe01VtJyGMAj6sfJ6u4+wG6E5cQV5hedjuC1sKtPyx4YhXOFuc0ysZ8xuCXGGuaKmiTZJHOw5g5mrSMGaEy8IgzgYB9OQ4r5FanGSGjI09o4ZGZbHyO7YzScjOh8bZRWMT57wCPzTkROMQT7UA277Oqr9RHOIpXVX2feHYw2tPy/RyAehwYlllZElHVni2T4rryw3yP5GAHqudLv97yRRUUvcOvdl40to/xAzL4hAuA32znkdX+xQNKREkFT4xrFywKwLVVIKheAej71k8fsSirovgiA+4A/7+ijmWcfaGvnpbLaqopclD1aM3/rguWeRgAcD2u+MaqqOPxscQuIx0AQkGBJhdkfhvmrMvOPAnnjcH4FaSzazxhUS7Pvd8grLX0RNw/5uBqoYn4QlW5Z1SZHHtEAt/g2V46F4NvRLu323G8AmEGLwUsV+uWTQX5ZFRE9CxHdT6ElA+mroyUrJQOTVkFu7Y0SsbbPrq+ixiVVZC9LLx91dMjzzbRuSKct7HxYKToHwqlxE68vgtc2XfBiycfSTy8NnL5KSdUyi/9a2BimJmuJiRYPF6zPyaj6pNbqHGEzQC9s7k1ppWmZXZGBO8Pn7srZCJOAuwcxqF0gEz1RH+vFaVckB+mJJESVZw+CoWVaqQlgEjABLH0wQR5L0do4Y/bkyfIzWquH9zRBvzpziBbkaNLk4b9lWcWfowDcCGBO6sBcQq1LPw2WcY3BujprrKsAacyx3ColYhSACeyZpvHySScNTDg/XQVOPRI1tSq5COtJK61QREQJmO55AlqmtikMWxPgp3OD/JSdj6vIzaSdqjDIkbhUrkQJmIttDmZ1VMesaLIN1+fI+aAGHxuAJCR6OZFbIk035FYi5lsAzNU+nhJX2qBX5RyqqXohqqna6GSeR49LL5kA3azSQN8iYBrquh5OGaIbv/yJ8UqbTWW1R1LyD0hJsKYJ2gwvGVDHLjnIbHuvxCLS3yJgLt4Jtvn30CSp6e9Q8tpWVFQDQlRUKS4wMdyrF45kaoRhY5xSLoMF1YKFqFGARctpd4n0Qv4Pdh/zPlIOwPxIcKqixj5HgfF0iMI/FGg3lNZjm7u04FBlPdrDbBPr+MtNeDjb+gztJpKa6KWcgPnBzhik7ceYRRWCfu9ogbz0S9maOBRoPncoq0SeQ99sPromrRAUzQinIR1AajimNS8xAMyPjUbOXRHUz5pyKF9m/1V26sBAdgxtXH3KCrdgPj/3eKFUr6KAzDikvW52xWdYpLRD3DA/iI8RYJrfeJSHH6BMVIW0kpp+GScDgoX+v76HS/r6y85QgFMB5A/dnLm0UYhRzhLMqjmgV6UU9HcAjUxhLDECzA9xQS80ryJz0jTQkXyaz3SFO2zq7RS2hVW5iHzeFgBIXUNJQwTAAwMSA+Mc3sNzJl23mhnPxhCwCnoiNP1uBw00r2+/WFw6ag0lKLJKg181mK0HEYnjWJKZSFIHbsGSVZ8hnkCN/pXheDbGgLlI6mpUkE/zOs2TWoguyISHTdB/gfGpI136cb21RtT1NgBWQXfDSZ89/W4+zZgNPj34x7yYNedntnXIa220pkNr+P2RiOdLbhNgVS8crP02yCUu2q1fYtm35omDjIHaptJt6D7h5TYD5odpcmuQstjY10sm8uiYvR7JKEez7x20kSf528h8d0u0iEMdydC+WwGAIwUz/rbhXJGk7/OU6ZFFDlu+3L+om1MS/PvIXngrmHTkxmEFAVYXzzHsbvi13sT5G/uB6zGwIyVlK9hIHm0Qh6G7Bpb3D0Fs2IjNiywVDJiLIWmY2tohM1LLnuoj8D1oEH6AcyGrcTSKvDlY3sKQbzK6o7regnwMNjYhw2OiLVwJgFUAqffYZD56X1115zb14BjRmcr+cXvlMLg2TfdhxAHery8sPkUhMf5njxSaOvxXiYBVcJxqzElLCMyijcxZ//t0DO1mHSkwCZZPWgCwCqB/7Th5EYfh2FQIVxrqwY5FoFuMU7zRiYUAqwtnh2QoQA/HP24Cx7Z6+Qa98KmoxJjWohcLAg4GUddpkzqg5ux4sAY24tmWi9LRayWWT/g0fBWvrBbL11r2XYqyjYAXYoHpll1kbBc2WZHF7hSxFR3Ee2vG9t0We5vXe0Bs2b18GWDRtYYSZ38ejeIuFltm+ZejeItEsW+WgsR5kq5k/wd2m9NCMpCtkQAAAABJRU5ErkJggg==");
  background-size: 100% 100%;
}
.answer_content>span{
  position: absolute;
  top: -9px;
  right: -9px;
  width: 19px;
  height: 19px;
  background: red;
  color: #fff;
  font-size: 13px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.notpPick{
  position: fixed;
  z-index: 99999999;
  bottom: 20px;
  right: 10px;
  width:243px;
  height:141px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(201,57,57,1);
  box-shadow:0px 3px 6px rgba(156,31,31,0.36);
  border-radius:5px;
}
.notpPick_wrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.notpPick_header{
  height: 40px;
  text-align: center;
  color: #fff;
  background: #C93939;
  line-height: 40px;
  margin: 0;
  position: relative;
}
.notpPick_content{
  flex: 1;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.sdfo{
  width: 20px;
  height: 20px;
  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAwIDIwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTU1LjQsMTI5LjFjLTE5LjItMTcuMy0yOC4xLTEyLjItMzguNS0zbC0xLjUsMS4zYzAsMC01LjgsMS42LTI2LjMtMjFsLTAuNy0wLjhDNjguNiw4My42LDY5LjgsNzgsNjkuOCw3OA0KCWwxLjUtMS4zYzEwLjYtOSwxNy40LTE3LjYsMS45LTM5QzY3LjUsMzAsNjEuOCwyNS45LDU1LjYsMjUuMWMtOS0wLjktMTYuMSw1LjUtMjEuNywxMC43bC0yLjYsMi40Yy00LDMuOS02LjIsOS4yLTYuMiwxNC44DQoJYy0wLjksMTUuNCw4LjMsNDQuNywzNyw3Ni44YzIyLjUsMjQuNyw1NC4zLDQ1LjMsNzQuNyw0NS4zYzQuNywwLjIsOS4yLTEuMywxMi45LTQuMmwyLjctMi4zYzYtNC45LDEzLjQtMTEsMTMuOC0yMC4zDQoJQzE2Ni4xLDE0Mi4xLDE2Mi42LDEzNS42LDE1NS40LDEyOS4xTDE1NS40LDEyOS4xeiBNMTQ2LDE2MGwtMi45LDIuNGMtNi4yLDUuMi0zOC45LTEuOS03My41LTQwLjVjLTI0LjgtMjcuNC0zNS01NC4yLTM0LjItNjguNA0KCWMtMC4xLTIuNSwwLjctNSwyLjMtNi45bDIuOC0yLjVjNC40LTQsOC45LTgsMTMuMi04aDAuOGMzLjIsMC40LDYuOSwzLjEsMTAuMyw4LjJjMTAuNiwxNC42LDcuOSwxNywwLDIzLjhsLTEuNiwxLjQNCgljLTIuMywxLjktMy42LDQuOC0zLjgsNy44Yy0wLjMsNS4zLDEuOCwxNC4xLDIwLjYsMzUuM2wwLjcsMC44YzIwLjMsMjIuNiwzMi45LDI5LjUsNDAuOSwyMi43bDEuNi0xLjRjNy45LTYuOSwxMS4xLTkuOCwyNS4zLDIuOQ0KCWM0LjYsNC4xLDYuOSw3LjgsNi45LDEwLjZDMTU1LjUsMTUyLjIsMTUwLjQsMTU2LjMsMTQ2LDE2MEwxNDYsMTYweiIvPg0KPC9zdmc+DQo=");
  background-size: 100% 100%;
  position: absolute;
  top: 10px;
  left: 11px;
  transform: rotate(132deg);
}
.colse{
  position: absolute;
  right: 5px;
  top: 5px;
  width: 8px;
  height: 8px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSklEQVQ4T4WTrU4DQRSFdxLqUKAgiDocDhRV4BD8COg78AA8BYoHwEIFP6KSgMDhSCCBkIABh8Mhlu8sZ7bD7NJucnO7c8/57p3pbCjL8rgoii6xH0J4JE988OwgOiRuAi+vBjyQdydB0G+gOyc6ESDaiRfGQjCv2zxN/tVqXlMFGRWy7aDpUb8gZmozmgpgiOinucC1FZvnUrNqNcBCdRGkFvJ7irgkurm5AUi6CRINAiy2mVsBhiyRBzZq6d/D/bOF5DxywBM1/cX3URNzA8BpL7u7tiCjHm3hzZC7FJIf4ipF7X/ehk2L4yF+8L7HJLeNCei8ZvMsWcIthFU3T6U7IPCnIVeqtV0kCWSuuxii6QRRgy+ij2aobyG9yirIXNHzx1MKohv7XUFYfPdoWtgWtc0c17KP6UWAa4oLxAHms3HmBKKpj4jnH+FrmXNIPQvvAAAAAElFTkSuQmCC");
  background-size: 100% 100%;
  z-index: 10;
  cursor: pointer;
}
.notpPick_content>span{
  font-size: 12px;
  color: #C93939;
  transform: scale(0.9);
}
.machine{
  position: fixed;
  z-index: 99999999;
  bottom: 20px;
  right: 10px;
  width:243px;
  height:141px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(0,169,242,1);
  box-shadow:0px 3px 6px rgba(0,169,242,1);
  border-radius:3px;
  overflow: hidden;
}
.machines_wrap{
  position: relative;
  display: flex;
  flex-direction: column;
}
.machines_wrap>h5{
  height: 40px;
  background: #00A9F2;
  text-align: center;
  line-height: 40px;
  margin: 0;
  position: relative;
  color: #fff;
}
.moves{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  top: 0;
  left: 0;
  left: 0;
  bottom: 20%;
}
.wsdac>h4{
  font-size: 12px;
  font-weight: bolder;
  transform: scale(0.98);
}
.wsdac>p{
  font-size: 12px;
  transform: scale(0.98);
}
.machine_img{
  width: 20px;
  height: 20px;
  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAwIDIwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTU1LjQsMTI5LjFjLTE5LjItMTcuMy0yOC4xLTEyLjItMzguNS0zbC0xLjUsMS4zYzAsMC01LjgsMS42LTI2LjMtMjFsLTAuNy0wLjhDNjguNiw4My42LDY5LjgsNzgsNjkuOCw3OA0KCWwxLjUtMS4zYzEwLjYtOSwxNy40LTE3LjYsMS45LTM5QzY3LjUsMzAsNjEuOCwyNS45LDU1LjYsMjUuMWMtOS0wLjktMTYuMSw1LjUtMjEuNywxMC43bC0yLjYsMi40Yy00LDMuOS02LjIsOS4yLTYuMiwxNC44DQoJYy0wLjksMTUuNCw4LjMsNDQuNywzNyw3Ni44YzIyLjUsMjQuNyw1NC4zLDQ1LjMsNzQuNyw0NS4zYzQuNywwLjIsOS4yLTEuMywxMi45LTQuMmwyLjctMi4zYzYtNC45LDEzLjQtMTEsMTMuOC0yMC4zDQoJQzE2Ni4xLDE0Mi4xLDE2Mi42LDEzNS42LDE1NS40LDEyOS4xTDE1NS40LDEyOS4xeiBNMTQ2LDE2MGwtMi45LDIuNGMtNi4yLDUuMi0zOC45LTEuOS03My41LTQwLjVjLTI0LjgtMjcuNC0zNS01NC4yLTM0LjItNjguNA0KCWMtMC4xLTIuNSwwLjctNSwyLjMtNi45bDIuOC0yLjVjNC40LTQsOC45LTgsMTMuMi04aDAuOGMzLjIsMC40LDYuOSwzLjEsMTAuMyw4LjJjMTAuNiwxNC42LDcuOSwxNywwLDIzLjhsLTEuNiwxLjQNCgljLTIuMywxLjktMy42LDQuOC0zLjgsNy44Yy0wLjMsNS4zLDEuOCwxNC4xLDIwLjYsMzUuM2wwLjcsMC44YzIwLjMsMjIuNiwzMi45LDI5LjUsNDAuOSwyMi43bDEuNi0xLjRjNy45LTYuOSwxMS4xLTkuOCwyNS4zLDIuOQ0KCWM0LjYsNC4xLDYuOSw3LjgsNi45LDEwLjZDMTU1LjUsMTUyLjIsMTUwLjQsMTU2LjMsMTQ2LDE2MEwxNDYsMTYweiIvPg0KPC9zdmc+DQo=");
  background-size: 100% 100%;
  position: absolute;
  z-index: 5;
  top: 10px;
  left: 12px;
}
.wsdac{
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.machine_call_img{
  width: 30px;
  height: 30px;
  z-index: 70;
  background: url("data:image/png;base64,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");
  background-size: 100% 100%;
  margin-top: 19px;
  cursor: pointer;
}
.dial{
  top: 50vh !important;
  position: fixed;
  bottom: 5vw;
  right: 10px;
  width:210px;
  height:370px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(0,169,242,1);
  box-shadow:0px 3px 6px rgba(0,169,242,1);
  border-radius:8px;
  overflow: hidden;
  z-index: 999999999;
}
.dial_wrap{
  position: relative;
  display: flex;
  flex-direction: column;
  /*padding: 20px 18px;*/
}
.dial_wrap>h5{
  height: 30px;
  color: #fff;
  position: relative;
  width: 100%;
  background: #00A9F2;
  text-align: center;
  line-height: 30px;
}
.imgxs{
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAwIDIwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTU1LjQsMTI5LjFjLTE5LjItMTcuMy0yOC4xLTEyLjItMzguNS0zbC0xLjUsMS4zYzAsMC01LjgsMS42LTI2LjMtMjFsLTAuNy0wLjhDNjguNiw4My42LDY5LjgsNzgsNjkuOCw3OA0KCWwxLjUtMS4zYzEwLjYtOSwxNy40LTE3LjYsMS45LTM5QzY3LjUsMzAsNjEuOCwyNS45LDU1LjYsMjUuMWMtOS0wLjktMTYuMSw1LjUtMjEuNywxMC43bC0yLjYsMi40Yy00LDMuOS02LjIsOS4yLTYuMiwxNC44DQoJYy0wLjksMTUuNCw4LjMsNDQuNywzNyw3Ni44YzIyLjUsMjQuNyw1NC4zLDQ1LjMsNzQuNyw0NS4zYzQuNywwLjIsOS4yLTEuMywxMi45LTQuMmwyLjctMi4zYzYtNC45LDEzLjQtMTEsMTMuOC0yMC4zDQoJQzE2Ni4xLDE0Mi4xLDE2Mi42LDEzNS42LDE1NS40LDEyOS4xTDE1NS40LDEyOS4xeiBNMTQ2LDE2MGwtMi45LDIuNGMtNi4yLDUuMi0zOC45LTEuOS03My41LTQwLjVjLTI0LjgtMjcuNC0zNS01NC4yLTM0LjItNjguNA0KCWMtMC4xLTIuNSwwLjctNSwyLjMtNi45bDIuOC0yLjVjNC40LTQsOC45LTgsMTMuMi04aDAuOGMzLjIsMC40LDYuOSwzLjEsMTAuMyw4LjJjMTAuNiwxNC42LDcuOSwxNywwLDIzLjhsLTEuNiwxLjQNCgljLTIuMywxLjktMy42LDQuOC0zLjgsNy44Yy0wLjMsNS4zLDEuOCwxNC4xLDIwLjYsMzUuM2wwLjcsMC44YzIwLjMsMjIuNiwzMi45LDI5LjUsNDAuOSwyMi43bDEuNi0xLjRjNy45LTYuOSwxMS4xLTkuOCwyNS4zLDIuOQ0KCWM0LjYsNC4xLDYuOSw3LjgsNi45LDEwLjZDMTU1LjUsMTUyLjIsMTUwLjQsMTU2LjMsMTQ2LDE2MEwxNDYsMTYweiIvPg0KPC9zdmc+DQo=");
  background-size: 100% 100%;
}
.smk{
  position: absolute;
  right: 5px;
  top: 5px;
  width: 10px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
}
.smk:before{
  content: '';
  width: 100%;
  height: 1px;
  background: #fff;
}
.diaInp{
  outline: none;
  margin-bottom: 24px;
  border: none;
  font-size: 22px;
  font-weight: bolder;
  text-align: center;
  z-index: 5;
  width: 200px;
  height: 36px;
  border:1px solid rgba(50,186,244,1);
  margin: auto;
  padding-right: 30px;
}
.diaNumWrap{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 21px;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
}
.diaNum{
  width: 69px;
  height: 50px;
  font-size:22px;
  font-weight: bold;
  background:rgba(251,251,251,1);
  text-align: center;
  line-height: 46px;
  cursor: pointer;
  z-index: 5;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.diaNum:active,.diaNum:hover{
  background:rgba(0,169,242,1);
  color: #fff;
}
.dialing{
  margin: auto;
  margin-top: 15px;
  width:46px;
  height:46px;
  background: url("data:image/png;base64,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");
  background-size: 100% 100%;
  border-radius:50%;
  cursor: pointer;
  z-index: 5;
}
.delPhoneNum{
  position: absolute;
  top: 47px;
  right: 10px;
  width: 20px;
  height: 13px;
  cursor: pointer;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAABdElEQVQ4T2NkQAPPnz83/f///2agsDi6HD4+UM93RkbGGEZkRa9evVL98+fPaaAYPymGwdQCDVwAN/DJkyfCQIETQKxCjmEgPXADHz9+zMnMzHwIKGaCxbCXQO8sAiouAMqxAvE/IH8ukLYFimkgqwcbeObMGVYpKaktQAk3HC47+P79ezcBAYFYoIYZQMPajh492mRjY7McqD4Uw0BgJEwBKsom4M2tR44c8QcaIi0pKfn4xYsXID1Z6HrALnz27Nl/YsIMaECjtLR0AzCsE5iYmOZj0wMzsBoo2ULA0LlAF6bb2traAF14COirWpAFWF24atUqZqBXFgAlY3AYuh1oiB/QkFKoxbOA/CwgH+TKeIwwBAlcvXqVTUhIaDHQ1jB0Q4Fi74Bix4De8QLSTCB5oNguIF8PyJTAaiBIEJioeX7//r0HqNCcmDDFGYbIEkBviP77928v0FBdcgxFySkwA4CJXAWYyLuBfAESDf0DVN8IAPivmJwzJt9ZAAAAAElFTkSuQmCC");
  background-size: 100% 100%;
  z-index: 5;
}
.expiration_Out{
  position: fixed;
  bottom: 20px;
  right: 10px;
  width:222px;
  border:1px solid rgba(0,169,242,1);
  box-shadow:0px 3px 6px rgba(0,169,242,1);
  border-radius:8px;
  background: #fff;
  overflow: hidden;
  z-index: 99999999;
}
.expiration{
  width: 100%;
  box-sizing: border-box;
}
.expiration>h5{
  position: relative;
  width: 100%;
  height: 32px;
  background: #00A9F2;
  margin: 0;
  text-align: center;
  line-height: 32px;
  color: #fff;
}
.expiration>h5>img{
  width: 20px;
  height: 20px;
  position: absolute;
  top: 5px;
  left: 10px;
}
.known_top,.known_bottom{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 17px;
  position: relative;
}
.known_top{
  padding: 15px 10px;
  background: #F1F1F1;
  display: flex;
  justify-content: space-between;
  flex-direction: inherit;
}
.known_top>img{
  width: 68px;
  height: 84px;
  margin-bottom: 7px;
  margin-right: 10px;
}
.known_top>div{
  flex: 1;
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.known_top>div>p{
  margin: 0;
  font-size: 13px;
  color: #A4A4A4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.oneP{
  font-size:12px;
  font-weight:bold;
}
.known_bottom{
  margin: 13px 0 8px;
}
.known_bottom>p{
  margin: 0;
}
.known_bottom>img{
  margin: 15px 0 8px;
  z-index: 10;
  cursor: pointer;
}
.known_bottom>.gddh{
  width: 19px;
  height: 19px;
  position: absolute;
  bottom: 4px;
  right: 3px;
  z-index: 10;
  margin: 0;
  cursor: pointer;
}
.shrink{
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 70;
  cursor: pointer;
  width:16px;
  height:15px;
  background:rgba(0,169,242,1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.shrink:after{
  content: '';
  display: block;
  width:9px;
  height:1px;
  background:rgba(255,255,255,1);
}
.shrinkDis{
  position: fixed;
  bottom: 20px;
  right: 10px;
  z-index: 99999999;
}
.shrink_wrap{
  width:76px;
  height:82px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(0,169,242,1);
  box-shadow:0px 2px 6px rgba(0,169,242,1);
  border-radius:3px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 6px 0 9px;
  position: relative;
}
.shrink_wrap>img{
  width: 30px;
  height: 32px;
}
.shrink_wrap>p{
  margin: 0;
  font-size: 13px;
}
.Missed{
  position: fixed;
  top: 127px;
  right: 20px;
  z-index: 999999;
  width:304px;
  height:726px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(201,57,57,1);
  box-shadow:0px 3px 6px rgba(201,57,57,1);
  border-radius:8px;
  padding: 2px 12px 23px 12px;
}
.Missed_wrap_top{
  display: flex;
  justify-content: space-between;
  padding: 9px 0;
  width: 100%;
  border-bottom:1px solid rgba(112,112,112,1);
}
.Missed_wrap_content{
  margin-top: 20px;
  width: 100%;
  padding: 0 28px;
  height: 643px;
  overflow: auto;
  box-sizing: border-box;
}
.disHeader{
  height:17px;
  font-size:13px;
  font-family:MicrosoftYaHei;
  line-height:30px;
  color:rgba(193,49,49,1);
}
.clearBtn{
  width:60px;
  height:22px;
  background:rgba(193,49,49,1);
  border-radius:5px;
  font-size:12px;
  font-family:MicrosoftYaHei;
  color:rgba(255,255,255,1);
  text-align: center;
  line-height: 22px;
  cursor: pointer;
}
.content_box{
  width:222px;
  height:151px;
  border:1px solid rgba(193,49,49,1);
  border-radius:8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 13px;
}
.content_box_header{
  display: flex;
  width: 100%;
  height:40px;
  background:rgba(193,49,49,1);
  border-radius:8px 8px 0px 0px;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.content_box_header>p{
  color: #fff;
  font-size: 12px;
  margin: 0;
}
.content_box_header>img{
  width: 13px;
  height: 13px;
  position: absolute;
  top: 6px;
  right: 6px;
  cursor: pointer;
}
.aside_content{
  flex: 1;
  background: #f1f1f1;
  width: 100%;
  display: flex;
}
.aside_content>img{
  width: 73px;
  height: 91px;
  margin: 5px 15px 15px 21px;
}
.human_content{
  padding-top: 20px;
  height: 91px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5px;
}
.human_content>p{
  margin: 0;
  color:rgba(164,164,164,1);
  font-size: 12px;
}
.Missed_wrap_content::-webkit-scrollbar {/*滚动条整体样式*/
   width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
   height: 1px;
 }
.Missed_wrap_content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
   border-radius: 10px;
   -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
   background: @borderColor;
 }
.Missed_wrap_content::-webkit-scrollbar-track {/*滚动条里面轨道*/
   -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
   border-radius: 10px;
   background: transparent;
 }
  /*通话结束 关闭div*/
  .closeDiv{
    position: absolute;
    top: 5px;
    right: 5px;
    width: 8px;
    height: 8px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSklEQVQ4T4WTrU4DQRSFdxLqUKAgiDocDhRV4BD8COg78AA8BYoHwEIFP6KSgMDhSCCBkIABh8Mhlu8sZ7bD7NJucnO7c8/57p3pbCjL8rgoii6xH0J4JE988OwgOiRuAi+vBjyQdydB0G+gOyc6ESDaiRfGQjCv2zxN/tVqXlMFGRWy7aDpUb8gZmozmgpgiOinucC1FZvnUrNqNcBCdRGkFvJ7irgkurm5AUi6CRINAiy2mVsBhiyRBzZq6d/D/bOF5DxywBM1/cX3URNzA8BpL7u7tiCjHm3hzZC7FJIf4ipF7X/ehk2L4yF+8L7HJLeNCei8ZvMsWcIthFU3T6U7IPCnIVeqtV0kCWSuuxii6QRRgy+ij2aobyG9yirIXNHzx1MKohv7XUFYfPdoWtgWtc0c17KP6UWAa4oLxAHms3HmBKKpj4jnH+FrmXNIPQvvAAAAAElFTkSuQmCC");
    background-size: 100% 100%;
    cursor: pointer;
    z-index: 10;
  }
  /*备注*/
  .remark{
    position: absolute;
    bottom: 8px;
    right: 14px;
    width: 35px;
    height: 20px;
    background:rgba(0,169,242,1);
    border-radius:3px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    cursor: pointer;
  }
  .remark>span{
    font-size: 12px;
    transform: scale(.9);
  }
</style>
