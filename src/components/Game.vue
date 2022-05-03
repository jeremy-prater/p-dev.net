<template>
  <div ref="gameContainer" class="gameContainer"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { PDevGame } from "@/game/main";

@Options({
  props: {
    msg: String,
  },
  created() {
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  mounted() {
    this.game = new PDevGame(this.$refs["gameContainer"]);
  },
  methods: {
    onResize(event: UIEvent) {
      if (event && event.target) {
        let newWindow: Window = event.target as Window;
        let newWidth = newWindow.innerWidth;
        let newHeight = newWindow.innerHeight;
        this.game.resize(newWidth, newHeight);
      }
    },
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.gameContainer {
  width: 100vw;
  height: 100vh;
  background-color: #111;
}
</style>
