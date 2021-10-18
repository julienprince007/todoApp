import rxdb from "@sowell/rxdb"

import {
  todoPullQueryBuilder,
  todoPushQueryBuilder
} from "../rxdb/queryBuilder/todoQueryBuilder "

import schema from "../rxdb/schema/schemaRxdb"
import subscriptionTodoQuery from "../rxdb/subscription/subTodoQuery"

export default async () => {
  const { initRxdb } = rxdb()
  //init queryBuilders
  let querys = []
  querys["todos"] = [
    { pull: todoPullQueryBuilder },
    { push: todoPushQueryBuilder },
    { sub: subscriptionTodoQuery }
  ]

  initRxdb(querys, schema)
}
