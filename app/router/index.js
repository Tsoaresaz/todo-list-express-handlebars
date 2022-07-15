const router = require("express").Router();
const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

router.get("/", (req, res) => {
  res.redirect("/todo-list");
});

router.get("/todo-list", (req, res) => {
  const taskList = localStorage.getItem("taskList");
  if (!!taskList) {
      const jsonList = JSON.parse(taskList);
      res.render("todo-list", { body: jsonList, page: { title: "Todo List" } });
      return;
  }

  res.render("todo-list", { page: { title: "Todo List" } });
});

router.get("/new-list", (req, res) => {
  res.render("form-list", { page: { title: "New Task" } });
});

router.post("/new-list", (req, res) => {
  const taskList = localStorage.getItem("taskList") || [];
  const { task } = req.body;
  const id = new Date().getTime();

  if (!!task && task.length > 0) {
    if (typeof taskList === 'object') {
        taskList.push({ id: id, name: task });
        localStorage.setItem("taskList", JSON.stringify(taskList));
        res.redirect("/todo-list");
        return;
    }

    const taskListJSON = JSON.parse(taskList);
    const taskListArray = Array.from(taskListJSON);
    taskListArray.push({ id: id, name: task });

    localStorage.setItem("taskList", JSON.stringify(taskListArray));
    res.redirect("/todo-list");
  }
});

router.get('/delete-task/:id', (req, res) => {
    const { id } = req.params;
    const taskList = localStorage.getItem("taskList") || [];

    if (!!taskList) {
        const taskListJSON = JSON.parse(taskList);
        const taskFilter = Array.from(taskListJSON).filter(task => (task.id != id));
        localStorage.setItem("taskList", JSON.stringify(taskFilter));
        res.redirect("/todo-list");
    }
});

module.exports = router;
