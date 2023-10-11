export const setToken = (data) => {
  localStorage.setItem('jonikshopAccessToken', data.token.access)
}
