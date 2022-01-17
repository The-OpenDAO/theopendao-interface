<template>
<el-dialog v-model="error.isOpen" title="" :width="error.width" center>
        <div class="flex-center">
            <img v-if="error.isTrue == false" src="@/assets/images/error.png" alt />
            <img v-else src="@/assets/images/success-icon.png" alt />
        </div>
        <div class="error-title">
            <!-- <span>Failed to connect</span> -->
            <span>{{ error.title }}</span>
        </div>
        <div class="error-desc">
            <!-- <span>
                Request of type 'wallet requestPermissions' already pending for origin
                https://www.theopendao.com.
                Please wait.
            </span>-->
            <span>{{ error.desc }}</span>
        </div>
        <div class="flex-center mt10">
            <div class="confirm-button" @click="error.isOpen = false">Confirm</div>
        </div>
</el-dialog>

</template>

<script setup>
import { onMounted, computed, reactive, ref, watch } from 'vue'
// import {NModal,NCard} from 'naive-ui'
import { utils } from 'ethers'
onMounted(() => {
    window.onresize = () => {
        return (() => {
            error.screenWidth = document.body.clientWidth
        })()
    }
})
const emit = defineEmits(['close'])
// expore the function to father
defineExpose({ openError })
function openError(title, desc, isTrue) {
    error.isTrue = isTrue
    error.title = title
    error.desc = desc
    error.isOpen = true
}

const error = reactive({
    width:"30%",
    screenWidth: document.body.clientWidth,
    isTrue:false,
    isOpen: false,
    title: "",
    desc: "",
    modal: {
        width: '480px',
    }
})
let screenW = document.body.clientWidth
if (screenW <= 767) {
    error.width = '75%'
} else {
    error.width = '30%'
}
watch(() => error.screenWidth,
    (val) => {
        // console.log(val);
        if (val <= 767) {
           error.width = '75%'
        } else {
            error.width = '30%'
        }
    });

</script>

<style scoped lang="scss">
.custom-card{
    display: none;
}
.mt10 {
    margin-top: 10px;
}
.flex-center {
    display: flex;
    justify-content: center;
}
.error-title {
    font-size: 20px;
    font-family: "GothamRnd";
    font-weight: 500;
    color: #000000;
    line-height: 38px;
    text-align: center;
}
.error-desc {
    font-size: 16px;
    font-family: "GothamRnd";
    font-weight: 500;
    color: #000000;
    line-height: 25px;
    opacity: 0.5;
    text-align: center;
}
.confirm-button {
    width: 200px;
    height: 48px;
    background: #00c38b;
    border-radius: 4px;
    font-size: 18px;
    font-family: "GothamRnd";
    font-weight: 500;
    color: #ffffff;
    line-height: 48px;
    text-align: center;
    cursor: pointer;
}
@media only screen and (max-width: 767px) {
    .traits_list {
        column-count: 1 !important;
    }
}
</style>
