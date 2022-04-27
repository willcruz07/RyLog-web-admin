interface IAuthTranslate {
    [message: string]: string;
}

const translateAuthenticationErrorMessage: IAuthTranslate = {
    'auth/user-disabled': 'Usuário correspondente ao e-mail fornecido foi desabilitado.',
    'auth/user-not-found': 'Não há usuário correspondente ao e-mail fornecido.',
    'auth/wrong-password': 'A senha é inválida para o e-mail fornecido ou a conta correspondente ao e-mail não possui uma senha definida.',
    'auth/email-already-in-use': 'Já existe uma conta com o endereço de e-mail fornecido.',
    'auth/operation-not-allowed': 'As contas de e-mail / senha não estão habilitadas. Ative contas de e-mail / senha.',
    'auth/weak-password': 'A senha não é forte o suficiente.',
    'auth/invalid-email': 'O endereço de e-mail não é válido',
    'auth/missing-android-pkg-name': 'Um nome de pacote Android deve ser fornecido se o aplicativo Android precisar ser instalado.',
    'auth/missing-continue-uri': 'Um URL de continuação deve ser fornecido na solicitação.',
    'auth/missing-ios-bundle-id': 'Um ID do pacote iOS deve ser fornecido se um ID da App Store for fornecido.',
    'auth/invalid-continue-uri': 'O URL de continuação fornecido na solicitação é inválido.',
    'auth/unauthorized-continue-uri': 'O domínio do URL de continuação não está na lista de permissões. Coloque o domínio na lista de permissões no console do Firebase.',
    'auth/too-many-requests': 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login com falha. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.',
};

export const getFirebaseErrorMessageTranslation = (messageToTranslate: string, messageDefault: string): string => translateAuthenticationErrorMessage[messageToTranslate] || messageDefault;
