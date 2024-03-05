import TaskCard from "./TaskCard";

async function loadTasks() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/tasks/`);
  const tasks = await res.json();

  return tasks;
}

const ListTask = async () => {
  const tasks = await loadTasks();

  return (
    <div className="bg-slate-700 p-4 w-full rounded-md">
      <h1 className="mb-3 text-center font-bold text-xl">Listado de Tareas</h1>
      {tasks.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}
    </div>
  );
};

export default ListTask;
