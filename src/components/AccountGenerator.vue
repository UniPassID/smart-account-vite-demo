<script setup lang="ts">
import {
  SmartAccount,
} from "@unipasswallet/smart-account";
import { Environment } from "@unipasswallet/smart-account";
import { Signer } from 'ethers';
import { ref, toRaw } from "vue";
import { VueSpinnerDots } from 'vue3-spinners'

const address = ref<string>('')
const loading = ref<boolean>(false)
  const props = defineProps<{
  signer?: Signer
}>()

const signer = toRaw(props.signer)

const generateAccount = async() => {
  if (signer) {
    const smartAccount = new SmartAccount({
      // !Attention: The rpcUrl should be replaced with your RPC node address.
      rpcUrl: "https://node.wallet.unipass.id/eth-mainnet",
      masterKeySigner: signer,
      env: Environment.Testnet,
      // !Attention: The appId should be replaced with the appId assigned to you.
      appId: "d891d3062f3f5252be137b4a0553ca83",
    });

    loading.value = true
    const metamaskAddress = await signer.getAddress()
    console.log('metamaskAddress: ', metamaskAddress)
    const account = await smartAccount.init();
    console.log('account: ', account)
    address.value = await account.getAddress();
    loading.value = false
  }
};

const reset = () => {
  location.reload()
}

</script>

<template>
  <div class="card">
    <h4 class="section-title"> 2. Generate UniPass Account. </h4>
    <div v-if="loading">
      <VueSpinnerDots size="20" color="#8864ff" />
    </div>
    <div v-else>
      <div v-if="address" >
        <div>UniPass address: {{address}}</div>
        <div class="retry-btn" @click="reset">
          Retry
        </div>
      </div>
      <div v-else class="btn-wrapper">
        <div class="metamask-btn" @click="generateAccount">
          Generate Account
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.retry-btn {
  background-color: #8864ff;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  margin-top: 10px;
  text-align: center;
}

.retry-btn:active {
  opacity: 0.8;
}

.retry-btn:hover {
  opacity: 0.8;
}
</style>
