/**
 * @jest-environment jsdom
 */
import { Task } from "./../skyTasks";

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './weekly.html'), 'utf8');
const f = require('./script');



describe('Weekly Calendar Functionality Tests', () => {
  let testTask;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();

    testTask = new Task('Test Task', 1234, 1234, new Date());
    testTask.data.ddl = new Date();
    testTask.addToLocalStorage();
  });

  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
  });

  test('Check if render function works', () => {
    f.render();
  });

  // STILL NEED TO TEST getHeader and getTasks.... just end2end?
 /* test('getHeaderAndTasksFromStorage()', () =>{
    // jest.spyOn(f, 'getHeaderAndTasksFromStorage');
    // Check if date is today
    // console.log(f.getHeaderAndTasksFromStorage());

    /*let currDay = testTask.data.ddl.getDay();
    let currTime = testTask.data.ddl.getHours();
    let currDayTime = "" + currDay  + currTime;
    let currCell = document.getElementById(currDayTime);

    f.render();
    expect(f.setTasksForDay(new Date())).toEqual([testTask]);
  });*/

  test('subtractTimeFromDate()', () => {
    const testDate = new Date("2022-11-29");
    const outputDate = new Date("2022-11-25");

    expect(f.subtractTimeFromDate(testDate, 4)).toEqual(outputDate);
  });

  test('addTimeToDate()', () => {
    const testDate = new Date("2022-11-25");
    const outputDate = new Date("2022-11-29");

    expect(f.addTimeToDate(testDate, 4)).toEqual(outputDate);
  });

  test('currentMonth()', () => {
    const testMonth = "January";
    expect(f.currentMonth(0)).toEqual(testMonth);
  });
})