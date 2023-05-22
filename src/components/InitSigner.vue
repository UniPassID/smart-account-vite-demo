<script setup lang="ts">
import {
  UniPassJwtSigner,
} from "@unipasswallet/smart-account-signer";
import { Environment } from "@unipasswallet/smart-account";
import { GoogleLogin } from 'vue3-google-login'
import { Signer } from 'ethers'
import { ref } from "vue";
import MetaMaskBtn from "./MetaMaskBtn.vue";
import { VueSpinnerDots } from 'vue3-spinners';

interface Emits {
  (event: 'createSigner', val: Signer): void
}

const success = ref<boolean>(false)
const loading = ref<boolean>(false)

const $emit = defineEmits<Emits>()

const callback = async (response: any) => {
  loading.value = true
  const idToken: string = response.credential
  const uniPassJwtSigner = new UniPassJwtSigner({
    // !Attention: The appId should be replaced with the appId assigned to you.
    appId: "d891d3062f3f5252be137b4a0553ca83",
    idToken,
    env: Environment.Testnet,
  });
  await uniPassJwtSigner.init()

  $emit('createSigner', uniPassJwtSigner)
  loading.value = false
  success.value = true
}

const createSigner = async (signer: Signer) => {
  $emit('createSigner', signer)
  success.value = true
}

</script>

<template>
  <div class="card">
    <h4 class="section-title">
      1. Firstly, You need to initialize a Signer for generating UniPass
      Account.
    </h4>
    <div v-if="loading">
      <VueSpinnerDots size="20" color="#8864ff" />
    </div>
    <div v-else>
      <div v-if="success"> Create Signer successful </div>
      <div v-else>
        <ul>
          <li> Get UniPassJwt Signer by Web3Auth through Google OAuth. </li>
        </ul>
        <div class="btn-wrapper">
          <GoogleLogin :callback="callback" />
        </div>
        <ul>
          <li> Get MetaMask Signer </li>
        </ul>
        <div class="btn-wrapper">
          <MetaMaskBtn @createSigner="createSigner" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
