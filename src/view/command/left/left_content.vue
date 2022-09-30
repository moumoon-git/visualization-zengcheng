<template>
  <div>
    <div class="blueTitle oneDiv">值班动态</div>
    <!--      来电去电-->
    <div class="smDivBgr callPhone_wrap">
      <div class="underlineTitle">来电去电</div>
      <div class="callPhone_content_wrap">
        <div>
          <img src="../../../assets/images/telegram.png" alt="" />
          <div class="phoneNum">
            <h3>来电</h3>
            <p>{{ incoming }}个</p>
          </div>
        </div>

        <div>
          <img src="../../../assets/images/electrification.png" alt="" />
          <div class="phoneNum">
            <h3>去电</h3>
            <p>{{ electrification }}个</p>
          </div>
        </div>
      </div>
    </div>
    <!--      政务交办-->
    <div class="smDivBgr government">
      <div class="underlineTitle">政务交办</div>
      <div class="government_wrap">
        <!--内容-->
        <div
          class="government_content_wrap government_content_wrap_upper"
          v-for="(item, index) in governmentData"
          :key="index"
        >
          <div class="government_content_img_wrap smTitleBgr">
            <img :src="item.img" alt="" />
            <span>{{ item.name }}</span>
          </div>
          <div class="government_content_main_wrap">
            <div>
              <p>总数</p>
              <p>{{ item.allNum }}件</p>
            </div>
            <div>
              <p v-if="index < 2">办结</p>
              <p v-else>办结</p>
              <p>{{ item.solveNum }}件</p>
            </div>
          </div>
        </div>
        <!--内容 ---------------end  -->
      </div>
    </div>
    <!--      终端在线-->
    <div class="terminal smDivBgr">
      <div class="underlineTitle">终端在线</div>
      <div class="terminal_wrap">
        <!--内容-->
        <div
          class="government_content_wrap"
          v-for="(item, index) in terminalData"
          :key="index"
        >
          <div class="government_content_img_wrap smTitleBgr">
            <img :src="item.img" alt="" />
            <span>{{ item.name }}</span>
          </div>
          <div class="government_content_main_wrap">
            <div>
              <p>总数</p>
              <p>{{ item.allNum }}台</p>
            </div>
            <div>
              <p>在线率</p>
              <p>{{ item.solveNum }}%</p>
            </div>
          </div>
        </div>
        <!--内容 ---------------end  -->
      </div>
    </div>
  </div>
</template>

