
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

import CourseList from './views/Courses/CourseList.vue'
import CourseView from './views/Courses/courseView.vue'
import CourseAdd from './views/Courses/AddCourse.vue'
import CourseEdit from './views/Courses/EditCourse.vue'
import StudentList from './views/Students/StudentList.vue'
import AddStudent from './views/Students/AddStudent.vue'
import AdvisorList from './views/Advisors/AdvisorList.vue'
import AddAdvisor from './views/Advisors/AdvisorAdd.vue'
import ViewStudent from './views/Students/StudentView.vue'
import ViewAdvisor from './views/Advisors/AdvisorView.vue'
import StudentEdit from './views/Students/StudentEdit.vue'
import AdvisorEdit from './views/Advisors/AdvisorEdit.vue'
import AddDegree from './views/Degrees/DegreeAdd.vue'
import ViewDegree from './views/Degrees/DegreeView.vue'
import DegreeEdit from './views/Degrees/DegreeEdit.vue'
import DegreeList from './views/Degrees/DegreeList.vue'
import SemesterList from './views/Semesters/SemesterList.vue'
import ViewSemester from './views/Semesters/SemesterView.vue'
import semesterEdit from './views/Semesters/SemesterEdit.vue'
import AddSemester from './views/Semesters/SemesterAdd.vue'
import DegreeCourse from './views/Degrees/DegreeCourse.vue'
import StudentCourseList from './views/Students/StudentCourseList.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base:
  process.env.NODE_ENV === "development" ? "/" : "/courses/",
  routes : [
    
    {
      path: '/',
      name: 'home',
      component: Home
    },
   
   
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/api/studentcourselist/:id',
      name: 'studentcourselist',
      component: StudentCourseList,
      props: true
    },
    
    {
      path: '/api/courses',
      name: 'courses',
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
        path: "/api/degreecourse/:id",
        name: "degreecourse",
        component: DegreeCourse,
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

