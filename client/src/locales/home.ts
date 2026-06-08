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
        addHeading: "Add a Trip",
        editHeading: "Edit Trip",
        addFailed: "Failed to add trip data.",
        updateFailed: "Failed to update trip data.",
        notFound: "Trip data not found.",
        serverError: "Server error.",
        addSuccess: "Trip added.",
        updateSuccess: "Trip updated.",
        titlePlaceholder: "Trip title",
        budgetPlaceholder: "Budget",
        submit: "Add",
        update: "Update",
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
        addHeading: "旅行を追加する",
        editHeading: "旅行を編集する",
        addFailed: "旅行データの追加に失敗しました",
        updateFailed: "旅行データの更新に失敗しました",
        notFound: "旅行データが見つかりません",
        serverError: "サーバーエラー",
        addSuccess: "追加しました",
        updateSuccess: "更新しました",
        titlePlaceholder: "旅行タイトル",
        budgetPlaceholder: "予算",
        submit: "追加",
        update: "更新",
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
        addHeading: "Ajouter un voyage",
        editHeading: "Modifier le voyage",
        addFailed: "Echec de l'ajout des donnees de voyage.",
        updateFailed: "Echec de la mise a jour des donnees de voyage.",
        notFound: "Donnees de voyage introuvables.",
        serverError: "Erreur du serveur.",
        addSuccess: "Ajout reussi.",
        updateSuccess: "Mise a jour reussie.",
        titlePlaceholder: "Titre du voyage",
        budgetPlaceholder: "Budget",
        submit: "Ajouter",
        update: "Mettre a jour",
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