<script>
import allUrl from "../../../assets/api/allApiUrl";
export default {
  name: "left_content",
  data() {
    return {
      incoming: 0,
      electrification: 0,
      startTime: this.$store.state.startTime,
      endTime: this.$store.state.endTime,
      governmentData: [
        {
          name: "12345分拨",
          allNum: 0,
          solveNum: 0,
          img:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmMzc2ZGNiNC01YmUzLTQxNDctYjA3Ni0zZmRjZTQ0MWJlNjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkM1RjRCRUIyREZFMTFFQUI2ODRDNTNDODBEQjNCRjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkM1RjRCRUEyREZFMTFFQUI2ODRDNTNDODBEQjNCRjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmNiNTMyOTQtOWY3NC0wMjQ3LWFkNjItN2I1M2Y4YmEyNGM4IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MTFiN2M0MGQtNjlmOC04ODRjLWJlNjgtMzJjZGQxYmM4M2ZkIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PruqVwAABLpJREFUeNp8Vn1sFEUUf2929+76Qej12mt7/RK1VKFGS6tGSywBtVQSShQ/IglilGjERBM+FPzHBGOJoNEYjRoTQ4wRJPGP9mhirEVJWzVaQ0SClJAWwSsUer1re72P/Rh3dmf3psfZTV5m3uzM7zfvvXlvBm9ZllgKANIiQrigIFQQg4v+fyLnAMqC5BItRuIAasJc95NzCJQcIjmPNc5H81hAOJH4UZn/EK1QcsikRz7NbCuuoC2SAmUEYYmegVk9iddn/sGh715TjixihWUtmjEJCcAeoa+s7c5sqGw2thkZnI9fJL9cHiYjV0/jleAKWlHdarQsDdHVSME3eYYcPnFA7jXXqFwyQl9lJLUCgSuPHU3vLwhA23g/eW/wgDLEdwmVdxr+q6dJjBq2u+5/SWuru9fYOfcvHg/vUw4KJI6ocp6AKx0fqFsKA7C2d7vnidgYptp2amtCq4wuTyFtAB2Bms5Jx+H8xUHp6+GP5Z/PhumWjn3asQd3a9f6D8pfCLFi2IZU6n8jILoq1GoEm57Uu399X3458huZ7jyU2VrVbDwvSRigGtqeN/cqEQgE6qA91EQLzoSl303Ykfq76N54hPTNTGJCPH1ECDwTpW2X9qY2D/HzfVKkfa+6vnQZbIaMuXtuPGupynR7zF9FN7W/qG38q08aVWcx0tKl789NA5FAevgd9XFvMV2VmsJx5v+aZvoCVRkoF4sEeZvVgzfBVjY/FcNxhcDK+zYbHSKua0lZo7E0eJvxCgNLRzGyoktvoBpIIphLkOZjaW6hCp7KBlqWjuMVNqeqnu7xFoDXyTEnT4inCHyWG3Rr14a/htZaACzQmh3GbIuubo8hlNfQaiMNurVGAx+RLAKWM8QtF5E/SCwxgUPM74oHypNTOJ3PNc7uHWuseJn9uSmMKhINMt0MfDg551YAXFCTel5V3pq5jCczMxg710/O5gV3CRaOjf2Jl7Qkzs5dh8H+I+RDEVcWi4yhAQ2/rhxy9OgY9vgrYCPlRcNxjdUynY/HJ7GPzR/4hnzGly4okCS3mInK9+/Kn6em4W9359w1ooXpGRz94Sj5ZDEcIhYy8aen0Drn0NMt75mdwH49CfNOnjC/Gymznk1A+PhhsovN8/qshIZ8eKx23WG2PjaPt74HntEfDVTTTdFLJPzTl+SYs7KxlS4vKoZAIgZT507hqDO+eh19qqQEOqevQe/QSWTzU1zSrGUkTQKBt2OHvnuJH9Y7fs8k4MLEBfz21AkyrKnWibEvIgWk5nvomkA5bPBIcKt1pE1JzOLAwI/wtkjESFZyEu+654ztJUH6rBhUqqMTZF1LQkRXIUkoFphJEDLrleSAg2HnGNOjUfhoeAS+4pakiXNH19xOS0sCJoHgdxbYrA6SRLHWg7hcolALrBqodh0DMzlZ3zmB/mLYUV8FVQ62Q6I33k07sqXixlNkiVjHGLhqH2eRwL6IEW4O4dM3kBQX0c68GS6Ag9vyMV723fKi2SWHuc0nw0Oc0pCdBwADM9nm3XhkY4H5/M4mU8N9EFHrn7EgQ7h9JpIZ+DrxXs95teR7Fi32WuH2ZO935/rVhcXiY03jRM6dg/leIlm7FpDooiX/CTAA6S7Xffl/NooAAAAASUVORK5CYII="
        },
        {
          name: "领导交办",
          allNum: 0,
          solveNum: 0,
          img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAADWElEQVQ4jWWVS4tdRRSFv7XvRVDxEQkdZyHSGKSdRScqBjRC43sSNAQfA5VAjyRBR4kYHAjBkYIBHYn2NIIvMgnOHAjiwD/gE6JNX6HxUa9zpHbVuenGC8WpU6f2qrXX2rWvTv6+YPdPA2hsTwYOa7DTGjhmmf0M/KLCJYre0aBtK0AB1ZGFMiwBJ5AJkGInNLBZNzOAeaAawKAtCo9a4VuysFz3y4HnHjyCdbBxsPo8osImhT81sGWFVQ8YNDHab1nfkLndirbGwhLU1E/HhzFLQOL9St8yp5V0t5J9YUkowiyCRZ/PlHRW/g7y70Iv/ryYWDUtCisauNpTuM2KFp3VQxQ9aZlDFF0vZ8SqitaU+cflSDCvrJbiNrYPUhRUtE5h4RoWF/yKFV0ht4M9vcxPY9FhS3xPN2ZeUdXBGitn9huFr+0aGFV8TQfnqqUOkDAV/qjfR98nbJa75UnMqg6Jz5U4qKR11yR0berBsc/rWuAVRZKifiWarxOqy0nXyqEx+leZi5b1FQX5Wj25PxtbVlR0nswLk3ZtH5gaK3fXWTZGG0p8p6htRT1Q1wmC6mbkOElXFbWpqI8qq7ruIxlzS3t12lX5RyhcVNInFHaU+Zuim8i6UYXXSFxoerZycx1zTTk2MTWlvDe9U2T2qeg+sm5Q4S8Sl1UozW1zkF5CXtxWAW234C6uTijgRauoRUudowS+JFKIupVoFwisLdOtcUmYxf+594Eim0SdJ9rNNPceI7ChyKqao0eJnCHygyIb9FtUgc06mAUX/FOLeqkHVfBn1dZXLBpEW/PAwClzEzz2PSKvV6fHypAWWD+8qainGlv8ACIvW7TriPa4Oxx4msgtJK1XsOasV8fbJN1byVmjqjtJOtfTYyoFRbuHxBqBH3vwDklPTOl5OTmwM/1sbKZ4em85yzrcIPOaUgO/3xIf9vQuKfD8lB6Tia1kDijxTGW4zwLHXdCmExM43sr0KkHbBC4TSWQ94m7GdkO8bFrLq/M35gQenmrKAZa9sRX7mLmDwiHvPgMfT8U/1nZXv3tTXjaXu2rKz3mKnZHfnG7ULp2O9ZRP+qGdVe3U7WaJMcvf5wq1YbIz3ZK6eWLpLcmZ6OBYeHccCMrEPawG+bz+jQA7/wGTJRt2+VSkbAAAAABJRU5ErkJggg=="
        },
        {
          // name: "可视指挥",
          name: "日常巡查",
          allNum: 0,
          solveNum: 0,
          img:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmMzc2ZGNiNC01YmUzLTQxNDctYjA3Ni0zZmRjZTQ0MWJlNjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUFBNEJGOTAyREZFMTFFQUE4NjZDOUIzNTk5NTNEREIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUFBNEJGOEYyREZFMTFFQUE4NjZDOUIzNTk5NTNEREIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmNiNTMyOTQtOWY3NC0wMjQ3LWFkNjItN2I1M2Y4YmEyNGM4IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MTFiN2M0MGQtNjlmOC04ODRjLWJlNjgtMzJjZGQxYmM4M2ZkIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WT1nTwAAA1RJREFUeNqUVjtrVFEQnjn3ZpesWU0CSYxCIAQ0rXYSQawEiRghoLVWFhbaayVi4R8QQazENBrwVVgExUYQQhoRxUqLBDUhmMfe1xnP8+7ck92FXBjO456Zb15n5uDU5PYIAESMYkXCzUVACNWPFMmAipBiJthTxMYQrBdIKDz357nQvgAsZtZxEGQAIUjOxvK8Fx5SLyDoAOIFxwxAdLRkfjG52xih8+pXWxjTkyTa0TnEjDkCOf3NmOsRaWsVF17die9rRSruaYzSLEnY/vtVLKab8K+1gVsKALlTqBJmNECKSK/7mzAU90F9cJzmDjTpijrxQJ8KYwKtdfzy5lrtKQqIj88VkzJTOsq2c4iscA+s10jGL+LbkvigbbpwO5/sb8CMk1vElfSVhqGu5xefpLeah+nMHtcU3iWla8r1+DF6/P5htAgZNGQCPhw5vxOx9SuaYBU7sE1Zd98b4VkVLN8BI1oBCLJijPIxv2yUWa3MwVR5IuukPToQt+d49FlF0jAn6oxN9A4gnhmsZpQy4QUT6PcyrICZ/5pX8TlLjNyYXTABqT1gDmorUuaaUrBToJw76zK7NryJTUh+T9q3i2ljAJLANSwOFUv8HrME2iBYBalYot1F1tdcWwfWnlfjUvIyuTErD0SJtcD8iGBIr6nidxb4bK91MUKzVJbapacKkqJKPzQZ8vOzeDs2ReuKmWzZC1MYeIlBDfbrB35y8czJppfkIKY6ac2xoPrBUWqsvBQram8F9vkNDEADM6w7S6QvK2UPkLu4W4tg+tyN4hkPbCWrUmgZ6yT0lxc0DyqCorwFq7xplSDLz8X1o9N0OkIcJF2xHDO7jDQ8DJe1sI01WFDFEq1QJ1yXJbWX57C59hs++v6Cqv1Oq4muVzU21nzBDL/ZeXqkBEavX+DVLh5zN8yQTqUkZg0nOnVJzgiEQ6ryCplirITpKoAkyyCTkDCmtT55As6aNiDLqJIqrhIJdb7JvIA/y99pibvLdLPxCbqn/C6sa2hPldWksi9RHHRkBG7yBmZ6iwfUSwlranhnIqXcNbGP9hv2eN7CeH93qWLJW8I/Gbw4RA8Q6vFSKcF84+ePg4gxRvt4dxXdwLgl4RNHdHkOdbKEWxQC5v8FGAChQYMeygkxMwAAAABJRU5ErkJggg=="
        },
        {
          // name: "网格报告",
          name: "群众上报",
          allNum: 0,
          solveNum: 0,
          img:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmMzc2ZGNiNC01YmUzLTQxNDctYjA3Ni0zZmRjZTQ0MWJlNjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkM0NTQ1NTUyREZEMTFFQUE1MDBERkYxRTBCNjJEODIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkM0NTQ1NTQyREZEMTFFQUE1MDBERkYxRTBCNjJEODIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmNiNTMyOTQtOWY3NC0wMjQ3LWFkNjItN2I1M2Y4YmEyNGM4IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MTFiN2M0MGQtNjlmOC04ODRjLWJlNjgtMzJjZGQxYmM4M2ZkIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+w3wpbAAAA9pJREFUeNqEVk9oHkUUf29n1vz5kjRpUpsYo5T0EHur0JRCpaEVQcSDgiIongrSU+mhtHgSbxYPPeldwYsnxUspPfXioYg3qT2J9NiQzxrzfbs783wzOzPf28mWbnjZ3Zlv3++93/s3uHli/wgAqB7RLIUQdyFMLgpiWYy4O2nEs9WZ0niX6zmQBLGZ8kIYkgzKQaKUz/BGemIzkCZI7u0h60sh0qPi0q3q3WNb9H6BMDce4qNfb+uvHz8onggA1WOIpxQ5JutC8QvxPlilwWgX4dUds/b6ZXN1ZpG2SRBjKvh398/ixzufl9/NHiXkveZgD/d5t2apwt3LIboufFlffPmcue4sNhUeDP/C+9MLtG1rtpaFPAg6c+dmF+H0O7fq1fllOk8N0mgPH/x0Q18PFKaYHaJrZcu+VRS46raVgrn5F+ns7kP8uZyCJbDovXAeUQOGge3CMXibAQB5fXqGLgY9MVYqghQSqN7Hp3CEgEJSKg3rSxuw7pUb8uxHb8g9Vx7Qr9va01UGUiNDRuf1YceAVAfeRzD8/Xv9RX2AlQMkWRnUgp3Ytm8sb8BH3ojK70ZWmpiVMkVbb2ooWhB0SvTx12jL1Gyrbdc8WPDS3aemcJWq1kNb+cxSQp+KIChrwVaIjgJnGfM8WDtlPyOnvMnoajDRROPwXvm0VVk6o5Yv7pm9QJd4nu8aR3t/4z1eM04xWijmV+ACEsx75c0kNv69TpXeES1agBe2BmnsqQI7gtHDO8UvoyGO3J4qQZ15z5xWhQPB4BEIEF+HRWY46qxC2WXnNvkP2fLFMx/YbycUOYXY0mOE8iakdgX5hbGtUAckcBziQGYM/zB91tcGW0quKI3/eomp0gmsHyT1LhBABBVSzH2ma+/uN+rK0yd4gKEHOzD3/OaH9tpgDnYSgPOm7owAkl24k/3JE0eXwYWdT+xXrMTwO4YgE7+jQjiePDYxUTrdudNWui3bUTPGSIHS3CO9eYhdl0MKU2iYFL2ZDLAIRD0gTNe4DTwX1/C3e8XN6j8YT8ZUAAt2bp6kS8uL8LFfb/wvTAbU8cTPBKrJtjFB17DLVzbpHPekhtKApfSFi89siZuepqghG73Sk7hoCoMpJrwyu3IUPpWUpHS2mKiKaywoJmTSqcVk80XErWQ61UFqJwLEIJA4NpAYwEg4mFRPArJaHAA80ONH+MNLG6C5EGdsqxy9hW0WoQdoOzC5P/6d+++AbFXDH2Eadjxx43etZ76X2SFDiTbRd5CQ1teZNDqF6/BRx/R11AxEZpPJgBoZk6iw79CmnnO46zsWmTwm/wswAONShEvaj6YYAAAAAElFTkSuQmCC"
        },
        // 2020-11-02 tanjinfeng 新增一项公安分拨
        {
          name: "公安分拨",
          allNum: 0,
          solveNum: 0,
          img:
            "data:image/png;base64,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"
        }
      ],
      terminalData: [
        {
          name: "天翼对讲",
          allNum: 0,
          solveNum: 0,
          img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAADpUlEQVQ4jU2VX6hVVRDGf9+cYxRCgS8RlWZIXIiIIOifhP1V6inUlywMtAJ9iKICe8moqN7CkCxDJOpFfEgiEyMkoheNIIvChNAkiGt1w4jaa61ZK9bae997D2zmMHvNt76Z+Wa2Ns3OMfxmgEeUuVmFf5T5lMw+ZcvKYAnIIAdcKAtr/3ufklACG8A+UOFHc3aYc7E5K5RsryVzi2xWpD8chaKwGlx99QnCOjVb301VOE1hlWXuV+ZMyXaDMkHOaZwnlNlvzp24tiqrjIwqKPUSF8WHDLwCZg4oc4jMTWQ7OklQamqZTs4Mrp/k2iNnO85/NqacFmxL2esFQo+dm6Nku0yZv+TskPN6rRmuD+U8bK7LcWbH2llaDNgD9aCCCFPcanEv4KgVvzHRWbk24eyX8+8AsM5cz5H4SM5bI3ipNg7gSUwrqpyizFJcX8s107PhSXPeHcBeIOnVwX+3ko7h+n6IbQxLOyemkzEFZ4u5Zsai43pHiTMkPS5nw8DgWZxbFPUdjilRGGtXY+oFW09e6PN3rjXnJ1yTJpGkeY2RVJvxEElHWu0SRa6vSKwea9efA1PsNTWJ/Kyo9ZN5TdHboC8UtYpORwjVV5noVgXdoaDn6aD62xMNsybQAaTTISIHB7ALijytTmvU8atCfwHBlito9wD0hgJXKhoKRvXZYqVbD7RxEvSngibW6c0KZI2pVbtFHWet47wC11uwOYKd0MDSwgi4kF7PotPt6liqwJEFPwfoeI/A5wTtIdgPdJwmcAWB/dS4OpYWFoFVpl2r0ymCthFsLUE76ThMx0YFdinYvQraS6AQWKPAK0RtVuDRxtIGMOuB5tNT0NvqOKaOFxW4xoKJYEsU+ISO3RbYR9TVCgoEEpH3S9Sl00q1jc4ok9HGKlbWWbK/Sy+Jq5RYjvMArgdxbiNxCudGuV7GKZZ0ctpk0ED67cEwRrT5tICzmshxnHN1PHEtU+I3nL1yPYOzgqRLqg5LZsW0tTv140MaBWrzLHFOmLOzuHYqsZ7EEjLLiuu4kj6uY1u3U3F+l7PWWt3m225VZ31juoFtbF1/iY5vCRwkaSVRF1nQdiK/lEoicpjIdSXxzbQJtE9vId1FO68GDGvqHjKzJN2Hc75k1rb3madKZtew8mgpLw6sC7QM34dx3w0X/CFnXXGOkrlLzmzJbCDzZf2+tMZlmLbUFpZA35iBZVtJdXunPqBkPlNiW8msLJnXlJmjglV2BQD+BxeGQf4CRoAcAAAAAElFTkSuQmCC"
        },
        {
          name: "网格终端",
          allNum: 0,
          solveNum: 0,
          img:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmMzc2ZGNiNC01YmUzLTQxNDctYjA3Ni0zZmRjZTQ0MWJlNjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEYzREQ4ODgyREZFMTFFQTk2REZCQTk0QkUzQTZDNTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEYzREQ4ODcyREZFMTFFQTk2REZCQTk0QkUzQTZDNTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmNiNTMyOTQtOWY3NC0wMjQ3LWFkNjItN2I1M2Y4YmEyNGM4IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MTFiN2M0MGQtNjlmOC04ODRjLWJlNjgtMzJjZGQxYmM4M2ZkIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+78f/GwAABUFJREFUeNqEVk2IHFUQrnrdPdOT2Z+ZZP+FwJp1jcGgIiaSiB4CiYFEYkQUBIlGBD3k4iEXQQ+Ci4h4UOJB0YMgIUo0LmIIm4Mr2RDNRgWzJME42c3uTMhmd/57+u+V9Xqmh047moaiX3dX1/fq+6ree7hhtLYWALSY6a27iBjC7RexyYj5EfOiz3oscNS0GBBGgChifgeAqG87mNEaG/8D1AlE3gkAYgGNmOnJXjL7N1F2/Clvy8Bm+VytIGarecwNbpYv1PJ4ZvYz/Uu7DNbyZVFif7fDZIIJxQES4XjbYfex0R3+G/nz4ujIw3QQAVOI8DfP9YYuYLBniJ4e3yXzvXfRA5UleX7qHf1YTLs2paJDJondHzsvjj3pT9hFseBW0WNSUsREyDo0/AZ45CIoS5g0WJrHSwNj8tDed703o5OMUK/9C4QBDvRtpFfJQ8idFid6hmlMEUGOYh2FsmDMlhmmneV5vC4b6Kd7adeet723YrpqIUi7srYc8rb03UsHlXzEgfUEJJmW7WrWoMxnOnxABUIOEyix20xDpnYDz5ENsKYLdjzxir+/BdRuidtKmDk3c1PiA7+BnlOGeuEPscD8f+HZnAuzW8xhvraMVbuI77W6Awtz+Nfibzg3MErT7MOpBhUWZtLukyCbBw94948+7h9igDL5BCtXxLRmSHNwk9xLShV2X5MWM+UCLIxslPuCjDwkQ4Mpq4TF4btpH7EPZ5fa9ozEM9+IE2GPhSBi/Va5W9NgSDNhSInMol6ELGoJA8ZIYDA/swsW3TQ1DAPGgdNWpdOdgSVw6Yqh4Ti16mndID3Lo8mw2tp13bUOdiieA1FZD98Ci2fZrd6B0xRe+GAioUE2+7EGyhI6rA+qzW76qG864YZIv6AeDm5dwq950MMpSw6kLc6K80aSTC4AnX/2gVCszuNcdRluJQR8x4F9nrlolCB/8xpeTiIcl8pLguAYVhwkuJwylph5TzL/nJ7GnWxDCsEuwgoDKQGFU4W6W0ebv60wpT5xQKcCVacOjl3FVQ5OqhjYuxFfVgImB+6h13gWutJD8c/zNFmKZHaI9gclzTBdKZipLMPcwAi9pPxUL7m9cM0QcLJ/gF4O/vWb+vH1VSt2IEwAwmvSqSbP2OwBH3Qu42KTawzee3WosjWamjS1Yrquqkybz01NXQty0UVUhPvB0gX8kRooWfCqz8E4q4RTwQqXdC14ZykArHkNtHlc4+VFvas1yrjEIMTPwTtpg1O8iZORfSZYIIPl+sK32oVk0p9gWkwlqlWC0q1FLHAmn/ouz1kilG5Cvl7mQA08wnqQ6pXlAl5lwX2nRkdYduCK1M/9CsdbjRgA6dG9oJwXufu2y0+kTWXpgsfLwJH+IdjD6a5VDZo2YaqyirnhYTioNBISkp5FH2Yz8FDaxEfZL1sowER8ZxSRzca7+BPOcUdPsh4ZIbGPu1fYFVjg/sgq0wgzOkI6GLMxTQYLLbtN3MmAWbcOf/76O/wQxguzEZEXatNxT32uvV9cwqNK8L5+2r6ax9lmQyJIh3vb4aVeNR03YGkFJ7myevhvzarCzMlpeL0Vx4taNBO3uYCDc/qY+KhwFSdSSXyEKdNZTFsF5gyTQccH+wk71iGf6YKtpSIcnZqBw+H/LWtno8f25XBXk2dP4/dDI3BW1yClE6Uyvfg8B65yL9T4blkW/HI9Dz9zL00vFGA+xkh4DzRBPhINdzhEGJF9Jtxz7nSQ8DoABRZmAh1+1lrf7nRa6QTkx0H8Doc17T+OQ53OXTLSE16nA94/AgwAZ78VmZtcMs0AAAAASUVORK5CYII="
        },
        {
          name: "视频监控",
          allNum: 0,
          solveNum: 0,
          img:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmMzc2ZGNiNC01YmUzLTQxNDctYjA3Ni0zZmRjZTQ0MWJlNjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTJGMDMzOUYyREZFMTFFQUI1MkJFMTU2N0VCQjM0ODUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTJGMDMzOUUyREZFMTFFQUI1MkJFMTU2N0VCQjM0ODUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmNiNTMyOTQtOWY3NC0wMjQ3LWFkNjItN2I1M2Y4YmEyNGM4IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MTFiN2M0MGQtNjlmOC04ODRjLWJlNjgtMzJjZGQxYmM4M2ZkIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+JwMe7QAABKZJREFUeNp8Vk1sG0UUfm92bSd24rhpFOI4aSkJKS1VECLlBFGVCAEFAYce+DkgegSJAwdABSEhED+lHKkESCBxAA5UqZBSqpRcAFWlOZSoUfNT2tDYTprg1okT/+165zGzu+Osl1VX+jTjt+v3vf8Z7NtTTACAJqC78O7VbwkmgB7IhwS4u1o+1FxYQUolQgFEzEMEHhJF5FdeN8ZrqeYhsPHc99U3Yp00wg0oVjcxW81jemsZMxs3cOXfK+xmdordcgm4h4D5vdVdoebzIjRy3HgqnqKXpJ0MEfQQ9McSBDt2E/Q+LNVZVmUdr1YL+E85D+nSmiBPC2RxbWsVC+sZ3FCeoshJSmzCHg8i7QM88fSXxgQRaspOsrbtdfborK79zt6RVfJwvlbBDJmwNf6h/hkLCJd+6APzLeKCQP7Zhb03JUQUBMgQMgG5Krnc5xbw24VJ7SsyUAvpMCAjpfsJJNK/ab+EY3ChOUE9kVbqjLRAdyhCST2ESWX99orKE7q9iKd+PaH/MHiY90dj9Kx4L31Hb04UkTb1hT7z+OfmUV4Fc30RF2olvGwZaEqlWojC4WZojcRgRyQKXeEmSulh6GEEscwldkHqSw7QY2CCXlqHn72eNIRt9yM82dHHX5Axhn5pJcmQVKqbkDE2cKmygWtGAfKFNC6JxG913QePtrTRg30H+Yuzk+wd8S63aeDY2ZPaR6qEma8PtLvu5/fYcW8MTVM4jP3hdlFlbeSGSK4IlQLMX/xRe/fAKH85loCIzrDt7El2QlUX8ypXZC0d0OMk0wEYMqky4eBJOLpy29Kd+4f586UcXhNqKdpMQ00x24H/kagGYnPj7Hw5hzNKObnKnUpqlIlGraGFsZZWGPnzNDu9ax/fVStDvlKUpmyT1JUrsuW/WG7s9dCx3FX8SdT8vFWCdUcpbpMpb0zUl+fwm1Ofas8IxeU9++GokBtuB9ldpiuSQ2/WDouEmbJbV+dYbnUW8+c+0b+TiQtHQT94xBrtHqDX7ByJPAhrsygqSliV6OqhVx4YpptdvTQqurn3+jy+7ZlldRJI7qVjToLF2BikP8bf14+rKWiUoJaZZjPJuy2nq0XSpyfYx9kFXE71U6ozBX3tHXTAMqAwMcaOlEtQ9Mwyewrbj+iJgnAuLl+hZYet4bkxjdl7h9iZtnY6vHULfl+6ghmrBnxxBq8tzsC8+JcMkemi5q42Ub0CBAmJhrI7mFew4sq9Yx2sMpRkLowCrgqCmmese5UbHlndE+dMMJGInDklKsaIxoH1DfF9O7thsCVOD4XDsFf2hEw2c/rLr8wMIDSVJ3YFkFtwkiTWCsNPvmo9UZ+uYjWLmCmK6Xp7BS+l/8ZZIa36lPv3DSejh8RJqohk1KqK0ZDDc7k0Tl2/jHObeSh7jlnuOwWDYPlJLLvxyBGXCzB55mvtPV/u6Q4k/n0D6iQqXPIzXsWSG3N0pd5LAw+4MFg+Au5ddfeH/CSuzgZRZXE3vhBwK+FB1vrAvdBdC8Cq4ApySMhEi3LOuSQUcCvhdyDiAaif8WoCqxkWlAsKUBAUHr/XpMKlBEH3qqBw+YkaLPfjPwEGAJrU7pAxx5ZgAAAAAElFTkSuQmCC"
        }
      ]
    };
  },
  methods: {
    //    政务交办
    Numdtuy(startTime, endTime) {
      let that = this;
      let data = allUrl.government,
        s = {
          params: {
            startTime,
            endTime
          }
        };
      Object.assign(data, s); // 合并对象, 只是把参数搞成对象形式 {}
      this.apix(data)
        .then(res => {
          // console.log(res)
          let data = res.jBanSumcount;
          that.governmentData[0].allNum = data.jBanSumcount;
          that.governmentData[0].solveNum = data.jBanEndcount;
          that.governmentData[1].allNum = data.ldjb;
          that.governmentData[1].solveNum = data.ldjbEnd;
          that.governmentData[2].allNum = data.kszh;
          that.governmentData[2].solveNum = data.kszhEnd;
          that.governmentData[3].allNum = data.wlbg;
          that.governmentData[3].solveNum = data.wlbgEnd;
          that.governmentData[4].allNum = data.gafb;
          that.governmentData[4].solveNum = data.gafbEnd;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 终端在线
    Terminal(startTime, endTime) {
      let that = this;
      let data = allUrl.Terminal,
        s = {
          params: {
            startTime,
            endTime
          }
        };
      Object.assign(data, s); // 合并对象, 只是把参数搞成对象形式 {}
      this.apix(data)
        .then(res => {
          // console.log(res.data)
          let data = res.data;
          that.terminalData[0].allNum = data.telSum;
          that.terminalData[0].solveNum = data.telOnline;
          that.terminalData[1].allNum = data.netSum;
          that.terminalData[1].solveNum = data.netOnline;
          that.terminalData[2].allNum = data.monSum;
          that.terminalData[2].solveNum = data.monOnline;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //    来电号码
    phoneApix(callType, startTime, endTime) {
      console.log("给老子", startTime, endTime);

      let data = allUrl.phoneApi,
        s = {
          params: {
            callType,
            startTime,
            endTime
          }
        };
      Object.assign(data, s); // 合并对象, 只是把参数搞成对象形式 {}
      this.apix(data)
        .then(res => {
          // console.log(res.data)
          let data = res.data;
          if (callType == 0) {
            //    汇入
            this.incoming = data.value;
          } else if (callType == 1) {
            //    汇出
            this.electrification = data.value;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.startTime = this.$store.state.startTime;
    this.endTime = this.$store.state.endTime;
    console.log("这有什么东西", this.$store.state);
    this.Numdtuy(this.startTime, this.endTime);
    this.Terminal(this.startTime, this.endTime);
    this.phoneApix(0, this.startTime, this.endTime);
    this.phoneApix(1, this.startTime, this.endTime);
  },
  computed: {
    myValue() {
      return this.$store.state.startTime + " " + this.$store.state.endTime;
    }
  },
  watch: {
    myValue: function(newVal, oldVal) {
      // 监听到全局的时间发生改变
      console.log(newVal);
      let newTime = newVal.split(" ");
      let newStartTime = `${newTime[0]} ${newTime[1]}`,
        newEndTime = `${newTime[2]} ${newTime[3]}`;
      console.log("什么鬼", newTime);
      this.Numdtuy(newStartTime, newEndTime);
      this.Terminal(newStartTime, newEndTime);
      this.phoneApix(0, newStartTime, newEndTime);
      this.phoneApix(1, newStartTime, newEndTime);
    }
  }
};
</script>

<style scoped>
.oneDiv {
  margin-bottom: 20px;
}
.callPhone_wrap {
  overflow: hidden;
  height: 160px;
  border: 1px solid #153d96;
  display: flex;
  flex-direction: column;
}
.callPhone_content_wrap {
  flex: 1;
  display: flex;
  width: 100%;
  margin-bottom: 17px;
  align-items: center;
  position: relative;
}
.callPhone_content_wrap > div {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.callPhone_content_wrap > div > img {
  width: 70px;
  height: 70px;
  margin-right: 20px;
}
.callPhone_content_wrap:before {
  content: "";
  position: absolute;
  width: 1px;
  height: 44px;
  background: rgba(59, 144, 238, 1);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.phoneNum > h3 {
  color: #99c9e7;
  margin: 0;
  font-size: 20px;
  font-weight: 400;
}
.phoneNum > p {
  color: #fff;
  margin: 0;
  font-size: 22px;
}
/*政务交办*/
.government {
  height: 360px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}
.government_wrap,
.terminal_wrap {
  flex: 1;
  padding-left: 40px;
  margin-top: 15px;
}
.government_content_wrap {
  display: flex;
  align-items: flex-end;
  margin-bottom: 33px;
}
.government_content_wrap_upper {
  margin-bottom: 10px;
}
.government_wrap > div:last-child {
  margin: 0;
}
.government_content_img_wrap {
  width: 137px;
  height: 36px;
  border: 1px solid rgba(121, 156, 233, 1);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: #edf3fc;
  padding: 8px 5px;
  margin-right: 38px;
}
.government_content_img_wrap > img {
  width: 21px;
  height: 21px;
  margin-right: 10px;
}
.government_content_img_wrap > span {
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.government_content_main_wrap {
  flex: 1;
  display: flex;
  align-items: flex-end;
  position: relative;
  margin-bottom: -3px;
}
.government_content_main_wrap:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 92px;
  width: 1px;
  height: 44px;
  background: rgba(59, 144, 238, 1);
}
.government_content_main_wrap > div {
  flex: 1;
}
.government_content_main_wrap > div > p {
  margin: 0;
}
.government_content_main_wrap > div > p:nth-child(1) {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.government_content_main_wrap > div > p:nth-child(2) {
  font-size: 22px;
  font-weight: 400;
  color: rgba(153, 201, 231, 1);
}
/*终端在线*/
.terminal {
  height: 295px;
  margin-top: 25px;
  overflow: hidden;
  border: 1px solid #153d96;
}
</style>
