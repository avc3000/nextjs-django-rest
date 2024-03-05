export const dynamic = "force-dynamic";

import FormTask from "./components/FormTask";
import ListTask from "./components/ListTask";

function HomePage() {
  return (
    <div className="container mx-auto">
      <h1 className="flex justify-center font-mono font-bold text-orange-500 text-xl mb-2">
        TASKS APP
      </h1>
      <div className="flex gap-x-10">
        <FormTask />
        <ListTask />
      </div>
    </div>
  );
}

export default HomePage;
