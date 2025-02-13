import s from "./Page404.module.css"
import React from "react"
import Button from "@mui/material/Button"
import { Link } from "react-router"
import { Path } from "common/routing/Routing"

export const Page404 = () => {
  return (
    <>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <div className={s.buttonContainer}>
        <Button
          variant="contained" // Стиль кнопки
          color="primary" // Цвет кнопки
          component={Link} // Делаем кнопку ссылкой
          to={Path.Main} // Путь на главную страницу
        >
          Вернуться на главную
        </Button>
      </div>
    </>
  )
}
