import { CheckIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "./Button"; // Adjust the path as necessary

function Tasks(props) {
  const navigate = useNavigate();

  function onSeeDetailClick(task) {
    const query = new URLSearchParams();

    query.set("title", task.text);
    query.set("description", task.description);

    navigate(`/task?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-4 shadow bg-slate-200 rounded-md">
      {props.tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => props.onTaskClick(task.id)}
            className={`bg-slate-400 text-left flex items-center w-full text-white p-2 rounded-md`}
          >
            {task.reminder && <CheckIcon />}
            {task.text}
          </button>

          <Button onClick={() => onSeeDetailClick(task)}>
            <ChevronRightIcon />
          </Button>

          <Button onClick={() => props.onDeleteClick(task.id)}>
            <TrashIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      reminder: PropTypes.bool,
    })
  ).isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default Tasks;
