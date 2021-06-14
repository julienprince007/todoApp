import rxdb from "@sowell/rxdb"

import {
  todoPullQueryBuilder,
  todoPushQueryBuilder
} from "../rxdb/queryBuilder/todoQueryBuilder "
import {
  userPullQueryBuilder,
  userPushQueryBuilder
} from "../rxdb/queryBuilder/userQueryBuilder"
import schema from "../rxdb/schema/schemaRxdb"
import subscriptionTodoQuery from "../rxdb/subscription/subTodoQuery"
import subscriptionUserQuery from "../rxdb/subscription/subUserQuery"

export default async () => {
  const { initRxdb } = rxdb()
  //init queryBuilders
  let querys = []
  querys["todos"] = [
    { pull: todoPullQueryBuilder },
    { push: todoPushQueryBuilder },
    { sub: subscriptionTodoQuery }
  ]
  querys["users"] = [
    { pull: userPullQueryBuilder },
    { push: userPushQueryBuilder },
    { sub: subscriptionUserQuery }
  ]
  initRxdb(querys, schema)

  // router.beforeEach(async (to, from, next) => {
  //   const user = LocalStorage.getItem("user")
  //   let userState = store.getters["rxdb/getUser"]
  //   if (user !== null) {
  //     if (userState === null) {
  //       store.commit("rxdb/setUser", user)
  //       await createDb(user.name, user.token)
  //       setTimeout(() => {
  //         initReplication()
  //       }, 500)
  //     }
  //   }
  //   next()
  // })
}
