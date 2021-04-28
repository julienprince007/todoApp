const query = `
subscription{
  todo {
    id
    text
    isCompleted
    updated_at
    user_id
  }
}`;
export default query;
