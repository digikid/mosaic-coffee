import { randomNumber } from 'src/utils/random/number'

const items = [
  {
    title: 'Людмила Петрановская',
    place: 'ДК Металлург'
  },
  {
    title: 'Ислам Итляшев и Султан Лагучев',
    place: 'КРЦ Звезда'
  },
  {
    title: 'Вера Полозкова. Премьера нового',
    place: 'Окружной Дом Офицеров'
  },
  {
    title: 'Про Федота-Стрельца',
    place: 'Окружной Дом Офицеров'
  },
  {
    title: 'Шоу Взламывая реальность',
    place: 'КРЦ Звезда'
  },
  {
    title: 'Чайф',
    place: 'МТЛ Арена'
  },
  {
    title: 'Enigma',
    place: 'Окружной Дом Офицеров'
  },
  {
    title: 'Юрий Шатунов',
    place: 'КРЦ Звезда'
  },
  {
    title: 'Jony',
    place: 'МТЛ Арена'
  },
  {
    title: 'Хабиб',
    place: 'КРЦ Звезда'
  },
  {
    title: 'Леша Свик',
    place: 'Клуб Звезда'
  },
  {
    title: 'Однажды в России',
    place: 'КРЦ Звезда'
  },
  {
    title: 'Женский стендап',
    place: 'КРЦ Звезда'
  },
  {
    title: 'Сергей Лазарев',
    place: 'КРЦ Звезда'
  },
  {
    title: 'Сергей Орлов',
    place: 'КРЦ Звезда'
  }
]

export const generateRandomEvents = (total = 15) => {
  return [...new Array(total)].map((_, i) => {
    const date = new Date()

    date.setDate(new Date().getDate() - 3 + i)
    date.setSeconds(0)
    date.setMinutes([0, 15, 30, 45][randomNumber(0, 3)])

    return {
      ...items[i > items.length - 1 ? i % items.length : i],
      active: true,
      discount: Math.random() >= 0.5,
      url: '#',
      date: JSON.stringify(new Date(date)),
      minPrice: randomNumber(300, 1500, 100),
      maxPrice: randomNumber(2000, 6000, 100),
      thumb: '',
      thumbUrl: ''
    }
  })
}
