import React, { useState } from "react";

const App = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(todos.length + 1);
  const [isEditable, setIsEditable] = useState(false);
  const [editId, setEditId] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleAddFormChanges = (e) => {
    setTodoTitle(e.target.value);
  };
  const handleAddTodo = () => {
    setTodos([
      ...todos,
      {
        id: todoId,
        title: todoTitle,
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
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleOpenEditForm(todo)}>編集</button>
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
