<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: 'AppLoader'
}
</script>

<style lang="scss">
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 10px;
  background: $blue;
  border-radius: 5px;
  animation: load $loader-duration ease-in-out infinite;

  &:before,
  &:after {
    position: absolute;
    display: block;
    content: '';
    animation: load $loader-duration ease-in-out infinite;
    height: 10px;
    border-radius: 5px;
  }

  &:before {
    top: -20px;
    left: 10px;
    width: 40px;
    background: $red;
  }

  &:after {
    bottom: -20px;
    width: 35px;
    background: $yellow;
  }
}

@keyframes load {
  0% {
    transform: translateX(40px);
  }

  50% {
    transform: translateX(-30px);
  }
  100% {
    transform: translateX(40px);
  }
}
</style>
