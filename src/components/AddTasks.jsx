import { useState } from "react";
import PropTypes from "prop-types";
import Input from "./Input"; // Adjust the path as necessary

function AddTasks(props) {
  const [title, setTitle] = useState("");

  return (
    <div className="bg-slate-200 space-y-4 p-6 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Digite o item da compra"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      ></Input>
      <button
        onClick={() => {
          if (!title.trim()) {
            return alert("Preencha todos os campos");
          }
          props.onAddClick(title);
          setTitle("");
        }}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
      >
        Adicionar
      </button>
    </div>
  );
}

AddTasks.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};

export default AddTasks;
