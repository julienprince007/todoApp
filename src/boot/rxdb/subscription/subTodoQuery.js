const query = `
subscription{
  todo {
    id
    isCompleted
    text
    updated_at
  }
}`
export default query
