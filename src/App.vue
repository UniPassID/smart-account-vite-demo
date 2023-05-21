<script setup lang="ts">
import InitSigner from './components/InitSigner.vue'
import AccountGenerator from './components/AccountGenerator.vue';
import { ref } from 'vue'
import { Signer } from 'ethers'

const signer = ref<Signer>()

const setSigner = (createdSigner: Signer) => {
  signer.value  = createdSigner
}
</script>

<template>
  <InitSigner @createSigner="setSigner" />
  <AccountGenerator v-if="signer" :signer="signer" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
