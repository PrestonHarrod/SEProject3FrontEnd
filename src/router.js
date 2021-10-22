
import Vue from 'vue'
import Router from 'vue-router'
import DegreeList from './views/DegreeList.vue'
import StudentList from './views/Students/StudentList.vue'
import StudentView from './views/Students/StudentView.vue'
import StudentAdd from './views/Students/AddStudent.vue'
import StudentEdit from './views/Students/EditStudent.vue'
import AdvisorList from './views/AdvisorList.vue'
import CourseList from './views/Courses/CourseList.vue'
import CourseView from './views/Courses/courseView.vue'
import CourseAdd from './views/Courses/AddCourse.vue'
import CourseEdit from './views/Courses/EditCourse.vue'
import Home from './views/Home.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base:
  process.env.NODE_ENV === "development" ? "/" : "/courses/",
  routes : [
    
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/api/students',
      name: 'students',
      component: StudentList
    },
    {
      path: '/api/students/:id',
      name: 'stuview',
      component: StudentView,
      props: true
    },
    {
      path: '/api/students/studentadd',
      name: 'stuadd',
      component: StudentAdd,
      props: true
    },
    {
      path: "/api/students/student-edit/:id",
      name: "stuedit",
      component: StudentEdit,
      props: true
    },
    {
      path: '/api/advisors',
      name: 'advisors',
      component: AdvisorList
    },
    {
      path: '/api/degree',
      name: 'degrees',
      component: DegreeList
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
      }
  ]
})

