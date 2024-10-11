import { useEffect, useState } from "react";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";
import Title from "./components/Title"; // Add this line to import the Title component

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Ordena as tasks sem gerar um loop infinito
  function getSortedTasks(tasks) {
    return [...tasks].sort((a, b) => {
      // Primeiro critério: reminder false antes de reminder true
      if (a.reminder === true && b.reminder === false) {
        return 1; // Coloca 'a' depois de 'b'
      }
      if (a.reminder === false && b.reminder === true) {
        return -1; // Coloca 'a' antes de 'b'
      }
      // Segundo critério: ordenar por id decrescente
      const textComparison = a.text.localeCompare(b.text);
      if (textComparison !== 0) {
        return textComparison;
      }
      return 0;
    });
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10"
  //     );
  //     const data = await response.json();

  //     setTasks(data);
  //   };

  //   fetchData();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, reminder: !task.reminder };
      }

      return task;
    });
    setTasks(getSortedTasks(newTasks));
  }

  function onDeleteClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(getSortedTasks(newTasks));
  }

  function onAddClick(title) {
    const newTasks = {
      id: Date.now(),
      text: title,
      reminder: false,
    };

    const updatedTasks = [...tasks, newTasks];
    setTasks(getSortedTasks(updatedTasks)); // Atualiza o estado com a lista ordenada
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500] space-y-4">
        <Title>Gerenciador de Compras</Title>
        <AddTasks onAddClick={onAddClick} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
  );
}

export default App;
