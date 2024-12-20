export const getUserId = (): string => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = Math.random().toString(36).substring(2);
    localStorage.setItem('userId', userId);
  }
  return userId;
};