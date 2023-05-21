<script setup lang="ts">
import {
  UniPassJwtSigner,
} from "@unipasswallet/smart-account-signer";
import { Environment } from "@unipasswallet/smart-account";
import { GoogleLogin } from 'vue3-google-login'
import { Signer } from 'ethers'

interface Emits {
  (event: 'createSigner', val: Signer): void
}

const $emit = defineEmits<Emits>()

const callback = async (response:any) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response)
  const idToken:string = response.credential
  console.log('idToken: ', idToken)
  const uniPassJwtSigner = new UniPassJwtSigner({
    // !Attention: The appId should be replaced with the appId assigned to you.
    appId: "d891d3062f3f5252be137b4a0553ca83",
    idToken,
    env: Environment.Testnet,
  });
  await uniPassJwtSigner.init()

  $emit('createSigner', uniPassJwtSigner)
}

</script>

<template>
  <div class="card">
    <GoogleLogin :callback="callback"/>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
