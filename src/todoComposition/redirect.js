export default function changeUrl() {
  function selectUser(id) {
    this.$router.push(`/todo/${id}`);
  }
  return { selectUser };
}
