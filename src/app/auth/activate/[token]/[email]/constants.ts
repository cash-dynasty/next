// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const translateActivationResponseError = (errorMessage: any) => {
  switch (errorMessage) {
    case 'user_not_found':
      return 'Nie znaleziono użytkownika o takim adresie e-mail'
    case 'user_already_confirmed':
      return 'Użytkownik jest już aktywny'
    case 'token_not_found':
      return 'Token aktywacyjny nie został znaleziony'
    case 'token_expired':
      return 'Link aktywacyjny wygasł'
    default:
      return 'Nieoczekiwany błąd. Skontaktuj się z administracją'
  }
}
