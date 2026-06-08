export const homeTranslations = {
  en: {
    home: {
      fetchFailed: "Failed to load trip data.",
      networkError: "Connection failed. Please check your network status.",
      operation: {
        addTrip: "Add Trip",
        deleteTrip: "Delete Trip",
        deleteConfirm: "Do you want to delete the selected trips?",
        deleteSuccess: "Selected trips deleted.",
        deletePartialFailure: "Failed to delete some trip data.",
        deleteFailure: "Failed to delete trip data.",
      },
      modal: {
        addFailed: "Failed to add trip data.",
        serverError: "Server error.",
        addSuccess: "Trip added.",
        titlePlaceholder: "Trip title",
        budgetPlaceholder: "Budget",
        submit: "Add",
        cancel: "Cancel",
        errors: {
          title: {
            required: "Please enter a trip title.",
          },
          startDay: {
            invalid: "Please enter a valid start date.",
          },
          budget: {
            required: "Please enter a budget.",
            invalid: "Budget must be numeric.",
            min: "Budget must be greater than 0.",
          },
          yourCurrency: {
            invalid: "Please select a valid currency.",
          },
        },
      },
    },
  },
  ja: {
    home: {
      fetchFailed: "旅行データの取得に失敗しました",
      networkError: "通信接続に失敗しました。ネットワーク状況をお確かめください",
      operation: {
        addTrip: "旅行を追加",
        deleteTrip: "旅行を削除",
        deleteConfirm: "選択されたデータを削除しますか？",
        deleteSuccess: "選択された旅行を削除しました。",
        deletePartialFailure: "一部データの削除に失敗しました",
        deleteFailure: "データの削除に失敗しました",
      },
      modal: {
        addFailed: "旅行データの追加に失敗しました",
        serverError: "サーバーエラー",
        addSuccess: "追加しました",
        titlePlaceholder: "旅行タイトル",
        budgetPlaceholder: "予算",
        submit: "追加",
        cancel: "キャンセル",
        errors: {
          title: {
            required: "旅行タイトルを入力してください",
          },
          startDay: {
            invalid: "有効な開始日を入力してください",
          },
          budget: {
            required: "予算を入力してください",
            invalid: "予算は数字で入力してください",
            min: "予算は1以上で入力してください",
          },
          yourCurrency: {
            invalid: "有効な通貨を選択してください",
          },
        },
      },
    },
  },
  fr: {
    home: {
      fetchFailed: "Echec du chargement des donnees de voyage.",
      networkError: "La connexion a echoue. Veuillez verifier votre reseau.",
      operation: {
        addTrip: "Ajouter un voyage",
        deleteTrip: "Supprimer le voyage",
        deleteConfirm: "Voulez-vous supprimer les voyages selectionnes ?",
        deleteSuccess: "Voyages selectionnes supprimes.",
        deletePartialFailure: "Echec de la suppression de certaines donnees de voyage.",
        deleteFailure: "Echec de la suppression des donnees de voyage.",
      },
      modal: {
        addFailed: "Echec de l'ajout des donnees de voyage.",
        serverError: "Erreur du serveur.",
        addSuccess: "Ajout reussi.",
        titlePlaceholder: "Titre du voyage",
        budgetPlaceholder: "Budget",
        submit: "Ajouter",
        cancel: "Annuler",
        errors: {
          title: {
            required: "Veuillez saisir un titre de voyage.",
          },
          startDay: {
            invalid: "Veuillez saisir une date de debut valide.",
          },
          budget: {
            required: "Veuillez saisir un budget.",
            invalid: "Le budget doit etre numerique.",
            min: "Le budget doit etre superieur a 0.",
          },
          yourCurrency: {
            invalid: "Veuillez selectionner une devise valide.",
          },
        },
      },
    },
  },
} as const;
