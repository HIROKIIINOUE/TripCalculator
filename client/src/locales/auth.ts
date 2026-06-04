export const authTranslations = {
  en: {
    login: {
      title: "Log in",
      emailLabel: "Email address",
      emailPlaceholder: "Email address",
      passwordLabel: "Password",
      submit: "Log in",
      errors: {
        email: {
          invalid: "Please enter a valid email address.",
        },
        password: {
          min: "Password must be at least 6 characters.",
        },
      },
      success: "Welcome {{displayName}}",
      invalidInput: "Please enter your login information correctly.",
      invalidCredentials: "Incorrect email address or password.",
      networkError: "Connection failed. Please check your network status.",
      failed: "Failed to log in.",
      retry: "Failed to log in. Please try again.",
    },
    signup: {
      title: "Create account",
      displayNameLabel: "Name",
      displayNamePlaceholder: "Name",
      emailLabel: "Email address",
      emailPlaceholder: "Email address",
      passwordLabel: "Password",
      submit: "Sign up",
      errors: {
        displayName: {
          required: "Name is required.",
          max: "Display name must be 16 characters or fewer.",
        },
        email: {
          invalid: "Please enter a valid email address.",
        },
        password: {
          min: "Password must be at least 6 characters.",
        },
      },
      weakPassword: "Your password is too weak. Please make it at least good.",
      success: "{{displayName}}, your signup was successful.",
      alreadyExists: "A user already exists. Please log in from the login page.",
      networkError: "Connection failed. Please check your network status.",
      failed: "Failed to sign up.",
    },
    logout: {
      confirm: "Are you sure you want to log out?",
      success: "Logged out successfully",
      error: "Failed to log out",
    },
  },
  ja: {
    login: {
      title: "ログイン",
      emailLabel: "メールアドレス",
      emailPlaceholder: "メールアドレス",
      passwordLabel: "パスワード",
      submit: "ログイン",
      errors: {
        email: {
          invalid: "正しいメールアドレスを入力してください",
        },
        password: {
          min: "パスワードは6文字以上で入力してください",
        },
      },
      success: "{{displayName}}さん、ようこそ",
      invalidInput: "ログイン情報を正しく入力してください",
      invalidCredentials: "パスワードまたはメールアドレスが間違っています。",
      networkError: "通信接続に失敗しました。ネットワーク状況をお確かめください",
      failed: "ログインに失敗しました",
      retry: "ログインに失敗しました。再度ログインしてください。",
    },
    signup: {
      title: "アカウント作成",
      displayNameLabel: "名前",
      displayNamePlaceholder: "名前",
      emailLabel: "メールアドレス",
      emailPlaceholder: "メールアドレス",
      passwordLabel: "パスワード",
      submit: "サインアップ",
      errors: {
        displayName: {
          required: "名前は必須です",
          max: "表示名は16文字以内で決めてください",
        },
        email: {
          invalid: "正しいメールアドレスを入力してください",
        },
        password: {
          min: "パスワードは6文字以上で入力してください",
        },
      },
      weakPassword: "パスワードが弱すぎます。レベルをgood以上にしてください",
      success: "{{displayName}}さん、サインアップに成功しました",
      alreadyExists: "既にユーザが存在しています。ログイン画面よりログインしてください。",
      networkError: "通信接続に失敗しました。ネットワーク状況をお確かめください",
      failed: "サインアップに失敗しました",
    },
    logout: {
      confirm: "ログアウトしますか？",
      success: "ログアウトしました",
      error: "ログアウトに失敗しました",
    },
  },
  fr: {
    login: {
      title: "Connexion",
      emailLabel: "Adresse e-mail",
      emailPlaceholder: "Adresse e-mail",
      passwordLabel: "Mot de passe",
      submit: "Se connecter",
      errors: {
        email: {
          invalid: "Veuillez saisir une adresse e-mail valide.",
        },
        password: {
          min: "Le mot de passe doit contenir au moins 6 caracteres.",
        },
      },
      success: "Bienvenue, {{displayName}}",
      invalidInput: "Veuillez saisir correctement vos informations de connexion.",
      invalidCredentials: "Adresse e-mail ou mot de passe incorrect.",
      networkError: "La connexion a echoue. Veuillez verifier votre reseau.",
      failed: "Echec de la connexion.",
      retry: "Echec de la connexion. Veuillez reessayer.",
    },
    signup: {
      title: "Creer un compte",
      displayNameLabel: "Nom",
      displayNamePlaceholder: "Nom",
      emailLabel: "Adresse e-mail",
      emailPlaceholder: "Adresse e-mail",
      passwordLabel: "Mot de passe",
      submit: "S'inscrire",
      errors: {
        displayName: {
          required: "Le nom est obligatoire.",
          max: "Le nom d'affichage doit contenir 16 caracteres maximum.",
        },
        email: {
          invalid: "Veuillez saisir une adresse e-mail valide.",
        },
        password: {
          min: "Le mot de passe doit contenir au moins 6 caracteres.",
        },
      },
      weakPassword: "Votre mot de passe est trop faible. Veuillez atteindre au moins le niveau good.",
      success: "{{displayName}}, inscription reussie.",
      alreadyExists: "Un utilisateur existe deja. Veuillez vous connecter depuis la page de connexion.",
      networkError: "La connexion a echoue. Veuillez verifier votre reseau.",
      failed: "Echec de l'inscription.",
    },
    logout: {
      confirm: "Voulez-vous vous déconnecter ?",
      success: "Déconnexion réussie",
      error: "Échec de la déconnexion",
    },
  },
} as const;
