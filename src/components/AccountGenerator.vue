<script setup lang="ts">
import {
  SmartAccount,
} from "@unipasswallet/smart-account";
import { Environment } from "@unipasswallet/smart-account";
import { Signer } from 'ethers';
import { ref } from "vue";

const address = ref<string>('')

const generateAccount = async() => {
  if (props.signer) {
    const smartAccount = new SmartAccount({
      // !Attention: The rpcUrl should be replaced with your RPC node address.
      rpcUrl: "https://node.wallet.unipass.id/eth-mainnet",
      masterKeySigner: props.signer,
      env: Environment.Testnet,
      // !Attention: The appId should be replaced with the appId assigned to you.
      appId: "d891d3062f3f5252be137b4a0553ca83",
    });

    const account = await smartAccount.init();
    console.log('account', account)
    address.value = await account.getAddress();
  }
};

const props = defineProps<{
  signer?: Signer
}>()

</script>

<template>
  <div class="card">
    <button @click="generateAccount"> Generate Account </button>

    <div >{{ 'UniPass Address: ' + address }}</div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
