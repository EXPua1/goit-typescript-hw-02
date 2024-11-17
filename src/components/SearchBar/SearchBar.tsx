import { FC } from "react";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

const SearchForm: FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Предотвращаем автоматическую отправку формы
    const notify = () => toast("Введите запрос для поиска", { duration: 2000 });

    const form = event.target as HTMLFormElement; // Приводим target к типу HTMLFormElement
    const topicInput = form.elements.namedItem("topic") as HTMLInputElement; // Получаем элемент по имени

    if (!topicInput.value.trim()) {
      // Проверяем на пустое значение
      notify(); // Вызываем уведомление
      return;
    }

    const searchQuery = topicInput.value.trim(); // Извлекаем значение из поля ввода
    onSearch(searchQuery); // Вызываем функцию поиска с введенным запросом
    form.reset(); // Сбрасываем форму после отправки
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="topic"
          placeholder="Поиск картинок..."
        />
        <button className={css.btn} type="submit">
          Поиск
        </button>
      </form>
      <Toaster /> {/* Не забудьте добавить Toaster для показа уведомлений */}
    </header>
  );
};

export default SearchForm;
