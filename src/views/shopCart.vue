<template>
  <div class="shopcart_mwz">

<div class="shop">
  <div>
<img :src="this.$route.params.data.s_pic" alt="">

  </div>
  <div>
    {{this.$route.params.data.title}}
  </div>
</div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.shopcart_mwz{
  width: 100%;
  height: 600px;
  background-color: pink;
}
.shop{
  width: 100%;
  height: 200px;
  border:1px solid red;
}

</style>