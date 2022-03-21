<template>
    <h1 
    @click="$router.push(url)" 
    :class="titleStyle[type] + (more ? ' more' : '')"
    >{{title}}</h1>
</template>

<script>
export default {
  data() {
    return {
      titleStyle : {
        right: "title_to_right", 
        left: "title_to_left",
      }
    }
  },
  props: {
    type: {
      type: String,
      default: 'right'
    },
    title: {
      type: String,
      default: '标题'
    },
    url: {
      type: String,
      default: '/'
    },
    more: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  position: relative;
}
.more::before {
  display: block;
  content: '更多';
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--bg);
}
.title_to_right {
  padding: 1rem 2rem;
  background-image: linear-gradient(to right, var(--color) 5%, var(--bgwhite) 70%);
  margin-bottom: 1rem;
  color: #fff;
  border-top-left-radius: 1rem;
  cursor: pointer;
}

.title_to_left {
  padding: 1rem 2rem;
  background-image: linear-gradient(to left, var(--color) 5%, var(--bgwhite) 70%);
  margin-bottom: 1rem;
  color: #fff;
  border-top-right-radius: 1rem;
  text-align: right;
  cursor: pointer;
}
</style>