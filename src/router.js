/*
import {createRouter, createWebHistory} from 'vue-router'
import CourseList from './views/Home.vue'
import CourseView from './views/courseView.vue'
import CourseAdd from './views/AddCourse.vue'
import CourseEdit from './views/EditCourse.vue'

  const routes = [
    {
      path: '/',
      name: 'list',
      component: CourseList
    },
    {
      path: '/api/courses/:id',
      name: 'view',
      component: CourseView,
      props: true
    },
    {
        path: '/api/courses/courseadd',
        name: 'add',
        component: CourseAdd,
        props: true
      },
      {
        path: "/courses/course-edit/:id",
        name: "edit",
        component: CourseEdit,
        props: true
      },
  ];
  const router = createRouter({
      history: createWebHistory(),
      routes,
  });
export default router; 
*/

import Vue from 'vue'
import Router from 'vue-router'
import CourseList from './views/CourseList.vue'
import CourseView from './views/courseView.vue'
import CourseAdd from './views/AddCourse.vue'
import CourseEdit from './views/EditCourse.vue'
import StudentList from './views/StudentList.vue'
import AddStudent from './views/AddStudent.vue'
import AdvisorList from './views/AdvisorList.vue'
import AddAdvisor from './views/AdvisorAdd.vue'
import ViewStudent from './views/StudentView.vue'
import ViewAdvisor from './views/AdvisorView.vue'
import StudentEdit from './views/StudentEdit.vue'
import AdvisorEdit from './views/AdvisorEdit.vue'
import AddDegree from './views/DegreeAdd.vue'
import ViewDegree from './views/DegreeView.vue'
import DegreeEdit from './views/DegreeEdit.vue'
import DegreeList from './views/DegreeList.vue'
import SemesterList from './views/SemesterList.vue'
import ViewSemester from './views/SemesterView.vue'
import semesterEdit from './views/SemesterEdit.vue'
import AddSemester from './views/SemesterAdd.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base:
  process.env.NODE_ENV === "development" ? "/" : "/courses/",
  routes : [
    {
      path: '/',
      name: 'list',
      component: CourseList
    },
    {
      path: '/api/courses/:id',
      name: 'view',
      component: CourseView,
      props: true
    },
    {
        path: '/api/courses/courseadd',
        name: 'add',
        component: CourseAdd,
        props: true
      },
      {
        path: "/courses/course-edit/:id",
        name: "edit",
        component: CourseEdit,
        props: true
      },
      {
        path: "/api/students",
        name: "studentlist",
        component: StudentList,
        props: true
      },
      {
        path: "/api/students/studentadd",
        name: "addStudent",
        component: AddStudent,
        props: true
      },
      {
        path: "/api/students/:id",
        name: "viewStudent",
        component: ViewStudent,
        props: true
      },
      {
        path: "/api/student-edit/:id",
        name: "editstudent",
        component: StudentEdit,
        props: true
      },
      {
        path: "/api/advisors",
        name: "advisorlist",
        component: AdvisorList,
        props: true
      },
      {
        path: "/api/advisors/advisoradd",
        name: "addAdvisor",
        component: AddAdvisor,
        props: true
      },
      {
        path: "/api/advisors/:id",
        name: "viewAdvisor",
        component: ViewAdvisor,
        props: true
      },
      {
        path: "/api/advisor-edit/:id",
        name: "editadvisor",
        component: AdvisorEdit,
        props: true
      },
      {
        path: "/api/degrees",
        name: "degreelist",
        component: DegreeList,
        props: true
      },
      {
        path: "/api/degrees/degreeadd",
        name: "addDegree",
        component: AddDegree,
        props: true
      },
      {
        path: "/api/degrees/:id",
        name: "viewDegree",
        component: ViewDegree,
        props: true
      },
      {
        path: "/api/degree-edit/:id",
        name: "editdegree",
        component: DegreeEdit,
        props: true
      },
      {
        path: "/api/semesters",
        name: "semesterlist",
        component: SemesterList,
        props: true
      },
      {
        path: "/api/semesters/semesteradd",
        name: "addSemester",
        component: AddSemester,
        props: true
      },
      {
        path: "/api/semesters/:id",
        name: "viewSemester",
        component: ViewSemester,
        props: true
      },
      {
        path: "/api/semester-edit/:id",
        name: "editsemester",
        component: semesterEdit,
        props: true
      },
    /*
    {
      path: '*',
      component: NotFondComponent
    }
    */
  ]
})

