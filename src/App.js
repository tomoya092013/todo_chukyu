import React, { useEffect, useState } from "react";

const App = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(todos.length + 1);
  const [isEditable, setIsEditable] = useState(false);
  const [editId, setEditId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [filter, setFilter] = useState("notStarted");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const handleAddFormChanges = (e) => {
    setTodoTitle(e.target.value);
  };
  const handleAddTodo = () => {
    setTodos([
      ...todos,
      {
        id: todoId,
        title: todoTitle,
        status: "notStarted",
      },
    ]);
    setTodoId(todoId + 1);
    setTodoTitle("");
    // console.log(todos); この時点では更新されていない。ポケモンのやつと同じ現象？
    //console.log(todoId); todoidはtodosと関係なく足されていくから被らない
  };
  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };
  const handleOpenEditForm = (targetTodo) => {
    setIsEditable(true);
    setEditId(targetTodo.id);
    //console.log(editId); この時点では更新されていない
    setNewTitle(targetTodo.title);
  };
  const handleCloseEditForm = () => {
    setIsEditable(false);
    setEditId("");
    //console.log(editId); この時点では更新されていない
  };
  const handleEditFormChange = (e) => {
    setNewTitle(e.target.value);
  };
  const handleEditTodo = () => {
    // console.log(editId);
    //スプレッド構文(オブジェクトの場合)　元のオブジェクトに同名プロパティがある場合は置き換わる
    const newArray = todos.map((todo) =>
      todo.id === editId ? { ...todo, title: newTitle } : todo
    );
    setTodos(newArray);
    setNewTitle("");
    handleCloseEditForm();
  };
  const handleStatusChange = (e, targetTodo) => {
    // console.log(e);
    // console.log(targetTodo);
    const newArray = todos.map(
      (todo) =>
        todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo //この状態だとconsole.log(e);のstatusは初期値notStartedのまま
      // todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo //これだとconsole.log(e);のstatusは変わっている　なぜ？
    );
    setTodos(newArray);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "notStarted":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "notStarted")
          );
          break;
        case "inProgress":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "inProgress")
          );
          break;
        case "done":
          setFilteredTodos(todos.filter((todo) => todo.status === "done"));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

  return (
    <>
      {isEditable ? (
        <div>
          <input
            type="text"
            label="新しいタイトル"
            value={newTitle}
            onChange={handleEditFormChange}
          />
          <button onClick={handleEditTodo}>編集を保存</button>
          <button onClick={handleCloseEditForm}>キャンセル</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            label="タイトル"
            value={todoTitle}
            onChange={handleAddFormChanges}
          />
          <button onClick={handleAddTodo}>作成</button>
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">全て</option>
            <option value="notStarted">未着手</option>
            <option value="inProgress">作業中</option>
            <option value="done">完了</option>
          </select>
        </div>
      )}

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <select
              value={todo.status}
              onChange={(e) => handleStatusChange(e, todo)} //引数二つ指定するのはなぜ？
            >
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
            <button onClick={() => handleOpenEditForm(todo)}>編集</button>
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
