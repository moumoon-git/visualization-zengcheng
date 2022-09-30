<template>
  <div>
    <img
      v-if="
        document &&
          (document.url.indexOf('png') > -1 ||
            document.url.indexOf('jpg') > -1 ||
            document.url.indexOf('jpeg') > -1)
      "
      :src="document.url"
      alt=""
    />
    <div v-else>
      <template v-if="document ? document.url.indexOf('http') > -1 : ''">
        <!-- <iframe v-if="document.url.indexOf('jpg')>-1 && document.url.indexOf('png')>-1" :src="'https://view.officeapps.live.com/op/view.aspx?src='+document.url" width='100%' height='750px' frameborder='1'> -->
        <iframe
          :src="
            'https://view.officeapps.live.com/op/view.aspx?src=' +
              (document ? document.url : '')
          "
          width="100%"
          height="750px"
          frameborder="1"
        ></iframe>
        <!-- <img v-else :src="document.url" alt="" style="width:150px;height:150px"> -->
      </template>
      <template v-else>
        <!-- <iframe v-if="document.url.indexOf('jpg')>-1 && document.url.indexOf('png')>-1" :src="'https://view.officeapps.live.com/op/view.aspx?src='+baseUrl+document.url" width='100%' height='750px' frameborder='1'> -->
        <iframe
          :src="
            'https://view.officeapps.live.com/op/view.aspx?src=' +
              baseUrl +
              (document ? document.url : '')
          "
          width="100%"
          height="750px"
          frameborder="1"
        ></iframe>
      </template>
    </div>
  </div>
</template>

<script>
// import bus from "@/views/common/js/eventBus";

export default {
  props: ["document"],
  data() {
    return {
      baseUrl: window.SITE_CONFIG["baseUrl"],
      document: ""
    };
  },
  created() {},
  mounted() {
    // bus.$off("documentPreview");
    // bus.$on("documentPreview", val => {
    //   this.document = val;
    //   // console.log('this.document: ', this.document);
    //   // console.log('this.document: ', this.document.url);
    // });
    // // console.log('bbbbb',this.documentUrl,this.document.url)
  }
};
</script>

<style scoped></style>
