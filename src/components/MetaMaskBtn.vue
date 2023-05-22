<script setup lang="ts">
import { Signer, providers } from 'ethers'

interface Emits {
  (event: 'createSigner', val: Signer): void
}

const $emit = defineEmits<Emits>()

const initSigner = async function () {
  if (window.ethereum) {
    console.log('initSigner')
    const provider = new providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer = provider.getSigner()
    const metamaskAddress = await signer.getAddress()
    console.log('initSigner')
    console.log('metamaskAddress: ', metamaskAddress)
    $emit('createSigner', signer)
  }
};

</script>

<template>
  <div class="metamask-btn" @click="initSigner" >
    <div class="metamask-icon"></div> Connect MetaMask
  </div>
</template>

<style scoped>
.metamask-btn {
  display: flex;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #666;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  border: 1px solid #666;
}

.metamask-icon {
  width: 20px;
  height: 20px;
  background-size: contain;
  background-image: url('../assets/img/metamask.png');
  margin-right: 10px;
}

.metamask-btn:active {
  opacity: 0.8;
}

.metamask-btn:hover {
  opacity: 0.8;
}
</style>
