const codes = {
  EMAIL_NOT_FOUND: 'Пользователь с указанным email не найден',
  INVALID_PASSWORD: 'Неверный пароль',
  LOGIN_INVALID_EMAIL: 'Введите корректный адрес электронной почты',
  LOGIN_REQUIRED_EMAIL: 'Пожалуйста, введите адрес электронной почты',
  LOGIN_REQUIRED_PASSWORD: 'Пожалуйста, введите пароль',
  AUTH: 'Пожалуйста, авторизуйтесь для входа в панель администрирования.',
  REFRESH_TOKEN_WARNING: 'Возникла ошибка при обновлении токена',
  LOADING_FAILED: 'При загрузке данных произошла ошибка',
  SETTINGS_LOADING_FAILED: 'Не удалось получить список настроек',
  SETTINGS_UPDATE_FAILED: 'Не удалось сохранить значение',
  SETTINGS_UPDATE_SUCCESS: 'Настройки обновлены',
  SETTINGS_ACCESS_DENIED: 'Недостаточно прав для совершения действия',
  ADD_FAILED: 'При добавлении элемента произошла ошибка',
  UPDATE_FAILED: 'При сохранении элемента произошла ошибка',
  REMOVE_FAILED: 'При удалении элемента произошла ошибка',
  REMOVE_ALL_FAILED: 'При удалении элементов произошла ошибка',
  ADD_SUCCESS: 'Элемент добавлен',
  UPDATE_SUCCESS: 'Элемент сохранен',
  PATCH_SUCCESS: 'Элементы обновлены',
  PATCH_FAILED: 'Не удалось обновить элементы',
  REMOVE_SUCCESS: 'Элемент удален',
  REMOVE_ALL_SUCCESS: 'Все элементы удалены',
  UPLOADER_IMAGE_SIZE: 'Размер изображения превышает лимит в',
  UPLOADER_FILE_EXIST: 'Изображение с таким именем уже загружено',
  UPLOADER_CONNECTION_FAILED:
    'Невозможно подключиться к серверу хранения изображений',
  UPLOADER_LOADING_FAILED: 'Возникла ошибка при загрузке изображения',
  UPLOADER_LOADING_SUCCESS: 'Изображение загружено',
  UPLOADER_REMOVE_FAILED: 'Возникла ошибка при удалении изображения',
  UPLOADER_REMOVE_SUCCESS: 'Изображение удалено',
  USERS_EMAIL_EXISTS: 'Пользователь с данным email уже создан',
  USERS_ADD_FAILED: 'При добавлении пользователя произошла ошибка',
  USERS_UPDATE_FAILED: 'При сохранении пользователя произошла ошибка',
  USERS_REMOVE_FAILED: 'При удалении пользователя произошла ошибка',
  USERS_REMOVE_SELF_FAILED: 'Невозможно удалить самого себя',
  USERS_ADD_SUCCESS: 'Пользователь добавлен',
  USERS_UPDATE_SUCCESS: 'Пользователь сохранен',
  USERS_REMOVE_SUCCESS: 'Пользователь удален',
  ACCESS_DENIED: 'Доступ закрыт',
  FILE_READER_INVALID_TYPE:
    'Файл не может быть прочитан, так как его тип не поддерживается',
  FILE_READER_INVALID_EXTENSION:
    'Файл не может быть прочитан, так как его разрешение не поддерживается'
}

export const message = (code, module = '') => {
  if (!code) return ''

  return (
    codes[`${module.toUpperCase()}_${code.toUpperCase()}`] ||
    codes[code.toUpperCase()] ||
    code
  )
}
