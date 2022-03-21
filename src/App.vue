<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
:root {
  --bg: rgb(64, 158, 255);
  --color: rgb(73, 168, 247);
  --clickh: rgb(113, 183, 253,0.6);
  --bgwhite: #fefefe;
  --h: 33rem;
  --ssColor: rgb(67, 130, 182);
  background-color: rgb(245, 249, 250);
  user-select: none;
  scroll-behavior: smooth;
  height: auto;
  transition: 0.5s;
  font-family: "微软雅黑", "黑体";
  font-size: 10px;
}
h1,h2,h3,h4,h5,h6,p,div,li,ul,li,body{
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
.my_container {
  width: 80%;
  margin: 0 auto;
}
@media screen and (max-width: 500px) {
  :root {
    font-size: 12px;
  }
  .my_container {
    width: 100%;
  }
}
</style>
