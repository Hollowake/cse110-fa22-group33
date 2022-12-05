/**
 * @jest-environment node
 */

import { Task } from "./skyTasks";

describe('Task Class Tests', () => {
  let testTask;
  beforeEach(() => {
    testTask = new Task('Test Task', 1000);
  });

  test('Test Task Creation', () => {
    //Check if the task created in before all exists
    expect(testTask).toBeInstanceOf(Task);
  });

  test('Convert Task to JSON string then back to task object', () => {
    let jsonString = testTask.toJson();
    expect(JSON.parse(jsonString)).toBeInstanceOf(Object);
    expect(JSON.parse(jsonString)).toHaveProperty("task_name");
    let taskObjectFromJSON = Task.fromJson(jsonString);
    expect(taskObjectFromJSON).toBeInstanceOf(Task);
    expect(taskObjectFromJSON.data.task_name).toEqual("Test Task");
    expect(taskObjectFromJSON.data.uid).toBe(1000);
  })

  test('Check padding branch in constructor', () => {
    let paddingTest = new Task('padding test', 1000, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, true);
    expect(paddingTest.data.priority).toBe(6);
    expect(paddingTest.data.padding).toBe(true);
  })

  test('Test setToPadding()', () => {
    testTask.setToPadding();
    expect(testTask.data.padding).toBe(true);
    expect(testTask.data.priority).toBe(6);
  })

  test('Test setRecursiveToPadding()', () => {
    testTask.setToRecursivePadding();
    expect(testTask.data.padding).toBe(true);
    expect(testTask.data.priority).toBe(6);
    expect(testTask.data.recurrent).toBe(true);
  })

  //how bruh?!
  test('Test splitTask()', () => {
    testTask.addToLocalStorage();

    //test preferHour greater than Duration
    testTask.data.duration = 3;
    let prefer = 4;
    console.log("it is" + Task.splitTask(testTask, prefer));
    //expect(result).toBe(testTask);

    //testTask = new Task('Test Task', 1000);

    //test preferHour 2, duration 7

    testTask.data.duration = 7;
    prefer = 2;
    console.log("now is" + Task.splitTask(testTask, prefer));

  })

  test('Test getUniqueUID()', () => {
    //used localStorage, need to fix
    testTask.addToLocalStorage();
    console.log(testTask.data.uid);
    let newUID = Task.getUniqueUID();
    console.log(newUID);

  })

  test('Test getUniqueTaskUID()', () => {
    //same concept as above test
    let currTaskUID = testTask.data.uid;
    let newTaskUID = Task.getUniqueUID();
    //console.log(newUID);
  })

  test('Test getAllTasks()', () => {
    //initial test has nothing loaded
    //load the testTask, see if it is present
    //add 2 more tasks, check if all 3 tasks are shown
    
  })

  test('Test getAllTaskUIDs()', () => {
  })

  test('Test getAllUIDs()', () => {
    //initial test that has nothing loaded
    //console.log(Task.getAllUIDs());
    //load the testTask, check if that UID is present
    //add two other tasks, check if all 3 UIDs are present
  })

  test('Test getAllTasksFlat()', () => {
  })

  test('Test getAllPaddings()', () => {
  })

  test('Test getAllRecuringPaddings()', () => {
  })

  test('Test getTasksFromTaskUID()', () => {
  })

  //use this test case for ones below
  test('Test getTasksFromDifficulty()', () => {
    //test wrong difficulty, then test the right one!
    //again, right test case only works if I add to local storage, is there a way around!?
    //FIX!
    testTask.data.difficulty = 5;
    let testDiff = 0;
    let result = [];
    expect(Task.getTasksFromDifficulty(testDiff).length).toBe(result.length);
    testDiff = 5;
    console.log(Task.getTasksFromDifficulty(testDiff));
  })

  test('Test getTasksFromPriority()', () => {
    //FIX!
    testTask.data.priority = 5;
    let testPri = 1;
    let result = [];
    expect(Task.getTasksFromPriority(testPri).length).toBe(result.length);
    testPri = 5;
    console.log(Task.getTasksFromDifficulty(testPri));
  })

  test('Test getTasksFromCategory()', () => {
    //FIX!
    testTask.data.category = "personal";
    let testCat = "other";
    let result = [];
    expect(Task.getTasksFromCategory(testCat).length).toBe(result.length);
    testCat = "personal";
    console.log(Task.getTasksFromCategory(testCat));
  })

  test('Test getTaskFromUID()', () => {
    //THIS CASE WORKS ONLY IF I ADD TO LOCALSTORAGE!
    //check with a false UID, then test the right one
    //testTask.addToLocalStorage();
    console.log(testTask);
    console.log(testTask.data.start_date);
    let currUID = testTask.data.uid;
    let falseUID = 0;
    //expect(Task.getTaskFromUID(falseUID)).toBe(null);
    //toBe wont work, will have to use toStrictEqual!
    //expect(Task.getTaskFromUID(currUID)).toBe(testTask);
  })

  test('Test getTasksFromDate()', () => {
    
  })

  test('Test getTasksFromDDL()', () => {
  })

  test('Test getTasksBetweenDate()', () => {
  })

  test('Test getTasksBetweenDDL()', () => {
  })

  test('Test getTasksAfterDate()', () => {
  })

  test('Test getTasksAfterDDL()', () => {
  })

  //This is easy, use same test for ones below!
  test('Test compareDifficulty()', () => {
    testTask.data.difficulty = 5;
    let otherTask = new Task('Other Task');
    otherTask.data.difficulty = 3;
    expect(Task.compareDifficulty(testTask, otherTask)).toBe(2);

  })

  test('Test comparePriority()', () => {
    testTask.data.priority = 5;
    let otherTask = new Task('Other Task');
    otherTask.data.priority = 1
    expect(Task.comparePriority(testTask, otherTask)).toBe(4);
  })

  test('Test compareDDL()', () => {
    testTask.data.ddl = new Date("2022-12-25")
    let otherTask = new Task('Other Task');
    otherTask.data.ddl = new Date("2023-01-25");
    expect(Task.compareDDL(testTask, otherTask)).toBeLessThan(0);
  })

  test('Test compareSoftDDL()', () => {
    testTask.data.softddl = new Date("2023-01-01");
    let otherTask = new Task('Other Task');
    otherTask.data.softddl = new Date("2022-12-05");
    expect(Task.compareSoftDDL(testTask, otherTask)).toBeGreaterThan(0);
  })

  test('Test compareStartDate()', () => {
    testTask.data.start_date = new Date();
    let otherTask = new Task('Other Task');
    otherTask.data.start_date = new Date("2022-12-04");
    expect(Task.compareStartDate(testTask, otherTask)).toBeLessThan(0);
  })

  //whats difference between compareStartDate and compareTimeInterval?
  //we should delete this method, it is not being used!
  test('Test compareTimeInterval()', () => {
    /*
    testTask.data.start_date = new Date();
    console.log(testTask[0]);
    let otherTask = new Task('Other Task');
    otherTask.data.start_date = new Date("2022-12-04");
    //expect(Task.compareTimeInterval(testTask, otherTask)).toBe(2);
    */
  })

  test('Test firstAvailable()', () => {
    //LMAo!
  })

  test('Test dateRangeOverlaps()', () => {
  })

  test('Test sortOccupied()', () => {
  })

  test('Test schedule()', () => {
    Task.removeAllTasks();
    let mytask10 = new Task('10 3 3', Task.getUniqueUID(), Task.getUniqueTaskUID());
    mytask10.data.ddl = new Date('November 28, 2023 10:00:00');
    mytask10.addToLocalStorage();
    let mytask = new Task('10 5 3', Task.getUniqueUID(), Task.getUniqueTaskUID());
    mytask.data.ddl = new Date('November 28, 2023 10:00:00');
    mytask.addToLocalStorage();
    mytask = new Task('10 5 5', Task.getUniqueUID(), Task.getUniqueTaskUID());
    mytask.data.ddl = new Date('November 28, 2023 10:00:00');
    mytask.data.priority = 5;
    mytask.data.difficulty = 5;
    mytask.addToLocalStorage();
    mytask = new Task('10 5 1', Task.getUniqueUID(), Task.getUniqueTaskUID());
    mytask.data.ddl = new Date('November 28, 2023 10:00:00');
    mytask.data.priority = 5;
    mytask.data.difficulty = 1;
    mytask.addToLocalStorage();

    Task.schedule();

    let all_tasks = Task.getAllTasksFlat();
    all_tasks.sort(Task.compareStartDate);
    expect(all_tasks[0].data.task_name).toBe('10 5 5');
    expect(all_tasks[1].data.task_name).toBe('10 5 1');
    expect(all_tasks[2].data.task_name).toBe('10 3 3');
    expect(all_tasks[3].data.task_name).toBe('10 5 3');

  })

  test('Test addToLocalStorage()', () => {
    //nor is this
  })

  test('Test removeFromLocalStorage()', () => {
    //or this
  })

  test('Test removeAllTasks()', () => {
    //or this
  })

  test('Test removeLargeTask()', () => {
    //sky u got me fucked up!
  })

})