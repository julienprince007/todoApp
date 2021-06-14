<template>
  <div>
    <div class="q-mt-lg row justify-center">
      <div>
        <h4 style="color: #1876d2; text-align: center">Login</h4>
        <q-form class="q-gutter-md" style="width: 375px" @submit="onSubmit">
          <div class="q-mt-md">
            <q-input outlined v-model="name" label="User Name" />
            <q-input
              class="q-mt-md"
              outlined
              v-model="password"
              label="Password"
            />
            <div class="row justify-center">
              <q-btn
                :loading="loading"
                outline
                type="submit"
                class="q-mt-md row justify-center"
                style="color: #1876d2"
                label="login"
              >
              </q-btn>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue"
import { useStore } from "vuex"
import { useI18n } from "vue-i18n"
import { useQuasar } from "quasar"

import { useRouter } from "vue-router"
import axios from "axios"
import rxdb from "@sowell/rxdb"

export default defineComponent({
  name: "User",
  setup() {
    const store = useStore()
    const $q = useQuasar()
    const router = useRouter()
    const { createDb } = rxdb()
    const loading = ref(false)
    const { tm } = useI18n()

    const name = ref("")
    const password = ref("")

    const onSubmit = async () => {
      if (name.value !== "" && password.value !== "") {
        loading.value = true
        axios
          .post("http://localhost:3000/login", {
            username: name.value,
            password: password.value
          })
          .then(async function (response) {
            const { data } = response
            store.commit("rxdb/setUser", data.user)
            try {
              loading.value = true
              await createDb(data.user.name)
              setTimeout(() => {
                loading.value = false
                router.push(`/todo/${data.user.id}`)
              }, 500)
            } catch (error) {
              console.log(error)
              loading.value = false
            }
          })
          .catch(function (error) {
            $q.notify({
              message: tm("failed"),
              type: "negative"
            })
            loading.value = false
            console.error(error)
          })
      }
    }

    return {
      name,
      password,
      onSubmit,
      loading,
      tm
    }
  }
})
</script>
